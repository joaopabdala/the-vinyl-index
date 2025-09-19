// src/collection/collection.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Collection } from '@prisma/client';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  // Adiciona um vinyl à coleção do usuário
  async addVinylToUser(userId: number, vinylId: number): Promise<Collection> {
    try {
      return await this.prisma.collection.create({
        data: {
          userId,
          vinylId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Vinyl já adicionado à coleção do usuário.',
        );
      }
      throw error;
    }
  }

  // Lista todos os vinyls de um usuário
  async getUserCollection(userId: number) {
    const collection = await this.prisma.collection.findMany({
      where: { userId },
      include: { vinyl: true }, // retorna os dados do vinyl
    });
    return collection;
  }

  // Remove um vinyl da coleção
  async removeVinylFromUser(userId: number, vinylId: number) {
    const deleted = await this.prisma.collection.deleteMany({
      where: { userId, vinylId },
    });
    if (deleted.count === 0) {
      throw new NotFoundException(
        'Vinyl não encontrado na coleção do usuário.',
      );
    }
    return { message: 'Vinyl removido da coleção com sucesso.' };
  }
}
