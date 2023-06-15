import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname, join } from 'path'
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tiezi]),
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
