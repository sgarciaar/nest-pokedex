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
      //transforma los parameter enviados por url a la definicion del dto transform:true, enableImplicitConversion:true,
      transform:true,
      transformOptions:{
        enableImplicitConversion:true,
      }
    })),



//a este nivel del main solo se pueden definir las variables de entorno de esta forma process.env.PORT
  await app.listen(process.env.PORT);
  console.log(`La app esta corriendo en el puerto ${process.env.PORT}`);
}
main();
