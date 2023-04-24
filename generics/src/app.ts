// const names: Array<string> = []

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Done')
//     }, 2000)
// })

// promise.then(data=>{
//     data.split(' ')
// })

function merge<T extends object, U extends object>(objA: T, objB: U){
    return Object.assign(objA, objB)
}

const mergedObj= merge({name: 'Gabriel'}, {age: 30})

console.log(mergedObj.name)

interface Lenghty{
    length: number
}

function countAndDescribe<T extends Lenghty>(el: T){
    let descr= 'No value'
    if(el.length>0){
        descr= 'Got ' + el.length + 'element(s)'
    }
    return [el, descr]
}

console.log(countAndDescribe('Hello there'))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Value: ' + obj[key]
}

console.log(extractAndConvert({name: "Max"}, 'name'))

//generic classes

class dataStorage<T extends number | string | boolean>{
    private data: T[]=[]
    
    addItem(item: T){
        this.data.push(item)
    }
    
    removeItem(item: T){
        this.data.splice(this.data.indexOf(item), 1)
    }
    
    getItems(){
        return [...this.data]
    }
}

const textStorage= new dataStorage<string>()
textStorage.addItem('Max')
textStorage.addItem('Roger')
textStorage.removeItem('Roger')
console.log(textStorage.getItems())

const numberStorage= new dataStorage<number>()

// const objStorage= new dataStorage<object>() this won't work cause I can't remove the correct item. The generic class only accepts primitive values, even though you can add obj, you can't remove it correctly.
// objStorage.addItem({name: 'Max'})
// objStorage.addItem({name: 'Manuel'})
// objStorage.removeItem({name: 'Max'})
// console.log(textStorage.getItems())

//utilities types

interface CourseGoal{
    title: string
    description: string
    completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date):
CourseGoal{
    let courseGoal: Partial<CourseGoal> ={}
    courseGoal.title= title
    courseGoal.description= description
    courseGoal.completeUntil= date
    return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Max', 'Manuel']
//names.push('Anna')