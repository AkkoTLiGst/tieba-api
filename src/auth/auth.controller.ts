import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request } from 'express';
import { UserStatusDTO } from 'src/user/dto/user-status.dto';
import { LocalAuthGuard } from './guards/local-auch.guard';
import { JwtAuthGuard } from './guards/jwt-auch.guard';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

declare module 'express'{
  interface Request{
    user: UserStatusDTO
  }
}

@ApiTags("auth接口")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录接口
  @ApiOperation({summary: '登录接口', description: '传入两个值：一个是账号，一个是密码。账号模板："email:xxxx"、"userId:xxx"、"mobile:17625457846"'})
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: Request, @Body() test: LoginUserDto) {
    try{
      return this.authService.login(req.user);
    }catch(error){
      throw new BadRequestException(error.message);
    }
  }

  // 获取用户信息
  @ApiOperation({summary: '获取用户信息接口', description: '传入本地存储的token，返回用户信息'})
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUser(@Req() req: Request){
    return req.user;
  }

  // 根据token获取帖子
  @ApiOperation({summary: '根据token获取帖子接口', description: '传入本地存储的token，返回帖子数组'})
  @UseGuards(JwtAuthGuard)
  @Get('tokenTiezi')
  getUserTiezi(@Req() req: Request){
    return this.authService.getUserTiezi(req.user);
  }


  // 更新token
}
