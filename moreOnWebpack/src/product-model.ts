// import {isNotEmpty, IsNumber, IsPositive} from "class-validator" Not working for some reason

export class Product{
    title: string
    price: number

    constructor(t: string, p: number){
        // @isNotEmpty()
        this.title= t
        // @IsNumber()
        // @IsPositive()
        this.price= p
    }

    getInformation(){
        return [this.title, `$${this.price}`]
    }
}