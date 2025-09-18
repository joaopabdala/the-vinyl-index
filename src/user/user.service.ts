import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Unique constraint failed
        throw new ConflictException('E-mail já cadastrado');
      }
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('E-mail já cadastrado');
      }
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error: unknown) {
      console.log(error);
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
