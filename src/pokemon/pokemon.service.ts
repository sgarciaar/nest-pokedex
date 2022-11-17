import { Injectable, Controller, BadRequestException, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/paginatin.dto';


@Injectable()
export class PokemonService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,


    private  readonly configService:ConfigService



  ){
    //imprimir variables globales desde el .env
   //console.log(process.env.DEFOUL_LIMIT);
    //imprimir variables globales desde app.config.ts
    //console.log(configService.get('defaultLimit'));
    //esto no hace conversion es solo para decirte a ts que es un numero
   // const defaultLimit = configService.get<number>('defaultLimit');
    //console.log(defaultLimit)

  }

 async create(createPokemonDto: CreatePokemonDto) {
    
  createPokemonDto.name = createPokemonDto.name.toLowerCase();
try
  {
     //AGREGA EN LA BD MONGO
    const pokemon = await this.pokemonModel.create( createPokemonDto);
    return pokemon;
  }
catch (error)
  {
    this.handleExceptions(error);
  }
}

async  findAll(paginationDto:PaginationDto ) {



  //el offset es la paginacion
  const{ limit=5,offset=0} = paginationDto;

    return await this.pokemonModel.find().limit(limit).skip(offset).sort({
      //significa que orede la columna no de forma acendente
      no:1

    }).select('-__v')//el -__v quita el v de mongo
  }

  //buscando por cualquier campo del json nombre, id , idmongo
async  findOne(term: string) {
   
  let pokemon: Pokemon;

  if(!isNaN(+term))
     pokemon = await this.pokemonModel.findOne({no:term});

  //mongoID
  if(!pokemon && isValidObjectId(term))
    pokemon = await this.pokemonModel.findById(term);

  if(!pokemon)
    pokemon = await this.pokemonModel.findOne({name:term.toLowerCase().trim()});

  if(!pokemon)
    throw new NotFoundException(`El pokemon no se encontro`);
      return pokemon

  }

 async update(term: string, updatePokemonDto: UpdatePokemonDto) 
 {
   
   const pokemon = await this.findOne(term);

   if(updatePokemonDto.name)
   updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
   
    try{   
      //el new :true devuelve el nuevo objeto ya guardado
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};
    }
    catch(error)
    {
      this.handleExceptions(error);
    }
}   

 async remove(id: string) {

    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //const result = await this.pokemonModel.findByIdAndDelete(id);

    const {deletedCount} = await this.pokemonModel.deleteOne({_id:id});
    if (deletedCount===0)
    throw new BadRequestException(`Pokemon con el id ${id} no se encuentra`);
     return 
  }

  private handleExceptions( error: any)
  {
    if(error.code=== 11000)
    {
      throw new  BadRequestException (`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`No se puedo crear el pokemon- cheque el server log`);
  }
    
}
  


