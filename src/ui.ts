export class PluginUi {
    private rootContainer: HTMLDivElement
    private projectsContainer: HTMLDivElement
    private onLoadEventHandler: (projectName: string) => void = () => { };
    private onUpdateEventHandler: () => void = () => { };
    private onSaveEventHandler: () => void = () => { };
    private onNewEventHandler: () => void = () => { };

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

    setOnLoad(onload: (projectName: string) => void) { this.onLoadEventHandler = onload }
    setOnUpdate(onupdate: () => void) { this.onUpdateEventHandler = onupdate; }
    setOnSave(onsave: () => void) { this.onSaveEventHandler = onsave; }
    setOnNew(onnew: () => void) { this.onNewEventHandler = onnew; }

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
        const newButton = titleContent.children[0].children[1];
        const updateButton = titleContent.children[0].children[2];
        const saveAsButton = titleContent.children[0].children[3];
        newButton.addEventListener("click", () => { this.onNewEventHandler() });
        updateButton.addEventListener("click", () => { this.onUpdateEventHandler() });
        saveAsButton.addEventListener("click", () => { this.onSaveEventHandler() });

        return titleContent
    }

    addToProjectList(projectName: string) {
        let project = this.buildDivWithContent(
            `<div style="position: relative;">
                <p style="margin: 0;max-width: 15em;">${projectName}</p>
                <button>Open</button>
        </div>`)
        project.style.minHeight = "3.5em"
        // reassing after adding the project to the list of projects
        project = this.projectsContainer.appendChild(project)
        // attach event handler to the buttons
        const openButton = project.children[0].children.item(1);
        openButton.addEventListener("click", () => this.onLoadEventHandler(projectName));
    }

    private buildDivWithContent(innerHTML: string) {
        const container = document.createElement('div');
        container.style.display = "flex";
        container.innerHTML = innerHTML;
        return container
    }

}