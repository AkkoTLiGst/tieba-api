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
      const user = await this.userService.findOneByEmial(needFind);
      return this.returnInfo(user, password);
    } else if (type === 'mobile') {
      const user = await this.userService.findOneByMobile(needFind);
      return this.returnInfo(user, password);
    } else if (type === 'userId') {
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
      userId: user.userId,
      username: user.userName,
      email: user.email,
      photoUser: user.photoUser,
      tiezis: user.tiezis
    }

    return sanitizedUser;
  }

  async authIsLike(user_id: number, post_id: number) {
    const data = await this.userService.isLike(user_id, post_id);
    return data;
  }

  async authLike(user_id: number, post_id: number, code: string) {
    if (code === 'like') {
      const data = await this.userService.like(user_id, post_id);
      return data;
    } else if (code === 'unlike') {
      const data = await this.userService.unLike(user_id, post_id);
    } else {
      return '错误，可能没有传递code'
    }
  }

  // 登录接口
  async login(userInfo: UserStatusDTO) {
    const tiezisID = [];
    for (let i = 0; i < userInfo.tiezis.length; i++) {
      tiezisID.push(userInfo.tiezis[i].id);
    }

    const token = this.createToken(userInfo, tiezisID);
    return {
      ...token
    }
  }

  // 创建token
  createToken({ username, id, userId, photoUser, email }: UserStatusDTO, tiezisID) {
    const token = this.jwtService.sign({ username, userId, id, photoUser, email, tiezisID });
    const expires = process.env.expiresTime;

    return {
      token,
      expires,
    }
  }

  // 获取用户的所有帖子id
  async getUserTiezi(user: UserStatusDTO) {
    const data = await this.userService.findUserTiezi(user.userId);

    const tiezisID = [];
    for (let i = 0; i < data.tiezis.length; i++) {
      tiezisID.push(data.tiezis[i].id);
    }
    return tiezisID;

  }
}
