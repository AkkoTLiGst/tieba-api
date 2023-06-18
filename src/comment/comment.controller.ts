import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

@ApiTags("comment接口")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  // 创建接口
  @ApiOperation({ 
      summary: '创建接口', 
      description: '传入评论内容comment, 楼层floor, 图片file(非必要), 发表人用户名userId，帖子的id tieziId ' 
    })
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createCommentDto: CreateCommentDto, @UploadedFile() file) {
    return this.commentService.create(createCommentDto, file);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
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
