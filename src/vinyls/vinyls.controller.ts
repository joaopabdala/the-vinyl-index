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
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { QueryFilterDto } from './dto/query-filter.dto';

@Controller('vinyls')
export class VinylsController {
  constructor(private readonly vinylsService: VinylsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createItem: CreateVinylDto) {
    return this.vinylsService.create(createItem);
  }

  @Get()
  findAll(@Query() query: QueryFilterDto) {
    return this.vinylsService.findAll(query.filter, query.page);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vinylsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: CreateVinylDto) {
    return this.vinylsService.update(id, body);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateVinylDto,
  ) {
    return this.vinylsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.vinylsService.remove(id);
  }
}
