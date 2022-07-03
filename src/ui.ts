export type PluginUiEvent = 'onLoad' | 'onDelete' | 'onUpdate' | 'onSave' | 'onNew'
export type PluginUiEventHandler = (projectName: string) => void
export class PluginUi {
    private rootContainer: HTMLDivElement
    private projectsContainer: HTMLDivElement
    private eventHandlers = new Map<PluginUiEvent, PluginUiEventHandler>()


    constructor(projectName: string) {
        // retireve the top left island
        const island = document.getElementsByClassName("Island")[0] as HTMLDivElement;
        // set the island title to be the same as the current project
        this.rootContainer = island.childNodes[0] as HTMLDivElement;
        const curentProjectNameTitle = this.createTitleItem(projectName)
        this.rootContainer.insertBefore(curentProjectNameTitle, this.rootContainer.firstChild)
        // add the list of projects title
        this.rootContainer.appendChild(this.createProjectsItem())
        // add the div that will contains all the projects
        this.projectsContainer = this.buildDivWithContent('')
        this.projectsContainer.style.display = "block";
        this.projectsContainer.style.overflowY = "scroll";
        this.projectsContainer.style.maxHeight = "10em";
        this.rootContainer.appendChild(this.projectsContainer)
    }

    setEventHandler(event: PluginUiEvent, handler: PluginUiEventHandler) {
        this.eventHandlers.set(event, handler)
    }

    getEventHandler(event: PluginUiEvent) {
        return this.eventHandlers.get(event) ?? (() => { })
    }

    createProjectsItem() {
        return this.buildDivWithContent(`<div>
                <p style="font-weight: bold;margin: 0;">Projects</p>
            </div>`)
    }

    createTitleItem(title: string) {
        const titleContent = this.buildDivWithContent(`<div>
                <p style="font-weight: bold;margin: 0;">${title}</p>
                <button>New</button>
                <button>Update</button>
                <button>Save as</button>              
            </div>`
        )
        const [_, newButton, updateButton, saveAsButton] = titleContent.children[0].children
        newButton.addEventListener("click", () => { this.getEventHandler('onNew')(null) });
        updateButton.addEventListener("click", () => { this.getEventHandler('onUpdate')(null) });
        saveAsButton.addEventListener("click", () => { this.getEventHandler('onSave')(null) });
        return titleContent
    }

    addToProjectList(projectName: string) {
        let project = this.buildDivWithContent(
            `<div style="position: relative;">
                <p style="margin: 0;max-width: 15em;">${projectName}</p>
                <button>Open</button>
                <button>Delete</button>
        </div>`)
        project.style.minHeight = "3.5em"
        // reassing after adding the project to the list of projects
        project = this.projectsContainer.appendChild(project)
        // attach event handler to the buttons
        const [_, openButton, deleteButton] = project.children[0].children;
        openButton.addEventListener("click", () => this.getEventHandler('onLoad')(projectName));
        deleteButton.addEventListener("click", () => this.getEventHandler('onDelete')(projectName));
    }

    private buildDivWithContent(innerHTML: string) {
        const container = document.createElement('div');
        container.style.display = "flex";
        container.innerHTML = innerHTML;
        return container
    }

}