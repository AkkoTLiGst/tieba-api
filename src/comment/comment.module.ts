import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { Comment } from './entities/comment.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path'
import { IdArrayService } from 'src/id-array/id-array.service';
import { CommentLists } from 'src/id-array/entities/commentLists.entity';
import { IdArrayModule } from 'src/id-array/id-array.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tiezi, Comment, CommentLists]),
    IdArrayModule,
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images/comment'),

        filename: (_, file, callback) => {
          const filename = `${new Date().getTime() + extname(file.originalname)}`
          return callback(null, filename);
        }
      })
    })
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
