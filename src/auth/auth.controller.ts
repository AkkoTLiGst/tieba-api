import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, UseGuards, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request } from 'express';
import { UserStatusDTO } from 'src/user/dto/user-status.dto';
import { LocalAuthGuard } from './guards/local-auch.guard';
import { JwtAuthGuard } from './guards/jwt-auch.guard';
import { ApiTags, ApiOperation, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

declare module 'express' {
  interface Request {
    user: UserStatusDTO
  }
}

@ApiTags("登录接口")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 登录接口
  @ApiOperation({ summary: '登录接口', description: '传入两个值：一个是账号，一个是密码。账号模板："email:xxxx"、"userId:xxx"、"mobile:17625457846"' })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: Request, @Body() test: LoginUserDto) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // 获取用户信息
  @ApiOperation({ summary: '获取用户信息接口', description: '传入本地存储的token，返回用户信息' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getUser(@Req() req: Request) {
    return req.user;
  }

  // 根据token获取帖子
  @ApiOperation({ summary: '根据token获取帖子接口', description: '传入本地存储的token，返回帖子数组' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('tokenTiezi')
  getUserTiezi(@Req() req: Request) {
    return this.authService.getUserTiezi(req.user);
  }

  // 登录后点赞
  @ApiOperation({ summary: '点赞', description: '传入用户id、帖子id和like or unlike，返回是否点赞成功' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('authLike')
  authLike(@Body() data) {
    return this.authService.authLike(data.user_id, data.post_id, data.code);
  }


  // 登录后判断是否点赞
  @ApiOperation({ summary: '根据token获取当前用户是否点赞', description: '传入用户ID和帖子ID，返回true or false' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('authIsLike')
  authIsLike(@Query() data) {
    return this.authService.authIsLike(Number(data.user_id), Number(data.post_id));
  }



  // 传入用户ID和贴吧ID
  @ApiOperation({ summary: '根据token关注贴吧', description: '传入用户ID和帖子ID，返回是否关注成功' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('followTieba')
  followTieba(@Body() data) {
    return this.authService.authFollowTieba(data.user_id, data.tieba_id)
  }

  // 获取用户关注的贴吧
  @ApiOperation({ summary: '根据token获取关注的贴吧', description: '传入用户ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('authUserTieba')
  authUserTieba(@Query() data) {
    return this.authService.authUserTieba(data.user_id);
  }

  // 获取用户关注的贴吧
  @ApiOperation({ summary: '获取用户是否关注贴吧', description: '传入用户ID，贴吧ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('isSubscribe')
  isSubscribe(@Query() data) {
    return this.authService.isSubscribe(data.userId, data.tiebaId);
  }

  // 获取登录用户的所有帖子
  @ApiOperation({ summary: '获取登录用户的所有帖子', description: '传入用户ID，页数，每页数量' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('userPosts')
  findLoginUserPost(@Query() data) {
    return this.authService.authUserPosts(data.id, data.page, data.pageSize);
  }

  // 更新token
}
