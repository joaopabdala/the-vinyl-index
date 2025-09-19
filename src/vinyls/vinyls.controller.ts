import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('vinyls')
@ApiBearerAuth('Authorization')
@Controller('vinyls')
export class VinylsController {
  constructor(private readonly vinylsService: VinylsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um novo disco de vinil' })
  @ApiResponse({ status: 201, description: 'Vinil criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Token inválido ou ausente' })
  create(@Body() createItem: CreateVinylDto) {
    return this.vinylsService.create(createItem);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os discos de vinil com paginação e filtros',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vinis retornada com sucesso',
  })
  findAll(@Query() query: QueryFilterDto) {
    return this.vinylsService.findAll(query.filter, query.page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um disco de vinil pelo ID' })
  @ApiResponse({ status: 200, description: 'Vinil encontrado' })
  @ApiResponse({ status: 404, description: 'Vinil não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vinylsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um vinil' })
  @ApiResponse({ status: 200, description: 'Vinil atualizado parcialmente' })
  @ApiResponse({ status: 404, description: 'Vinil não encontrado' })
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateVinylDto,
  ) {
    return this.vinylsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um vinil pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'Vinil removido com sucesso (sem retorno no corpo)',
  })
  @ApiResponse({ status: 404, description: 'Vinil não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.vinylsService.remove(id);
  }
}
