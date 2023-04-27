//interfaces
//draggable interface
interface draggable{
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
}


//drag interface
interface DragTarget{
    dragOverHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
}

//drop interface
interface Drop{

}

//validators interface
interface Validatable {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}
//decorators

//bind decorator
function AutoBindDecorator(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalCall = descriptor.value
    const newCall: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalCall.bind(this)
            return boundFn
        }
    }
    return newCall
}

function validate(ValidatableInput: Validatable) {
    let isValid = true

    if (ValidatableInput.required) {
        isValid = isValid && ValidatableInput.value.toString().trim().length !== 0
    }

    if (ValidatableInput.minLength != null && typeof ValidatableInput.value === 'string') {
        isValid = isValid && ValidatableInput.value.length > ValidatableInput.minLength
    }

    if (ValidatableInput.maxLength != null && typeof ValidatableInput.value === 'string') {
        isValid = isValid && ValidatableInput.value.length < ValidatableInput.maxLength
    }

    if (ValidatableInput.min && typeof ValidatableInput.value === 'number') {
        isValid = isValid && ValidatableInput.value > ValidatableInput.min
    }

    if (ValidatableInput.max && typeof ValidatableInput.value === 'number') {
        isValid = isValid && ValidatableInput.value < ValidatableInput.max
    }
    return isValid
}

//classes
//generic class
abstract class GenericComponent<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U

    constructor(private templateId: string, private hostElementId: string, private newElementId: string, private insertAt: InsertPosition) {
        this.templateElement = document.getElementById(this.templateId)! as HTMLTemplateElement
        this.hostElement = document.getElementById(this.hostElementId)! as T

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as U
        this.element.id = this.newElementId

        this.attach()
    }

    private attach() {
        this.hostElement.insertAdjacentElement(this.insertAt, this.element)
    }

    abstract configure(): void
}

//project type
enum ProjectStatus {
    Active, Finished
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) { }
}

//project state class

//listener type
type Listener<T> = (items: T[]) => void

class State<T>{
    protected listeners: Listener<T>[] = []

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn)
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = []
    private static instance: ProjectState

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.Active
        )
        this.projects.push(newProject)
        this.updateListeners()
    }

    moveProject(projectId: string, newStatus: ProjectStatus){
        const prj= this.projects.find(prj=>prj.id === projectId)
        if(prj && prj.status != newStatus){
            prj.status= newStatus
            this.updateListeners()
        }
    }

    private updateListeners(){
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())
        }
    }
}

const projectState = ProjectState.getInstance()

//project item class
class ProjectItem extends GenericComponent<HTMLUListElement, HTMLLIElement> implements draggable{
    private project: Project

    get persons(){
        if(this.project.people === 1){
            return '1 person'
        }else{
            return `${this.project.people} persons`
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, project.id, 'beforeend')
        this.project = project

        this.configure()
        this.renderContent()
    }

    @AutoBindDecorator
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id)
        event.dataTransfer!.effectAllowed= 'move'
    }

    @AutoBindDecorator
    dragEndHandler(event: DragEvent): void {
        console.log(event)
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndHandler)
    }

    private renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
        this.element.querySelector('p')!.textContent = this.project.description
    }
}

//projectList class

class ProjectList extends GenericComponent<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[] = []

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', type + '-projects', 'beforeend')

        this.configure()
        this.renderContent()
    }

    @AutoBindDecorator
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0]=== 'text/plain'){
            event.preventDefault()
            const listEl= this.element.querySelector('ul')!
            listEl.classList.add('droppable')
        }
        
    }
    
    @AutoBindDecorator
    dropHandler(event: DragEvent): void {
        const prjId= event.dataTransfer!.getData('text/plain')
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    @AutoBindDecorator
    dragLeaveHandler(event: DragEvent): void {
        const listEl= this.element.querySelector('ul')!
        listEl.classList.remove('droppable')
        console.log(event)
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)

        projectState.addListener((projects: Project[]) => {
            const activeProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active
                } else {
                    return project.status === ProjectStatus.Finished
                }
            })
            this.assignedProjects = activeProjects
            this.renderProjects()
        })
    }

    private renderProjects() {
        const listEl = document.getElementById(this.type + '-projects-list') as HTMLUListElement
        listEl.innerHTML = ''
        for (const item of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, item)
        }
    }

    private renderContent() {
        const listId = this.type + '-projects-list'
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
    }
}


//project class
class ProjectInput extends GenericComponent<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        super('project-input', 'app', 'user-input', 'afterbegin')

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

        this.configure()
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enteredPeople = this.peopleInputElement.value

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10
        }

        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert('Validate all fields!')
            return
        }

        return [enteredTitle, enteredDescription, +enteredPeople]
    }

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    @AutoBindDecorator
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.gatherUserInput()

        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput

            projectState.addProject(title, description, people)

            this.clearInputs()
        }
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
}

const prjInput = new ProjectInput()
const prjListActive = new ProjectList('active')
const prjListFinished = new ProjectList('finished')