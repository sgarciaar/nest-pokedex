import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
//path base global para todos nuestros servicios
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      //el whiteList elimina  los campos extras no incluidos en el dto  y que nos envian al servicio
      whitelist: true,
      //arroja un error si se mandan mas valores de los esperados al servicio
      forbidNonWhitelisted: true,
    })),




  await app.listen(3000);
}
main();
