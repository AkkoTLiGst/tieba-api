import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserStatusDTO } from 'src/user/dto/user-status.dto';
import * as _ from 'lodash'
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(loginUserDTO: LoginUserDto): Promise<UserStatusDTO> {
    const position = loginUserDTO.username.lastIndexOf("\:");
    // 获取传入的是username还是id还是userId
    const type = loginUserDTO.username.substring(0, position);
    // 获取传入的username/id/userId
    const needFind = loginUserDTO.username.substring(position + 1, loginUserDTO.username.length);

    // 获取密码
    const password = loginUserDTO.password;

    if (_.isEmpty(needFind) || _.isEmpty(password)) {
      throw new BadRequestException('user is required!');
    }

    
    if (type === "email") {
      // 数据库查找user
      const user = await this.userService.findLoginUser(needFind);
      return this.returnInfo(user, password);
    }else if(type === 'mobile'){
      const user = await this.userService.findOneByMobile(needFind);
      return this.returnInfo(user, password);
    }else if(type === 'userId'){
      const user = await this.userService.findOneByUID(needFind);
      return this.returnInfo(user, password);
    }
  }

  returnInfo(user: User, password) {
    if (_.isEmpty(user)) {
      throw new BadRequestException('user not found!');
    }
    // 判断密码是否相同
    const isValidPwd = (password === user.password ? true : false);
    if (!isValidPwd) {
      throw new BadRequestException('password is not valid!');
    }

    const sanitizedUser = {
      id: user.id,
      username: user.userName,
      email: user.email,
      photoUser: user.photoUser
    }

    return sanitizedUser;

  }


  // 登录接口
  async login(userInfo: UserStatusDTO) {
    const token = this.createToken(userInfo);
    return {
      userInfo,
      ...token
    }

  }

  createToken({ username, id: userId, photoUser, email }: UserStatusDTO) {
    const token = this.jwtService.sign({ username, userId, photoUser, email });
    const expires = process.env.expiresTime;

    return {
      token,
      expires,
    }
  }
}
