import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Put, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiProperty, ApiParam, ApiQuery, } from '@nestjs/swagger';

@ApiTags("用户接口")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('create')
  @ApiOperation({ summary: '创建用户', description: '可以携带图片添加头像' })
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file) {
    return this.userService.create(createUserDto, file);
  }

  // 通过用户名获取用户信息
  @Get('getUserByUID/:userId')
  @ApiOperation({ summary: '通过用户名获取用户信息', description: 'param形式' })
  @ApiParam({
    name: 'userId',
    description: '用户的UID',
    required: true,
    type: 'string'
  })
  findOneByUId(@Param('userId') userId: string) {
    return this.userService.findOneByUID(userId);
  }

  // 通过ID获取用户信息
  @Get('findById')
  @ApiOperation({ summary: '通过ID获取用户信息', description: 'Query形式' })
  @ApiQuery({
    name: 'id',
    description: '用户的ID',
    required: true,
    type: 'number'
  })
  findById(@Query() data) {
    return this.userService.findOneById(data.id);
  }

  // 查询未登录用户的所有帖子（不包括隐藏的帖子）
  @Get('userPost')
  @ApiOperation({ summary: '查询未登录用户的所有帖子（不包括隐藏的帖子）', description: 'Query形式' })
  @ApiQuery({
    name: 'id',
    description: '用户的ID',
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
    description: '单页数量',
    required: true,
    type: 'number'
  })
  findUserPost(@Query() data) {
    return this.userService.findUserPost(data.id, data.page, data.pageSize);
  }

  // 更新用户头像
  @Post('uploadUserImg')
  @ApiOperation({ 
    summary: '上传图片', 
    description: '传入用户的ID和图片' 
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(@Body() id, @UploadedFile() file) {
    return this.userService.uploadUserImg(id.id, file.filename);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
