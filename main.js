class Graphics {
    constructor() {
        let island = document.getElementsByClassName("Island")[0]
        this.verticalStack = island.childNodes[0]
        this.addTitle()
        this.addSaveProjectContainer()
    }

    addTitle() {
        let titleContainer = document.createElement('div')
        titleContainer.style = "display: flex;"
        titleContainer.innerHTML = `<div>
            <p style="font-weight: bold;margin: 0;">My Projects</p>
        </div>`
        this.verticalStack.appendChild(titleContainer)
    }

    addSaveProjectContainer() {
        let saveItemContainer = document.createElement('div')
        saveItemContainer.style = "display: flex;"
        saveItemContainer.innerHTML = `<div style="position: relative;">
            <div class="color-picker-control-container">
                <input style="border-radius: 4px;margin-right: 10px;width: auto;" spellcheck="false" class="color-picker-input" aria-label="Canvas background" placeholder="project name">
                <button>Save</button>
            </div>
        </div>`
        this.verticalStack.appendChild(saveItemContainer)
    }

    addProject(project) {
        let projectContainer = document.createElement('div')
        projectContainer.style = "display: flex;"
        projectContainer.innerHTML = `<div style="position: relative;">
            <div>
                <p style="margin: 0;max-width: 15em;">${project.name}</p>
                <button>Load</button> <button>Delete</button>
            </div>
        </div>`
        this.verticalStack.appendChild(projectContainer)
    }
}


console.log("Loading excalidraw projects plugin...")
// load projects
const PROJECTS_KEY_NAME = "projects";
let projects = JSON.parse(localStorage.getItem(PROJECTS_KEY_NAME))
if (!projects) {
    // example projects
    projects = [{name: "Example 1", content: null},{name: "Example 2", content: null}]
    localStorage.setItem(PROJECTS_KEY_NAME, JSON.stringify(projects))
}

const graphic = new Graphics()
projects.forEach(p => {
    graphic.addProject(p)
});

console.log("Excalidraw projects loaded")