// src/collection/collection.controller.ts
import {
  Controller,
  Post,
  Param,
  Get,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('collection')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Adiciona um vinyl à coleção do usuário' })
  @ApiResponse({ status: 201, description: 'Vinyl adicionado com sucesso' })
  @Post(':vinylId')
  async addVinyl(
    @Req() request,
    @Param('vinylId', ParseIntPipe) vinylId: number,
  ) {
    const userId = request.user.id;
    return this.collectionService.addVinylToUser(userId, vinylId);
  }

  @ApiOperation({ summary: 'Lista todos os vinyls do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de vinyls da coleção' })
  @Get()
  async getCollection(@Req() request) {
    const userId = request.user.id;
    return this.collectionService.getUserCollection(userId);
  }

  @ApiOperation({ summary: 'Remove um vinyl da coleção do usuário' })
  @ApiResponse({ status: 200, description: 'Vinyl removido com sucesso' })
  @Delete(':vinylId')
  async removeVinyl(
    @Req() request,
    @Param('vinylId', ParseIntPipe) vinylId: number,
  ) {
    const userId = request.user.id;
    return this.collectionService.removeVinylFromUser(userId, vinylId);
  }
}
