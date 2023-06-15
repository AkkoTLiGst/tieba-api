import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TieziService } from './tiezi.service';
import { CreateTieziDto } from './dto/create-tiezi.dto';
import { UpdateTieziDto } from './dto/update-tiezi.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('tiezi')
export class TieziController {
  constructor(private readonly tieziService: TieziService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createTieziDto: CreateTieziDto, @UploadedFile() file) {
    return this.tieziService.create(createTieziDto, file);
  }

  @Get()
  findAll() {
    return this.tieziService.findAll();
  }

  // 随机获得指定贴吧中的某个帖子
  @Get('randomTieziTB/:tiebaId')
  randomTieziTB(@Param('tiebaId') tiebaId: number) {
    return this.tieziService.randomTieziTB(tiebaId);
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
