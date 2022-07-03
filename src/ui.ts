export class PluginUi {
    rootContainer: HTMLDivElement
    projectsContainer: HTMLDivElement
    onLoadEventHandler: (projectName: string) => void = () => { };

    constructor(projectName: string) {
        // retireve the top left island
        const island = document.getElementsByClassName("Island")[0] as HTMLDivElement;
        // set the island title to be the same as the current project
        this.rootContainer = island.childNodes[0] as HTMLDivElement;
        const curentProjectNameTitle = this.createTitleItem(projectName)
        this.rootContainer.insertBefore(curentProjectNameTitle, this.rootContainer.firstChild)
        // add the list of projects title
        const projectsTitle = this.createTitleItem("Projects")
        this.rootContainer.appendChild(projectsTitle)
        // add the div that will contains all the projects
        this.projectsContainer = this.buildDivWithContent('')
        this.projectsContainer.style.display = "block";
        this.projectsContainer.style.overflowY = "scroll";
        this.projectsContainer.style.maxHeight = "10em";
        this.rootContainer.appendChild(this.projectsContainer)
    }

    setOnLoad(onload: (projectName: string) => void) {
        this.onLoadEventHandler = onload
    }

    createTitleItem(title: string) {
        return this.buildDivWithContent(`<div>
                <p style="font-weight: bold;margin: 0;">${title}</p>
            </div>`
        )
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