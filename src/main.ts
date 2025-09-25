import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext, addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  addTransactionalDataSource(dataSource);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
