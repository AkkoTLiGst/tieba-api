import { Module } from '@nestjs/common';
import { TiebasService } from './tiebas.service';
import { TiebasController } from './tiebas.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tieba } from './entities/tieba.entity';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname, join } from 'path'
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Tieba, Tiezi, User]),
    // 创建存储文件目录
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images/tiebas'),
       
        filename: (_, file, callback) => {
          const filename = `${new Date().getTime() + extname(file.originalname)}`
          return callback(null, filename);
        }
      })
    })
  ],
  controllers: [TiebasController],
  providers: [TiebasService]
})
export class TiebasModule { }
