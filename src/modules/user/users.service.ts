import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const findEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (findEmail) {
      throw new HttpException('Email already in use!', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAllUsers() {
    const users = await this.userModel.find();
    if (!users) {
      throw new HttpException('No Users Found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async finduserById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async validateUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const findUser = await this.userModel.findById(id);

    if (!findUser) {
      throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const user = {
      ...updateUserDto,
      password: hashedPassword,
    };

    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
    }
    await this.userModel.findByIdAndDelete(id);
    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }
}
