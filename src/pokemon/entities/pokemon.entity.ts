import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//al externderlo de Document le decimos es para mongo
@Schema()
export class Pokemon extends Document{

    @Prop({
        unique:true,
        index :true
    })
    name:string;

    @Prop({
        unique:true,
        index :true
    })
    no: number;


}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);