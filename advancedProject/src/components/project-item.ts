import { AutoBindDecorator } from '../decorators/auto-bind'
import { Draggable } from '../models/drag-drop'
import { Project } from '../models/project'
import { BaseComponent } from './base-component'

export class ProjectItem extends BaseComponent<HTMLUListElement, HTMLLIElement> implements Draggable{
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