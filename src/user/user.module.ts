import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname, join } from 'path'
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { Star } from './entities/star.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Tieba } from 'src/tiebas/entities/tieba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tiezi, Star, Comment, Tieba]),
  MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '../images/user'),

      filename: (_, file, callback) => {
        const filename = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, filename);
      }
    })
  })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
