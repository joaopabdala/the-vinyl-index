import { Injectable, NotFoundException } from '@nestjs/common';
import { Vinyl } from './interfaces/vinyls.interface';
import { CreateVinylDto } from './dto/create-vinyl.dto';

@Injectable()
export class VinylsService {
  private vinyls: Vinyl[] = [
    {
      id: 1,
      title: 'The Marble Index',
      artist: 'Nico',
      release_date: new Date('1968-11-01'),
      genre: 'Avant-garde',
    },
  ];

  create(vinyl: CreateVinylDto): Vinyl {
    const newVinyl: Vinyl = {
      id: this.vinyls.length + 1,
      title: vinyl.title,
      artist: vinyl.artist,
      release_date: new Date(vinyl.release_date),
      genre: vinyl.genre,
    };
    this.vinyls.push(newVinyl);
    return newVinyl;
  }

  findAll(filter?: string, page: number = 1): Vinyl[] {
    let result = this.vinyls;

    if (filter) {
      result = result.filter((vinyl) =>
        vinyl.title.toLowerCase().includes(filter.toLowerCase()),
      );
    }

    const pageSize = 5;
    return result.slice((page - 1) * pageSize, page * pageSize);
  }

  findOne(id: number): Vinyl {
    const vinyl = this.vinyls.find((vinyl) => vinyl.id === id);
    if (!vinyl) throw new NotFoundException('Vinyl não encontrado');
    return vinyl;
  }

  update(id: number, updateData) {
    const vinyl = this.findOne(id);
    Object.assign(vinyl, updateData);
    return vinyl;
  }

  remove(id: number) {
    const index = this.vinyls.findIndex((vinyl) => vinyl.id === id);
    if (index === -1) throw new NotFoundException('vinyl não encontrado');
    this.vinyls.splice(index, 1);
  }
}
