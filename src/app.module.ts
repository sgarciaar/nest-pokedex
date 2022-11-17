import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Mongoose } from 'mongoose';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [

    //configuracion al inicio para ocupar variables de entornos personalizadas
    ConfigModule.forRoot({
      //configuracion que se agrega con el nombre de la funcion descrito en el archivo app.config.ts conversiones y mapeos
      load: [EnvConfiguration],
      //esto se agrega al trabajar con joi conversiones y mapeos con validaciones 
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    
    }),

    //asi se aplican las variables globales de configuracion 
    MongooseModule.forRoot(process.env.MONGODB),
   // MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule,
    SeedModule],
})
export class AppModule {

  constructor(){
    //ahi estan las variables de entorno naticas de nest
    //console.log(process.env)
  }
}




