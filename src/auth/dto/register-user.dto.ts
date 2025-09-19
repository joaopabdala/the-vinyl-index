import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    minLength: 6,
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
