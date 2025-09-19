import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVinylDto {
  @ApiProperty({
    description: 'Título do álbum',
    example: 'The Marble Index',
  })
  @IsString({ message: 'O título deve ser uma string válida.' })
  title: string;

  @ApiProperty({
    description: 'Nome do artista ou banda',
    example: 'Nico',
  })
  @IsString({ message: 'O artista deve ser uma string válida.' })
  artist: string;

  @ApiProperty({
    description: 'Data de lançamento (YYYY-MM-DD)',
    example: '1968-11-01',
  })
  @IsDate({ message: 'A data de lançamento deve ser uma data válida.' })
  @Type(() => Date)
  release_date: Date;

  @ApiProperty({
    description: 'Gênero musical',
    example: 'Avant-garde',
  })
  @IsString({ message: 'O gênero deve ser uma string válida.' })
  genre: string;
}
