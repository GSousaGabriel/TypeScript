type stringOrNumber= string | number

const test= 'test'

//test= 'test 1' can't change because it's a const

// let and var are almost the same, except let only works within the block it was written

var a= 'testing'
let b= '23 test'

console.log(a)
console.log(b)

function aFunc(){
    a= 'tested'
    b= 'also tested'
}

aFunc()

console.log(a)
console.log(b)

if(a != 'Gabriel'){
    let ab= 'test if'//cannot use outside the if
}

if(1==1){
    var ab= 'test if also' //can use outside the if
}

const add= (n1: number, n2: number)=> n1+n2

const printResult= (result: stringOrNumber)=>{
    console.log(result)
}

const printResult2: (fReturn: stringOrNumber) => void = result=>console.log(result)

printResult(add(1, 2))
printResult2(add(3, 2))

const hobbies= ['gaming', 'cooking']
const addHobbie= ['studying'] // ...hobbies]

console.log(...hobbies)

hobbies.push(...addHobbie)

console.log(...hobbies)

const person={
    name: 'Gabriel',
    age:30
}

const newPerson={...person, age: 10} //new object

const testPerson= person

testPerson.age= 20 //point in memory change

console.log(person)

console.log(newPerson)

const addMore= (...numbers: number[]/*Array<Number>*/)=>{
    return numbers.reduce((curResult, curValue)=>{
        return curResult+curValue
    }, 0)
}

console.log(addMore(1,2,3,4))

const [hobbie1, hobbie2, ...otherHobbies]= hobbies

console.log(hobbie1, hobbie2, otherHobbies)

const {age}= person

console.log(age)