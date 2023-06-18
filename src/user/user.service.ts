import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Star } from './entities/star.entity';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Star) private readonly star: Repository<Star>,
    @InjectRepository(Tiezi) private readonly tiezi: Repository<Tiezi>
  ) { }

  create(createUserDto: CreateUserDto, file) {
    const data = new User();
    data.userId = createUserDto.userId;
    data.userName = createUserDto.userName;
    data.email = createUserDto.email;
    data.password = createUserDto.password;
    data.mobile = createUserDto.mobile;
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
  }

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

  findUserTiezi(userId: string){
    return this.user.findOne({
      relations: ['tiezis'],
      where: {userId}
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
  async unLike(user_id: number, post_id:number){
    const data = await this.star.findOne({where: {user_id, post_id}});
    this.star.delete(data);

    const post = await this.tiezi.findOne({where: {id: post_id}});
    if(post.thumbUp > 0){
      post.thumbUp = --post.thumbUp;
    }
    this.tiezi.update(post_id, post);


    return {
      message: '取消点赞成功',
      code: 200
    };
  }

  // 获取是否点赞
 async isLike(user_id: number, post_id: number){
    const data = await this.star.find({where: {user_id}});
    let isLike = false;

    if(data){
      for(let i = 0; i < data.length; i++){
      
        if(data[i].post_id === post_id){
          isLike = true
        }
      }
    }

    return {isLike};
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
