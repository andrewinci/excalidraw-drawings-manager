export class PluginUi {
    rootContainer: HTMLDivElement
    projectsContainer: HTMLDivElement

    constructor(projectName: string) {
        const island = document.getElementsByClassName("Island")[0] as HTMLDivElement;
        this.rootContainer = island.childNodes[0] as HTMLDivElement;
        const curentProjectNameTitle = this.createTitleItem(projectName)
        this.rootContainer.insertBefore(curentProjectNameTitle, this.rootContainer.firstChild)
        const projectsTitle = this.createTitleItem("Projects")
        this.rootContainer.appendChild(projectsTitle)
    }

    createTitleItem(title: string) {
        let titleContainer = document.createElement('div');
        titleContainer.style.display = "flex";
        titleContainer.innerHTML = `
            <div>
                <p style="font-weight: bold;margin: 0;">${title}</p>
            </div>`
        return titleContainer;
    }

}