import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: process.env.DEBUG === 'true' }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('application.port');
  const apiVersion = configService.get<string>('application.apiVersion');
  const apiRoutePrefix = configService.get<string>(
    'application.apiRoutePrefix',
  );
  const swaggerTitle = configService.get<string>('application.swagger.title');
  const swaggerDesc = configService.get<string>(
    'application.swagger.description',
  );

  app.setGlobalPrefix(apiRoutePrefix);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const options = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDesc)
    .setVersion(apiVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // serve
  await app.listen(port);
}
bootstrap();
