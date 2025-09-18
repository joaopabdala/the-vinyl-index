import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVinylDto {
  @IsString({ message: 'O título deve ser uma string válida.' })
  title: string;

  @IsString({ message: 'O artista deve ser uma string válida.' })
  artist: string;

  @IsDate({ message: 'A data de lançamento deve ser uma data válida.' })
  @Type(() => Date)
  release_date: Date;

  @IsString({ message: 'O gênero deve ser uma string válida.' })
  genre: string;
}
