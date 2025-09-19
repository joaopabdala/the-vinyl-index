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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtResponseDto } from './dto/jwt-token.dto';
import { LoginUserDto } from './dto/login-user.dto';

export type SafeUser = Omit<User, 'password'>;
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registra um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<SafeUser> {
    const { email, password, name } = registerUserDto;
    const newUser = await this.authService.register(email, password, name);
    return newUser;
  }

  @ApiOperation({ summary: 'Realiza login com email e senha' })
  @ApiResponse({
    status: 200,
    description: 'Login com sucesso',
    type: JwtResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<JwtResponseDto> {
    console.log('a');
    const { email, password } = loginUserDto;

    return await this.authService.login(email, password);
  }

  @ApiOperation({ summary: 'Retorna dados do usuário logado' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: 'Usuário autenticado' })
  @ApiResponse({ status: 401, description: 'Token inválido ou ausente' })
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getPerfil(@Req() request) {
    const usuarioLogado = await request.user;
    return { message: 'Você acessou uma rota protegida!', user: usuarioLogado };
  }
}
