class Graphics {
    constructor(onsave) {
        let island = document.getElementsByClassName("Island")[0]
        this.verticalStack = island.childNodes[0]
        this.onsave = onsave
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
        const saveButtonId = "save-project-button";
        const projectNameId = "project-name"
        let saveItemContainer = document.createElement('div')
        saveItemContainer.style = "display: flex;"
        saveItemContainer.innerHTML = `<div style="position: relative;">
            <div class="color-picker-control-container">
                <input id="${projectNameId}" style="border-radius: 4px;margin-right: 10px;width: auto;" spellcheck="false" class="color-picker-input" aria-label="Canvas background" placeholder="project name">
                <button id="${saveButtonId}">Save</button>
            </div>
        </div>`
        this.verticalStack.appendChild(saveItemContainer)
        document.getElementById(saveButtonId).addEventListener("click", () => {
            const projectNameInput = document.getElementById(projectNameId)
            this.onsave(this, projectNameInput.value);
            projectNameInput.value = null;
        })
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

class ProjectsManager {
    constructor() {
        this.PROJECTS_KEY_NAME = "projects";
        this.load()
    }

    add(project){
        this.projects.push(project)
        this.store()
    }

    load(){
        const raw = localStorage.getItem(this.PROJECTS_KEY_NAME);
        this.projects = raw ? JSON.parse(raw) : [];
        return this.projects
    }

    store(){
        localStorage.setItem(this.PROJECTS_KEY_NAME, JSON.stringify(this.projects))
    }

}


console.log("Loading excalidraw projects plugin...")
const pm = new ProjectsManager();

function saveProject(graphic, name) {
    const content = localStorage.getItem("excalidraw");
    if (!content) console.error("Content not found!!")
    const newProject = {name: name, content: content};
    pm.add(newProject)
    graphic.addProject(newProject)
}

const graphic = new Graphics(saveProject)
pm.load().forEach(p => {
    graphic.addProject(p)
});

console.log("Excalidraw projects loaded")