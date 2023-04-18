interface Name{
    name: string
    socialName?: string
}

interface Greet extends Name{
    readonly id: number
    
    greet(phrase: string): void
}

class Person implements Greet{
    name: string
    age: number
    socialName?: string

    constructor(readonly id: number, name: string, age: number, socialName?: string){
        this.name= name
        this.age= age
        if(socialName){
            this.socialName= socialName
        }
    }

    greet(phrase: string){
        console.log(this.name + ' ' + phrase)
    }
}

let person1= new Person(1, 'Gabriel', 12)
// person1.id= 2 can't do. Readonly properties are only defined once

console.log(person1)
person1.greet('greets you')

let person2=new Person(2, 'Maria', 32, 'Marian')
console.log(person2)

// type newFunction= (n1: number, n2: number)=> number
interface newFunction{
    (n1: number, n2: number): number
}

let add: newFunction
add= (a:number, b: number)=>a+b