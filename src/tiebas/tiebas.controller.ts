import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { TiebasService } from './tiebas.service';
import { CreateTiebaDto } from './dto/create-tieba.dto';
import { UpdateTiebaDto } from './dto/update-tieba.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiProperty, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags("贴吧接口")
@Controller('tiebas')
export class TiebasController {
  constructor(private readonly tiebasService: TiebasService) { }

  @Post('create')
  @ApiOperation({summary: '创建贴吧', description: '可以携带图片添加头像'})
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createTiebaDto: CreateTiebaDto, @UploadedFile() file) {
    // console.log(createTiebaDto, file);
    
    return this.tiebasService.create(createTiebaDto, file);
  }

  // 通过吧名获取贴吧信息
  @Get('tiebaByName/:tiebaName')
  @ApiOperation({summary: '通过吧名获取用户信息', description: 'param形式'})
  @ApiParam({
    name: 'tiebaName',
    description: '贴吧的名字',
    required: true,
    type: 'string'
  })
  findOneByName(@Param('tiebaName') tiebaName: string) {
    return this.tiebasService.findOneByName(tiebaName);
  }

  // 通过吧ID获取贴吧信息
  @Get('tiebaById/:id')
  @ApiOperation({summary: '通过吧ID获取用户信息', description: 'param形式'})
  @ApiParam({
    name: 'id',
    description: '贴吧的id',
    required: true,
    type: 'string'
  })
  findOneById(@Param('id') id: string) {
    return this.tiebasService.findOneByID(+id);
  }

  

  @Get('count')
  @ApiOperation({summary: '获取贴吧总数', description: '不需要传值'})
  findCount() {
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
