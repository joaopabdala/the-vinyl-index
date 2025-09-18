import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '@prisma/client';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // @HttpCode(HttpStatus.CREATED) - por padrão Post retorna 201 Created, use se quiser ser explícito
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    const newUser = await this.authService.register(email, password, name);
    return newUser;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // define o status 200 OK explicitamente
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const jwt = await this.authService.login(email, password);
    return jwt; // retornará { access_token: '...' }
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getPerfil(@Req() request) {
    const usuarioLogado = await request.user;
    return {
      message: 'Você acessou uma rota protegida!',
      user: usuarioLogado,
    };
  }
}
