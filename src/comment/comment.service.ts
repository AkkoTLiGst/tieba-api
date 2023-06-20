import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { commentList } from 'src/variable';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tiezi) private readonly tiezi: Repository<Tiezi>,
  ) { }

  async create(createCommentDto: CreateCommentDto, file) {
    try {
      const com = new Comment(); // 评论数据库
      const usr = await this.user.findOne({ where: { id: createCommentDto.userId } }); // 用户
      const tz = await this.tiezi.findOne({ where: { id: createCommentDto.tieziId } }); // 帖子

      // 评论信息
      com.comment = createCommentDto.comment;
      com.floor = createCommentDto.floor;
      com.thumbUp = 0; // 初始化点赞数量
      // 判断评论是否包含图片
      if (file) {
        com.tieziImg = file.filename;
      } else {
        com.tieziImg = '';
      }
      await this.comment.save(com);

      // 多表联查
      commentList.push(com);
      // 更新用户
      usr.comment = commentList;
      this.user.save(usr);
      // 更新帖子 
      tz.comment = commentList;
      tz.commentsNum = tz.commentsNum + 1;
      this.tiezi.save(tz);

      return {
        message: '评论创建成功',
        id: com.id,
        code: 200
      }
    } catch (error) {
      return {
        message: '评论创建失败',
        error
      }
    }
  }

  // 上传图片
  async uploadImg(id:number, filename){
    const com = await this.comment.findOne({where: {id}});
    com.tieziImg = filename;
    this.comment.save(com);
    return {message: '上传成功'}
  }

  async findOneByTiezi(id: number) {
    return await this.comment.findOne({where: {id}, relations: ['user']});
  }
  
  async findOneByUser(id: number) {
    return await this.comment.findOne({where: {id}});
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
