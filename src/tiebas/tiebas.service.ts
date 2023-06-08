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

  async findOne(TiebaName: string) {
    const data = await this.tieba.findOne({
      relations: ['tiezis'],
      where: {
        tiebaName: TiebaName
      }
    });

    return {
      data,
      url: `http://localhost:3000/tiebas/${data.photoTieba}`,
      message: '查询成功',
      code: 200
    }
  }

  update(id: number, updateTiebaDto: UpdateTiebaDto) {
    return `This action updates a #${id} tieba`;
  }

  remove(id: number) {
    return `This action removes a #${id} tieba`;
  }
}
