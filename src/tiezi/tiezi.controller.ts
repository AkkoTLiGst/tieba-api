import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request, Query } from '@nestjs/common';
import { TieziService } from './tiezi.service';
import { CreateTieziDto } from './dto/create-tiezi.dto';
import { UpdateTieziDto } from './dto/update-tiezi.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiProperty, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags("帖子接口")
@Controller('tiezi')
export class TieziController {
  constructor(private readonly tieziService: TieziService) { }

  @Post('create')

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({summary: '创建帖子', description: '可以携带图片'})
  create(@Body() createTieziDto: CreateTieziDto, @UploadedFile() file) {
    return this.tieziService.create(createTieziDto, file);
  }

  @Get('getTieziById')
  @ApiOperation({summary: '通过帖子ID获取帖子', description: 'Query形式'})
  @ApiQuery({
    name: 'tieziID',
    description: '帖子的ID',
    required: true,
    type: 'number'
  })
  getTieziById(@Query() data) {
    return this.tieziService.getTieziById(data);
  }

  // 随机获得指定贴吧中的某个帖子
  @Get('randomTieziTB/:tiebaId')
  @ApiOperation({summary: '通过贴吧ID随机获取某个帖子', description: 'Parma形式'})
  @ApiQuery({
    name: 'tiebaId',
    description: '帖吧的ID',
    required: true,
    type: 'number'
  })
  randomTieziTB(@Param('tiebaId') tiebaId: number) {
    return this.tieziService.randomTieziTB(tiebaId);
  }

  //  获取对应帖子的所有回复
  @Get('findAllCommentId')
  @ApiOperation({summary: '通过帖子ID获取帖子所有回复', description: 'Query形式'})
  @ApiQuery({
    name: 'id',
    description: '帖子的ID',
    required: true,
    type: 'number'
  })
  findAllCommentId(@Query() data) {
    return this.tieziService.findAllCommentId(data.id);
  }

  // 传入贴吧ID、帖子页数、一页显示多少个，获取对应贴吧的所有帖子 
  @Get('allPost')
  @ApiOperation({summary: '获取对应贴吧的帖子', description: 'Query形式，传入贴吧ID、帖子页数、一页显示多少个'})
  @ApiQuery({
    name: 'id',
    description: '帖吧的ID',
    required: true,
    type: 'number'
  })
  @ApiQuery({
    name: 'page',
    description: '页数',
    required: true,
    type: 'number'
  })
  @ApiQuery({
    name: 'pageSize',
    description: '单页多少个',
    required: true,
    type: 'number'
  })
  findAllPost(@Query() data) {
    return this.tieziService.findAllPost(data.id, data.page, data.pageSize);
  }

  // 查询贴吧的帖子总数 
  @ApiOperation({summary: '获取贴吧的帖子总数', description: 'Query形式，传入贴吧ID'})
  @ApiQuery({
    name: 'id',
    description: '帖吧的ID',
    required: true,
    type: 'number'
  })
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
