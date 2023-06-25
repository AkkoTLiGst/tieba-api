import { Injectable } from '@nestjs/common';
import { CreateTieziLists } from './dto/createTieziLists.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { TieziLists } from './entities/tieziLists.entity';

@Injectable()
export class IdArrayService {
  constructor(
    @InjectRepository(TieziLists) private readonly tieziLists: Repository<TieziLists>
  ) { }

  createTiezisLists(createTieziLists: CreateTieziLists) {
    const list = new TieziLists();
    list.tiezi = JSON.stringify(createTieziLists.tiezi);
    list.baId = createTieziLists.baId;
    list.userId = createTieziLists.userId;

    this.tieziLists.save(list);
  }

  findAllTiezisLists() {
    return this.tieziLists.find();
  }
}
