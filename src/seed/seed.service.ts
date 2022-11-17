import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  //agregamos la dependencia de la clase axios
  

  

  constructor(

    @InjectModel (Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    
    private readonly http: AxiosAdapter


  ){}


  async executeSeed(){

    //esto es lo mismo que deleted * from pokemons 
   await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
 
    //const inserPromisesArray=[];

    const pokemonToInsert:{name:string, no:number}[]=[]
    data.results.forEach(async({name,url})=>
    {

        console.log(name,url);
        //separar un string
        const segments = url.split('/');

        console.log(segments);

        //convertir de no:string a number segments[segments.length-2]
        const no:number = +segments[segments.length-2]

        //insertamos con await y el mudulo ya importado
       // const pokemon = await this.pokemonModel.create({name,no})})

       //insertar todo sin await
       pokemonToInsert.push({name,no});

    })

     await this.pokemonModel.insertMany(pokemonToInsert);

      return `Seed Executed!`;
  }
}

