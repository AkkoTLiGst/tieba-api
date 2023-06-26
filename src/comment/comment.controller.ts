import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiProperty, ApiQuery } from '@nestjs/swagger';

@ApiTags("评论接口")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  // 创建接口
  @Post('create')
  @ApiOperation({ 
    summary: '创建评论', 
    description: '传入评论内容comment, 楼层floor, 图片file(非必要), 发表人用户名userId，帖子的id tieziId，返回是否成功，如果成功带着创建的评论的ID返回' 
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createCommentDto: CreateCommentDto, @UploadedFile() file) {
    return this.commentService.create(createCommentDto, file);
  }


  @Post('uploadImg')
  @ApiOperation({ 
    summary: '上传图片', 
    description: '传入评论的ID和图片' 
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(@Body() id, @UploadedFile() file) {
    return this.commentService.uploadImg(id.id, file.filename);
  }

  @Get('findOne')
  @ApiOperation({summary: '通过评论ID获取评论', description: 'Query形式'})
  @ApiQuery({
    name: 'id',
    description: '评论的ID',
    required: true,
    type: 'number'
  })
  findOne(@Query() data) {
    return this.commentService.findOneByTiezi(data.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
