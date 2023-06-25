import { Module } from '@nestjs/common';
import { IdArrayService } from './id-array.service';
import { IdArrayController } from './id-array.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TieziLists } from './entities/tieziLists.entity';
import { CommentLists } from './entities/commentLists.entity';
import { FollowTiebaLists } from './entities/followTiebaLists.enetity';

@Module({
  imports: [TypeOrmModule.forFeature([TieziLists, CommentLists, FollowTiebaLists])],
  controllers: [IdArrayController],
  providers: [IdArrayService],
  exports: [IdArrayService]
})
export class IdArrayModule {}
