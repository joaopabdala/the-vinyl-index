import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import type { Vinyl } from './vinyls.service';

@Controller('vinyls')
export class VinylsController {
  constructor(private readonly vinylsService: VinylsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createItem: Omit<Vinyl, 'id'>) {
    return this.vinylsService.create(createItem);
  }

  @Get()
  findAll() {
    return this.vinylsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vinylsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Vinyl>) {
    return this.vinylsService.update(Number(id), body);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() body: Partial<Vinyl>) {
    return this.vinylsService.update(Number(id), body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.vinylsService.remove(Number(id));
  }
}
