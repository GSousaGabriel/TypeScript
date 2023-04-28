import { AutoBindDecorator } from "../decorators/auto-bind"
import { DragTarget } from "../models/drag-drop"
import { Project, ProjectStatus } from "../models/project"
import { projectState } from "../state/project-state"
import { BaseComponent } from "./base-component"
import { ProjectItem } from "./project-item"

export class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement> implements DragTarget{
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