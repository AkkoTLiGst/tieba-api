import { Injectable } from '@nestjs/common';
import { CreateTieziDto } from './dto/create-tiezi.dto';
import { UpdateTieziDto } from './dto/update-tiezi.dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Tieba } from 'src/tiebas/entities/tieba.entity';
import { Tiezi } from './entities/tiezi.entity';
import { tieziLists } from 'src/variable';
import { User } from 'src/user/entities/user.entity';
import { searchTiezi } from 'src/types/types';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class TieziService {
  constructor(
    @InjectRepository(Tieba) private readonly tieba: Repository<Tieba>,
    @InjectRepository(Tiezi) private readonly tiezi: Repository<Tiezi>,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Comment) private readonly commnet: Repository<Comment>
  ) { }

  async create(createTieziDto: CreateTieziDto, file) {
    const zi = new Tiezi(); // 帖子数据库
    const ba = await this.tieba.findOne({ where: { id: createTieziDto.ctieBaId } }); // 吧
    const usr = await this.user.findOne({ where: { id: createTieziDto.createrId } }); // 用户

    if (!usr) return { message: "用户id不存在" };
    if (!ba) return { message: "吧id不存在" };


    // 创建帖子信息
    zi.createrId = createTieziDto.createrId;
    zi.threadTitle = createTieziDto.threadTitle;
    zi.content = createTieziDto.content;
    zi.ctieBaId = createTieziDto.ctieBaId;
    // 判断帖子是否包含图片
    if (file) {
      zi.tieziImg = file.filename;
    } else {
      zi.tieziImg = '';
    }

    // 初始化点赞、收藏和评论数量
    zi.commentsNum = 0;
    zi.star = 0;
    zi.thumbUp = 0;

    // 保存到数据库
    await this.tiezi.save(zi);

    tieziLists.push({ tiezi: zi, userId: createTieziDto.createrId, baId: createTieziDto.ctieBaId });
    const userTzList = [];
    const baTzList = [];
    for (let i = 0; i < tieziLists.length; i++) {
      if (tieziLists[i].userId === createTieziDto.createrId) {
        userTzList.push(tieziLists[i].tiezi);
      }
      if (tieziLists[i].baId === createTieziDto.ctieBaId) {
        baTzList.push(tieziLists[i].tiezi);
      }
    }


    const userEntity = new User();
    userEntity.id = Number(createTieziDto.createrId);
    userEntity.tiezis = userTzList;
    await this.user.save(userEntity);

    const baEntity = new Tieba();
    baEntity.id = Number(createTieziDto.ctieBaId);
    baEntity.tiezis = baTzList;
    await this.tieba.save(baEntity);

    return {
      message: '帖子创建成功',
      code: 200
    };
  }

  getTieziById(data: searchTiezi) {
    return this.tiezi.findOne({
      where: { id: data.tieziID }
    });
  }

  async randomTieziTB(tiebaId: number) {
    // 截取最新的十条ctiebaId为"tiebaId"的数据
    let datalist = await this.tiezi.createQueryBuilder()
      .where('tiezi.ctieBaId = :tiebaId', { tiebaId })
      .orderBy('tiezi.createTimeTiezi', 'DESC')
      .limit(10)
      .getMany();

    let data: Tiezi;
    if (datalist.length < 10) {
      // 如果小于十条，就在总数之间随机获取
      data = datalist[Math.floor(Math.random() * datalist.length)];
    } else {
      // 如果大于十条，在最新的十条里随机获取其中一条
      data = datalist[Math.floor(Math.random() * 10)];
    }
    return data;
  }

  // 通过帖子ID获取帖子对应所有评论的id
  async findAllCommentId(tieziId: number) {
    try {
      const allCom = await this.tiezi.findOne({ where: { id: tieziId }, relations: ['comment'] });

      const arr = [];

      for (let i = 0; i < allCom.comment.length; i++) {
        arr.push(allCom.comment[i].id);
      }

      return arr;
    } catch (error) {
      return error
    }
  }

  update(id: number, updateTieziDto: UpdateTieziDto) {
    return `This action updates a #${id} tiezi`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiezi`;
  }
}
