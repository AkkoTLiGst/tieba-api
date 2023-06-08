import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TieziService } from './tiezi.service';
import { CreateTieziDto } from './dto/create-tiezi.dto';
import { UpdateTieziDto } from './dto/update-tiezi.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('tiezi')
export class TieziController {
  constructor(private readonly tieziService: TieziService) { }

  @Post('create')
  create(@Body() createTieziDto: CreateTieziDto) {
    return this.tieziService.create(createTieziDto);
  }

  @Get()
  findAll() {
    return this.tieziService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tieziService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTieziDto: UpdateTieziDto) {
    return this.tieziService.update(+id, updateTieziDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tieziService.remove(+id);
  }
}
