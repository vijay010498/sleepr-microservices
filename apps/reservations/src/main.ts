import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as CookieParser from 'cookie-parser';
import { SwaggerConfig } from '@app/common';
async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(CookieParser());
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  new SwaggerConfig(app, 'api');
  await app.listen(configService.get('PORT'));
}
bootstrap();
