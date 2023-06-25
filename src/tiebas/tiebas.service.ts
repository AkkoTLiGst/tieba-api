import { Injectable } from '@nestjs/common';
import { CreateTiebaDto } from './dto/create-tieba.dto';
import { UpdateTiebaDto } from './dto/update-tieba.dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Tieba } from './entities/tieba.entity';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';

@Injectable()
export class TiebasService {
  constructor(
    @InjectRepository(Tieba) private readonly tieba: Repository<Tieba>
  ) { }

  create(createTiebaDto: CreateTiebaDto, file) {
    const data = new Tieba();
    data.tiebaName = createTiebaDto.tiebaName;
    data.aboutTieba = createTiebaDto.aboutTieba;
    data.subscribeTieba = createTiebaDto.subscribeTieba;
    data.photoTieba = file.filename;

    this.tieba.save(data);

    return {
      message: '贴吧创建成功',
      code: 200
    };
  }

  async findOneByName(tiebaName: string) {
    const data = await this.tieba.findOne({
      where: {
        tiebaName
      }
    });

    return data
  }

  async findOneByID(id: number) {
    const data = await this.tieba.findOne({
      where: {
        id
      }
    });

    return data
  }

  async findCount() {
    const data = await this.tieba.count();
    // console.log(data);

    return {
      data,
      code: 200,
      message: '总数查询成功'
    }
  }

  update(id: number, updateTiebaDto: UpdateTiebaDto) {
    return `This action updates a #${id} tieba`;
  }

  remove(id: number) {
    return `This action removes a #${id} tieba`;
  }
}
