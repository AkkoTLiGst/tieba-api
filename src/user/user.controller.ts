import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Put, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file) {
    return this.userService.create(createUserDto, file);
  }
  // 通过用户名获取用户信息
  @Get('getUserByUID/:userId')
  findOneByUId(@Param('userId') userId: string) {
    return this.userService.findOneByUID(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
