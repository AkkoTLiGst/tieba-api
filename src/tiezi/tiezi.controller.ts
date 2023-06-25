import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request, Query } from '@nestjs/common';
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

  @Get('getTieziById')
  getTieziById(@Query() data) {
    return this.tieziService.getTieziById(data);
  }

  // 随机获得指定贴吧中的某个帖子
  @Get('randomTieziTB/:tiebaId')
  randomTieziTB(@Param('tiebaId') tiebaId: number) {
    return this.tieziService.randomTieziTB(tiebaId);
  }

  //  获取对应帖子的所有回复
  @Get('findAllCommentId')
  findAllCommentId(@Query() data) {
    return this.tieziService.findAllCommentId(data.id);
  }

  // 传入贴吧ID、帖子页数、一页显示多少个，获取对应贴吧的所有帖子 
  @Get('allPost')
  findAllPost(@Query() data) {
    return this.tieziService.findAllPost(data.id, data.page, data.pageSize);
  }

  // 传入贴吧ID、帖子页数、一页显示多少个，获取对应贴吧的所有帖子 
  @Get('postCount')
  findPostCount(@Query() data) {
    return this.tieziService.findPostCount(data.id);
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
