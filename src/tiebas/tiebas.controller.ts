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

  // 通过吧名获取贴吧信息
  @Get('tiebaByName/:tiebaName')
  findOneByName(@Param('tiebaName') tiebaName: string) {
    return this.tiebasService.findOneByName(tiebaName);
    
  }

  // 通过吧ID获取贴吧信息
  @Get('tiebaById/:id')
  findOneById(@Param('id') id: string) {
    return this.tiebasService.findOneByID(+id);
    
  }

  @Get('count')
  findCount(){
    return this.tiebasService.findCount();
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
