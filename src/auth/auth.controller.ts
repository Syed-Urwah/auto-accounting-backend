import { Controller, Request, Post, UseGuards, Get, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const result = await this.authService.login(req.user);
    return res.status(result.statusCode).json(result);
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const result = await this.authService.signup(signUpDto);
    return res.status(result.statusCode).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
