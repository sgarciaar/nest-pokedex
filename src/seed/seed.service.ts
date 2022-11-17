import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  //agregamos la dependencia de la clase axios
  private readonly axios:AxiosInstance=axios;



  async executeSeed(){

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
   

    data.results.forEach(({name,url})=>{

        console.log(name,url);
        //separar un string
        const segments = url.split('/');

        console.log(segments);

        //convertir de string a number
        const no:number = +segments[segments.length-2]

        console.log({name,no});



    }


    )

    return data.results;
  }
}
