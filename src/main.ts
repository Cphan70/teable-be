import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { CORS_CONFIG } from './configs/cors.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
dotenv.config();

async function bootstrap() {
  const options = new DocumentBuilder()
    .setTitle('Teable')
    .setDescription('The Teable API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, options);
  if (process.env.ENVIRONMENT == 'development') {
    SwaggerModule.setup('swagger-ui', app, document);
  }

  const port = configService.get<number>('PORT') as number;
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());
  app.enableCors(CORS_CONFIG);
  app.useGlobalFilters(new GlobalExceptionFilter(configService));
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
