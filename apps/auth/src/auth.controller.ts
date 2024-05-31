import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  CurrentUser,
  UsersDocument,
} from '@app/common';
import { LoginDto } from './users/dto/login.dto';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UsersDocument,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response, // passthrough to send cookie manually
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return {
      ...data.user,
      id: data.user._id, // _id is not supported in grpc
    };
  }
}
