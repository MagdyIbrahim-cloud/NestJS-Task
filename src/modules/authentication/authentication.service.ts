import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from 'src/common/enums/roles.enum';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>,
    private jwtService: JwtService,
  ) {}
  async signup(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const findEmail = await this.userModel.findOne({ email });
    if (findEmail) {
      throw new HttpException('Email Already In Use', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      ...signUpDto,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return user;
  }

  async signin(signInDto: SignInDto) {
    const user = await this.userModel
      .findOne({ email: signInDto.email })
      .select('-refreshToken');
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.NOT_FOUND);
    }

    const matchedPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!matchedPassword) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const sessionId = uuidv4();
    await this.userModel.updateOne({ _id: user._id }, { sessionId });
    user.sessionId = sessionId;

    const token = await this.generateTokens(user);
    return {
      user,
      token: {
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
      },
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel.findOne({ _id: userId });

    if (!user || user.refreshToken !== refreshToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.generateTokens(user);
    return {
      token: {
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
      },
    };
  }
  async generateTokens(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      sessionId: user.sessionId,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { sub: user._id, email: user.email, role: user.role },
      { expiresIn: '7d' },
    );

    await this.userModel.updateOne(
      { _id: user._id },
      { refreshToken: refreshToken },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    await this.userModel.updateOne(
      { _id: userId },
      { refreshToken: null, sessionId: null },
    );
    return {
      status: 200,
      message: 'User logged out successfully',
    };
  }
}
