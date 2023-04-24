// type Admin={
//     name: string
//     privileges: string[]
// }

// type Employee={
//     name: string
//     startDate: Date
// }

// type ElevatedEmployee= Admin & Employee

interface Employee {
    name: string
    startDate: Date
}

interface ElevatedEmployee extends Employee {
    privileges: string[]
}

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}
type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric

//function overload
function addNumber(a: string, b: string): string
function addNumber(a: number, b: number): number
function addNumber(a: Combinable, b: Combinable) {
    //need to check the type
    if (typeof a === 'string' && typeof b === 'string') {
        return a + b
    } else if (typeof a === 'number' && typeof b === 'number') {
        return a + b
    }
    return
}

const result = addNumber('Max', ' Roger')
result.split(' ')

type UnknownEmployee = Employee | ElevatedEmployee

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name)

    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges)
    }
}

printEmployeeInfo(e1)

class Car {
    drive() {
        console.log('driving...')
    }
}

class Truck {
    drive() {
        console.log('driving...')
    }

    loadCargo(amount: number) {
        console.log('loading cargo...' + amount)
    }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()

    if (vehicle instanceof Truck) {
        vehicle.loadCargo(2)
    }
}

useVehicle(v1)
useVehicle(v2)

//discriminated Unions

interface Bird {
    type: 'bird'
    flyingSpeed: number
}

interface Horse {
    type: 'horse'
    runningSpeed: number
}

type Animal = Horse | Bird

function moveAnimal(animal: Animal) {
    let speed

    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
            break
        case 'horse':
            speed = animal.runningSpeed
    }
    console.log('Moving wit speed: ' + speed)
}

//type casting
// const input= <HTMLInputElement>document.getElementById('test')!
const input = document.getElementById('test') as HTMLInputElement

input.value = 'tested'

//index properties
interface ErrorContainer {
    [key: string]: string
}

const error: ErrorContainer = {
    email: 'Not valid'
}

console.log(error.email)

//chaining
const fetchUserData = {
    id: 1,
    name: 'Max',
    job: { title: 'CEO', description: 'Owner of company' }
}

console.log(fetchUserData?.job?.title)

//nullish coalescing
const userInput = null

const storedData = userInput ?? 'default'

console.log(storedData)