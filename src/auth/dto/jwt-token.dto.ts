import { ApiProperty } from '@nestjs/swagger';

export class JwtResponseDto {
  @ApiProperty({ description: 'Token JWT de acesso' })
  access_token: string;
}
