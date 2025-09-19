import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Vinyl } from '@prisma/client';

@Injectable()
export class VinylsService {
  constructor(private prisma: PrismaService) {}

  // Criar novo vinyl
  async create(data: Prisma.VinylCreateInput): Promise<Vinyl> {
    try {
      return await this.prisma.vinyl.create({ data });
    } catch (error) {
      throw new BadRequestException('Erro ao criar o vinyl: ' + error.message);
    }
  }

  // Listar todos os vinyls com filtro e paginação
  async findAll(filter?: string, page: number = 1): Promise<Vinyl[]> {
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    try {
      const where: Prisma.VinylWhereInput = filter
        ? { title: { contains: filter } }
        : {};

      return await this.prisma.vinyl.findMany({
        where,
        skip,
        take: pageSize,
      });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar vinyls: ' + error.message);
    }
  }

  // Buscar vinyl por ID
  async findOne(id: number): Promise<Vinyl> {
    try {
      const vinyl = await this.prisma.vinyl.findUnique({ where: { id } });
      if (!vinyl) throw new NotFoundException('Vinyl não encontrado');
      return vinyl;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Erro ao buscar o vinyl: ' + error.message);
    }
  }

  // Atualizar vinyl
  async update(
    id: number,
    updateData: Prisma.VinylUpdateInput,
  ): Promise<Vinyl> {
    try {
      await this.findOne(id); // garante que existe
      return await this.prisma.vinyl.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        'Erro ao atualizar o vinyl: ' + error.message,
      );
    }
  }

  // Remover vinyl
  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id); // garante que existe
      await this.prisma.vinyl.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        'Erro ao remover o vinyl: ' + error.message,
      );
    }
  }
}
