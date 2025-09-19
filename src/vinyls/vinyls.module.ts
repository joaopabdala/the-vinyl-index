import { Module } from '@nestjs/common';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VinylsController],
  providers: [VinylsService],
})
export class VinylsModule {}