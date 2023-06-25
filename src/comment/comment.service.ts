import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { IdArrayService } from 'src/id-array/id-array.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tiezi) private readonly tiezi: Repository<Tiezi>,
    private readonly IdArrayService: IdArrayService
  ) { }

  async create(createCommentDto: CreateCommentDto, file) {
    try {
      const com = new Comment(); // 评论数据库
      const usr = await this.user.findOne({ where: { id: createCommentDto.userId } }); // 用户
      const tz = await this.tiezi.findOne({ where: { id: createCommentDto.tieziId } }); // 帖子

      if (!usr) return { message: "用户id不存在" };
      if (!tz) return { message: "帖子id不存在" };

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

      // commentLists存放评论ID、用户ID、帖子ID
      const lists = await this.IdArrayService.createCommentLists({ commentId: com.id, userId: createCommentDto.userId, tieziId: createCommentDto.tieziId });
      const userComList = []; // 用于存放用户和评论的关系表
      const postComList = []; // 用于存放帖子和评论的关系表
      for (let i = 0; i < lists.length; i++) {
        // 遍历commList数组，如果数组中某一个对象的userId等于创建帖子的用户ID，
        // 就将这个对象中评论的具体内容压入userComList，然后再将userComList保存到对应的user表中
        if (lists[i].userId === Number(createCommentDto.userId)) {
          const data = await this.comment.findOne({where: {id: lists[i].commentId}});
          userComList.push(data);
        }
        // postComList同userComList
        if (lists[i].tieziId === Number(createCommentDto.tieziId)) {
          const data = await this.comment.findOne({where: {id: lists[i].commentId}});
          postComList.push(data);
        }
      }

      // 不指定id是创建新的用户，还需要填写username和password等必填的字段
      // 指定id就是更新某些字段：只更新数据
      const userEntity = new User();
      userEntity.id = Number(createCommentDto.userId);
      userEntity.comment = userComList;
      await this.user.save(userEntity);

      const tieziEntity = new Tiezi();
      tieziEntity.id = Number(createCommentDto.tieziId);
      tieziEntity.comment = postComList;
      tieziEntity.commentsNum = tz.commentsNum + 1; // 增加评论的数量
      await this.tiezi.save(tieziEntity);


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
  async uploadImg(id: number, filename) {
    const com = await this.comment.findOne({ where: { id } });
    com.tieziImg = filename;
    this.comment.save(com);
    return { message: '上传成功' }
  }

  async findOneByTiezi(id: number) {
    return await this.comment.findOne({ where: { id }, relations: ['user'] });
  }

  async findOneByUser(id: number) {
    return await this.comment.findOne({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
