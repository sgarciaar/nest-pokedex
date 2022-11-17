import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDto{

    @IsOptional()
    @IsPositive()
    //valor minimo
    @Min(1)
    @IsNumber()
    //cuando se agrega el ? el valor es opcional
    limit?: number;

    @IsPositive()
    @IsOptional()
    @IsNumber()
    //cuando se agrega el ? el valor es opcional
    offset?: number;

    
}