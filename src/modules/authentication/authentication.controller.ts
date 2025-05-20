import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('token/refresh')
  @UseGuards(JwtAuthGuard)
  async refreshTokens(@Req() req, @Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(req.user.id, refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }
}
