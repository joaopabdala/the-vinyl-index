import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'Email do usuário', example: 'joao@example.com' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    minLength: 3,
    example: '123456',
  })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(3, { message: 'A senha deve ter pelo menos 3 caracteres' })
  password: string;
}
