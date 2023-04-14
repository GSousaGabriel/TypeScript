
type Combinable= number | string //custom type
type conversionDesc= 'add' | 'concat'

function add(n1: number, n2: number) {
    return n1 + n2
}

const nb1 = '5'
const nb2: number = 2.8

enum Role { ADMIN = 'admin', READ_ONLY = 100, AUTHOR = 200 }


console.log(add(+nb1, +nb2))

const person: {
    name: string,
    age: number,
    role: [number, string] //tuple
    roleType: string | number
} = {
    name: 'Jorge',
    age: 12,
    role: [2, 'author'],
    roleType: Role.ADMIN,
}

//person.role[1]= 10 gives error after tuple definition
//person.role= [1, 'string', 'string'] gives error after tuple definition

console.log(person.name)

function addConcat(val: Combinable, val2: Combinable, operation: conversionDesc) { //add could be boolean, but that's not my point
    let result: Combinable

    if (operation === 'add') {
        result = +val + +val2
    } else {
        result = val.toString() + val2.toString()
    }
    return result
}

console.log(addConcat(1, '1', 'add')) // the last parameter needs to be 'add' or 'concat' 