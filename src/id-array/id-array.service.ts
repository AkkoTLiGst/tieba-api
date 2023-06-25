import { Injectable } from '@nestjs/common';
import { CreateTieziLists } from './dto/createTieziLists.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { TieziLists } from './entities/tieziLists.entity';
import { CommentLists } from './entities/commentLists.entity';
import { CreateCommentListsDto } from './dto/commentLists.dto';
import { FollowTiebaListsDto } from './dto/followTiebaLists.dto';
import { FollowTiebaLists } from './entities/followTiebaLists.enetity';

@Injectable()
export class IdArrayService {
  constructor(
    @InjectRepository(TieziLists) private readonly tieziLists: Repository<TieziLists>,
    @InjectRepository(CommentLists) private readonly commentLists: Repository<CommentLists>,
    @InjectRepository(FollowTiebaLists) private readonly followTiebaLists: Repository<FollowTiebaLists>,
  ) { }

  // 帖子用户贴吧关联
  async createTiezisLists(createTieziLists: CreateTieziLists) {
    const list = new TieziLists();
    list.tieziId = createTieziLists.tieziId;
    list.baId = createTieziLists.baId;
    list.userId = createTieziLists.userId;

    await this.tieziLists.save(list);
    
    return this.tieziLists.find();
  }

  // 帖子用户评论关联
  async createCommentLists(createCommentLists: CreateCommentListsDto) {
    const list = new CommentLists();
    list.commentId = createCommentLists.commentId;
    list.tieziId = createCommentLists.tieziId;
    list.userId = createCommentLists.userId;

    await this.commentLists.save(list);
    
    return this.commentLists.find();
  }

  // 帖吧用户关联
  async createFollowTiebaLists(followTiebaLists: FollowTiebaListsDto) {
    const list = new FollowTiebaLists();
    list.tiebaId = followTiebaLists.tiebaId;
    list.userId = followTiebaLists.userId;

    await this.followTiebaLists.save(list);
    
    return this.followTiebaLists.find();
  }
}
