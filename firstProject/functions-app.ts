function sum(n1: number, n2: number): number {
    return n1 + n2
}

function printResult(num: number): void {
    console.log('Result: ' + num)
}

function addHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2
    cb(result)
}

printResult(sum(5, 2))

let combined: (p1: number, p2: number) => number
combined = sum
//combined = printResult combined specified differently from the type os this function

console.log(combined(1, 2))

console.log(addHandle(11, 2, (number)=>{
    console.log(number)
}))