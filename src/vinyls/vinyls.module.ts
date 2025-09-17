import { Module } from '@nestjs/common';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';

@Module({
  controllers: [VinylsController],
  providers: [VinylsService]
})
export class VinylsModule {}
