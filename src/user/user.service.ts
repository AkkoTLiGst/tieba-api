import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Star } from './entities/star.entity';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { Tieba } from 'src/tiebas/entities/tieba.entity';
import { followTiebaList } from 'src/variable';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Star) private readonly star: Repository<Star>,
    @InjectRepository(Tiezi) private readonly tiezi: Repository<Tiezi>,
    @InjectRepository(Tieba) private readonly tieba: Repository<Tieba>,
  ) { }

  create(createUserDto: CreateUserDto, file) {
    try {
      const data = new User();
      data.userId = createUserDto.userId;
      data.userName = createUserDto.userName;
      data.email = createUserDto.email;
      data.password = createUserDto.password;
      data.mobile = createUserDto.mobile;
      data.tieba = [];
      // 判断用户是否上传了头像
      if (file) {
        data.photoUser = file.filename;
      } else {
        data.photoUser = '';
      }

      this.user.save(data);

      return {
        message: '用户创建成功',
        code: 200
      };
    } catch (error) {
      return error
    }
  }

  // 查询四兄弟：通过用户名、手机号、email、ID查询
  findOneByUID(userId: string) {
    return this.user.findOne({
      where: { userId }
    });
  }
  findOneByMobile(mobile: string) {
    return this.user.findOne({
      where: { mobile }
    });
  }
  findOneByEmial(email: string) {
    return this.user.findOne({
      where: { email },

    })
  }
  findOneById(id: number) {
    return this.user.findOne({
      where: { id },

    })
  }
  // 查询用户信息包括所有帖子
  findUserTiezi(userId: string) {
    return this.user.findOne({
      relations: ['tiezis'],
      where: { userId }
    })
  }

  // 查询用户信息包括关注的所有贴吧
  findUserTieba(id: number) {
    return this.user.findOne({
      relations: ['tieba'],
      where: { id }
    })
  }

  // 点赞
  async like(user_id: number, post_id: number) {
    /// star表更新用户帖子对应关系
    const data = new Star();
    data.post_id = post_id;
    data.user_id = user_id;
    this.star.save(data);

    // 对应帖子点赞数++
    const post = await this.tiezi.findOne({ where: { id: post_id } });
    post.thumbUp = ++post.thumbUp;
    this.tiezi.update(post_id, post);

    return {
      message: '点赞成功',
      code: 200
    }
  }

  // 取消点赞
  async unLike(user_id: number, post_id: number) {
    const data = await this.star.findOne({ where: { user_id, post_id } });
    this.star.delete(data);

    const post = await this.tiezi.findOne({ where: { id: post_id } });
    if (post.thumbUp > 0) {
      post.thumbUp = --post.thumbUp;
    }
    this.tiezi.update(post_id, post);


    return {
      message: '取消点赞成功',
      code: 200
    };
  }

  // 获取是否点赞
  async isLike(user_id: number, post_id: number) {
    const data = await this.star.find({ where: { user_id } });
    let isLike = false;

    if (data) {
      for (let i = 0; i < data.length; i++) {

        if (data[i].post_id === post_id) {
          isLike = true
        }
      }
    }

    return { isLike };
  }

  // 关注贴吧
  async followTieba(user_id: number, tieba_id: number) {
    try {
      followTiebaList.push(tieba_id);

      const usr = await this.user.findOne({ where: { id: user_id } });
      if (!usr) return { message: "用户id不存在" };

      if (followTiebaList.length !== 0) {
        const followList = [];

        for (let i = 0; i < followTiebaList.length; i++) {
          const tb = await this.tieba.findOne({ where: { id: followTiebaList[i] } });
          if (!tb) return { message: "贴吧id不存在" };
          followList.push(tb);
        }

        // 重点：
        // 不指定id是创建新的用户，还需要填写username和password等必填的字段
        // 指定id就是更新某些字段：只关注贴吧，不创建新的用户，同样可用于修改
        const userEntity = new User();
        userEntity.id = user_id;
        userEntity.tieba = followList;
        await this.user.save(userEntity);

        return {
          message: '关注成功',
          code: 200
        }
      }
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
