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

@Injectable()
export class TieziService {
  constructor(
    @InjectRepository(Tieba) private readonly tieba: Repository<Tieba>,
    @InjectRepository(Tiezi) private readonly tiezi: Repository<Tiezi>,
    @InjectRepository(User) private readonly user: Repository<User>
  ) { }

  async create(createTieziDto: CreateTieziDto, file) {
    const zi = new Tiezi(); // 帖子数据库
    const ba = await this.tieba.findOne({ where: { id: createTieziDto.ctieBaId } }); // 吧
    const usr = await this.user.findOne({ where: { id: createTieziDto.createrId } }); // 用户


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

    // 多表联查
    tieziLists.push(zi);

    ba.tiezis = tieziLists;
    this.tieba.save(ba);

    usr.tiezis = tieziLists;
    this.user.save(usr);
    // console.log(tieziLists);

    return {
      message: '帖子创建成功',
      code: 200
    };
  }

  getTieziById(data: searchTiezi) {
    return this.tiezi.findOne({
      where: {id: data.tieziID}
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


    // console.log(data.createTimeTiezi);

    return data;
  }

  update(id: number, updateTieziDto: UpdateTieziDto) {
    return `This action updates a #${id} tiezi`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiezi`;
  }
}
