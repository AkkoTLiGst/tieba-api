import { Module } from '@nestjs/common';
import { IdArrayService } from './id-array.service';
import { IdArrayController } from './id-array.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TieziLists } from './entities/tieziLists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TieziLists])],
  controllers: [IdArrayController],
  providers: [IdArrayService]
})
export class IdArrayModule {}
