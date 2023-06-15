import { Module } from '@nestjs/common';
import { TieziService } from './tiezi.service';
import { TieziController } from './tiezi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tiezi } from './entities/tiezi.entity';
import { Tieba } from 'src/tiebas/entities/tieba.entity';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname, join } from 'path'
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tiezi, Tieba, User]),
  // 创建存储文件目录
  MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '../images/tiezi'),

      filename: (_, file, callback) => {
        const filename = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, filename);
      }
    })
  })
  ],
  controllers: [TieziController],
  providers: [TieziService]
})
export class TieziModule { }
