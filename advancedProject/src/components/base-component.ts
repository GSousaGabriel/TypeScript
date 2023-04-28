
export abstract class BaseComponent<T extends HTMLElement, U extends HTMLElement>{
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