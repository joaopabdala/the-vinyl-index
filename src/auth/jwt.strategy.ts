import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as JwtStrategyBase, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'minha_chave_secreta',
    });
  }

  // Método chamado após validação do token. 'payload' é o conteúdo decodificado do JWT.
  async validate(payload: JwtPayload): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    // Remove o campo password antes de retornar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword; // O valor retornado aqui será atribuído a req.user
  }
}
