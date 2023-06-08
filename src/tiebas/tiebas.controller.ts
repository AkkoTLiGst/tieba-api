import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TiebasService } from './tiebas.service';
import { CreateTiebaDto } from './dto/create-tieba.dto';
import { UpdateTiebaDto } from './dto/update-tieba.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('tiebas')
export class TiebasController {
  constructor(private readonly tiebasService: TiebasService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createTiebaDto: CreateTiebaDto, @UploadedFile() file) {
    return this.tiebasService.create(createTiebaDto, file);
  }

  // 获取贴吧信息
  @Get('getTieba/:tiebaName')
  findOne(@Param('tiebaName') tiebaName: string) {
    return this.tiebasService.findOne(tiebaName);
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiebaDto: UpdateTiebaDto) {
    return this.tiebasService.update(+id, updateTiebaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiebasService.remove(+id);
  }
}
