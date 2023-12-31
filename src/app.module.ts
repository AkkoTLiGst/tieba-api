import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TiebasModule } from './tiebas/tiebas.module';
import { TieziModule } from './tiezi/tiezi.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { IdArrayModule } from './id-array/id-array.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql", //数据库类型
      username: "root", //账号
      password: "haoge946mysql", //密码
      host: "localhost", //host
      port: 3306, //
      database: "tieba", //库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 每个接口自动匹配实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10,//重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    TiebasModule,
    TieziModule,
    UserModule,
    AuthModule,
    CommentModule,
    IdArrayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
