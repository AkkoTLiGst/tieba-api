import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder().addBearerAuth().setTitle('贴吧接口文档').setDescription('描述....').setVersion('版本1').build();
  const document = SwaggerModule.createDocument(app, options); // 初始化文档
  SwaggerModule.setup('/api-docs', app, document); // 设置文档接口

  app.useStaticAssets(join(__dirname, 'images')); // 用于访问静态目录
  await app.listen(3000);
}
bootstrap();
