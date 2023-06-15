import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) { }

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

  findLoginUser(email: string) {
    return this.user.findOne({
      where: { email },
      
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
