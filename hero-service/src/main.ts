import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './common/exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AnyExceptionFilter());

  const options = new DocumentBuilder()
  .setTitle('NestJS Heroes example')
  .setDescription('The Heroes API description')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
