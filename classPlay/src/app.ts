abstract class Departament{
    // private name: string
    protected employees: string[]= [] // protected allows to change from classes that extends this class, private don't.

    constructor(private readonly id: number, public name: string){
        // this.name= name
    }

    abstract describe(this: Departament): void/*{
         console.log('the departament '+ this.id + ' is called '+this.name)
    }*/

    addEmployee(name: string){
        this.employees.push(name)
    }

    printEmployees(this: Departament){
        console.log(this.employees.length)
        console.log(this.employees)
    }

    static createEmployee(name: string){
        return {
            name
        }
    }
}

class ItDepartament extends Departament{
    private static instance: ItDepartament

    private constructor(id: number, public admins: string[]){
        super(id, 'IT')
    }

    getAdmins(){
        console.log(this.admins)
    }

    addEmployee(name: string) {
        if(this.admins.indexOf(name) === 0){
            console.log('Admins are not employees!')
        }else{
            this.employees.push(name)
        }
    }

    describe(this: Departament): void {
        console.log('the departament is called '+this.name)
    }
    
    static getorCreate(){
        if(this.instance){
            return this.instance
        }else{
            this.instance= new ItDepartament(1, ['Roger', 'Bruno'])
        }
    }
}

class DummyDepartament extends Departament{
    private lastReport: string

    get mostRecentReport(){
        return this.lastReport
    }

    set mostRecentReport(report: string){
        if(report === this.lastReport){
            console.log('already added')
            return
        }else{
            this.addReport(report)
        }
    }

    constructor(id: number, name: string, private reports: string[]= []){
        super(id, name)
        this.lastReport= reports[0]
    }

    addReport(report:string){
        this.reports.push(report)
        this.lastReport= report
    }
    
    describe(this: Departament): void {
        console.log('the departament is called '+this.name)
    }
}

const accounting= new DummyDepartament(1, 'Accounting')
const sales= new DummyDepartament(2, 'Sales')

accounting.describe()
accounting.addEmployee('Roger')
accounting.addEmployee('Mario')
//accounting.employees[0]= 'Roger' private properties cannot be changed outside the class they are defined
accounting.printEmployees()
console.log(sales)


const It= ItDepartament.getorCreate()
It?.printEmployees()
It?.addEmployee('Marta')
It?.printEmployees()
It?.getAdmins()

const dummy= new DummyDepartament(1, 'dummy')
dummy.addReport('tested report')
dummy.addReport('not tested report!')
console.log(dummy.mostRecentReport)
dummy.mostRecentReport= 'Error on code'
dummy.mostRecentReport= 'Error on code'
console.log(dummy.mostRecentReport)

const employee1= Departament.createEmployee('Macella')
console.log(employee1)