import { Injectable } from '@nestjs/common';
import { CreateTieziDto } from './dto/create-tiezi.dto';
import { UpdateTieziDto } from './dto/update-tiezi.dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Tieba } from 'src/tiebas/entities/tieba.entity';
import { Tiezi } from './entities/tiezi.entity';
import { tieziLists } from 'src/variable';

@Injectable()
export class TieziService {
  constructor(
    @InjectRepository(Tieba) private readonly tieba: Repository<Tieba>,
    @InjectRepository(Tiezi) private readonly tiezi: Repository<Tiezi>
  ) { }

  async create(createTieziDto: CreateTieziDto) {
    const zi = new Tiezi(); // 帖子数据库
    const ba = await this.tieba.findOne({where: {id: createTieziDto.tieBaId}}) // 具体某个吧

    zi.createrId = createTieziDto.createrId;
    zi.threadTitle = createTieziDto.threadTitle;
    zi.content = createTieziDto.content;
    zi.tieziImg = createTieziDto.tieziImg;

    await this.tiezi.save(zi);


    tieziLists.push(zi);

    ba.tiezis = tieziLists;
    this.tieba.save(ba);
    
    return {
      message: '帖子创建成功',
      code: 200
    };
  }

  findAll() {
    return `This action returns all tiezi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiezi`;
  }

  update(id: number, updateTieziDto: UpdateTieziDto) {
    return `This action updates a #${id} tiezi`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiezi`;
  }
}
