// function Logger(target: Function){
//     console.log('logging...')
//     console.log(target)
// }

// @Logger
// class Person{
//     name= 'Max'

//     constructor(){
//         console.log('Creating new person object...')
//     }
// }

// const person= new Person()

// console.log(person)

//------------------------------------------------------------------------------------------
//factory method

// function Logger(logString: string) {
//     return function (target: Function) {
//         console.log('logging...')
//         console.log(target)
//     }
// }

// function WithTemplate(template: string, hookId: string) {
//     return function<T extends {new(...args: any[]): {name: string}}>(target: T) {
//         return class extends target{
//             constructor(...args: any[]){
//                 super()

//                 console.log('rendering template')
//                 const hookEl = document.getElementById(hookId)

//                 if (hookEl) {
//                     hookEl.innerHTML = template
//                     hookEl.querySelector('h1')!.textContent= this.name
//                 }
//             }
//         }
//     }
// }

// @Logger('test')
// @WithTemplate('<h1>Test</h1>', 'app')
// class Person {
//     name = 'Max'

//     constructor() {
//         console.log('Creating new person object...')
//     }
// }

// const person = new Person()

// console.log(person)

//--------------------------------------------

// function Log(target: any, propertyName: string){
//     console.log('property')
//     console.log(target, propertyName)
// }

// function Log2(target: any, name: string, descriptor: PropertyDescriptor){
//     console.log('Accessor')
//     console.log(target)
//     console.log(name)
//     console.log(descriptor)
// }

// function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
//     console.log('method')
//     console.log(target)
//     console.log(name)
//     console.log(descriptor)
// }

// function Log4(target: any, name: string | Symbol, position: number){
//     console.log('parameter')
//     console.log(target)
//     console.log(name)
//     console.log(position)
// }

// class Product{
//     @Log
//     private _price: number

//     @Log2
//     set price(value: number){
//         if(value>0){
//             this._price= value
//         }else{
//             throw new Error('Invalid price!')
//         }
//     }

//     constructor(public title: string, price: number){
//         this._price= price
//     }

//     @Log3
//     getPriceWithTax(@Log4 tax:number){
//         return this._price*(1+tax)
//     }
// }

// const p= new Product('A book', 1)

//--------------------------------------------
//auto bind

// function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor){
//     console.log(descriptor)
//     const originalMethod= descriptor.value
//     const adjDescriptor: PropertyDescriptor= {
//         configurable: true,
//         enumerable: false,
//         get(){
//             const boundFn= originalMethod.bind(this)
//             return boundFn
//         }
//     }
//     return adjDescriptor
// }

// class Printer{
//     message= "this message"

//     @AutoBind
//     showMessage(){
//         console.log(this.message)
//     }
// }

// const buttonClass= new Printer()
// const button= document.querySelector('button')

// button?.addEventListener('click', buttonClass.showMessage)

//--------------------------------------------
//validation

interface ValidatorConfig {
    [property: string]: {
        [ValidatableProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]

    if (!objValidatorConfig) {
        return true
    }
    let valid = true
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    valid = valid && !!obj[prop]
                    break
                case 'positive':
                    valid = valid && obj[prop] > 0
                    break
            }
        }
    }
    return valid
}

class Course {
    @Required
    title: string
    @PositiveNumber
    price: number

    constructor(title: string, price: number) {
        this.title = title
        this.price = price
    }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
    event.preventDefault()
    const titleEl = document.getElementById('title') as HTMLInputElement
    const priceEl = document.getElementById('price') as HTMLInputElement

    const title = titleEl.value
    const price = +priceEl.value

    const createCourse = new Course(title, price)

    if (!validate(createCourse)) {
        alert('Ops!')
    }

    console.log(createCourse)
})