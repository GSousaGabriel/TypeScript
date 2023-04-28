import _ from 'lodash'
import 'reflect-metadata'
// import {plainToClass } from 'class-trasnformer' not working for some reason
// import { validate } from 'class-validator'

import { Product } from './product-model'

declare var GLOBAL: string

console.log(_.shuffle([1, 2, 3]))
console.log(GLOBAL)

const products = [
    { title: 'Carpet', price: 30.32 },
    { title: "Car", price: 31023.12 }
]
// const p1 = new Product('Book', 23)
// validade(p1).then(errors=>{
//     if(errors.length>0){
//         console.log(errors)
//     }else{
//         console.log(p1.getInformation())
//     }
// })

const loadedProducts= products.map(prod=>{
    return new Product(prod.title, prod.price)
})

// const loadedProducts= plainToClass(Product, products)

for(const prod of loadedProducts){
    console.log(prod.getInformation())
}
