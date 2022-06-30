class Graphics {
    constructor(projectName, onsave, ondelete, onload, onupdate) {
        let island = document.getElementsByClassName("Island")[0]
        this.verticalStack = island.childNodes[0]
        this.onsave = onsave;
        this.ondelete = ondelete;
        this.onload = onload;
        this.onupdate = onupdate;
        this.projectName = projectName;
        // order matter
        this.addSaveProjectContainer()
        this.addTitle()
        this.addProjects()
    }

    addTitle() {
        let titleContainer = document.createElement('div')
        titleContainer.style = "display: flex;"
        titleContainer.innerHTML = `<div>
            <p style="font-weight: bold;margin: 0;">${this.projectName}</p>
        </div>`
        this.verticalStack.insertBefore(titleContainer, this.verticalStack.firstChild)
    }

    addSaveProjectContainer() {
        const saveButtonId = "save-project-button";
        const projectNameId = "project-name"
        let saveItemContainer = document.createElement('div')
        saveItemContainer.style = "display: flex;"
        saveItemContainer.innerHTML = `<div style="position: relative;">
            <div class="color-picker-control-container">
                <input id="${projectNameId}" style="border-radius: 4px;margin-right: 10px;width: auto;" spellcheck="false" class="color-picker-input" placeholder="project name">
                <button id="${saveButtonId}">Save</button>
            </div>
        </div>`
        this.verticalStack.insertBefore(saveItemContainer, this.verticalStack.firstChild)
        document.getElementById(saveButtonId).addEventListener("click", () => {
            const projectNameInput = document.getElementById(projectNameId)
            this.onsave(this, projectNameInput.value);
            projectNameInput.value = null;
        })
    }

    addProjects() {
        let titleContainer = document.createElement('div')
        titleContainer.style = "display: flex;"
        titleContainer.innerHTML = `<div>
            <p style="font-weight: bold;margin: 0;">Projects</p>
        </div>`
        this.verticalStack.appendChild(titleContainer)
        this.projectsContainer = document.createElement('div')
        this.projectsContainer.style = "overflow-y: scroll;max-height: 10em;";
        this.verticalStack.appendChild(this.projectsContainer)
    }

    addProject(project) {
        let projectContainer = document.createElement('div')
        projectContainer.style = "display: flex;min-height: 3.5em;"
        projectContainer.innerHTML = `<div style="position: relative;">
                <p style="margin: 0;max-width: 15em;">${project.name}</p>
                <button>Load</button>
                <button>Update</button>
                <button>Delete</button>
        </div>`
        projectContainer = this.projectsContainer.appendChild(projectContainer)
        // attach event handler to the buttons
        const [_, loadButton, updateButton, deleteButton] = projectContainer.children[0].children;
        loadButton.addEventListener("click", () => this.onload(this, project.name));
        updateButton.addEventListener("click", () => this.onupdate(this, project.name));
        deleteButton.addEventListener("click", (e) => {
            if(this.ondelete(this, project.name))
                e.target.parentElement.parentElement.remove()
        });
    }
}

class ProjectsManager {
    constructor() {
        this.PROJECTS_KEY_NAME = "projects";
        this.load()
    }

    get(projectName) {
        return this.projects.find(p => p.name == projectName)
    }

    remove(projectName) {
        this.projects = this.projects.filter(p => p.name != projectName);
        this.store();
    }

    add(project) {
        // project name must be unique
        if (this.projects.map(p => p.name).includes(project.name))
            return false;
        this.projects.push(project)
        this.store()
        return true;
    }

    load() {
        const raw = localStorage.getItem(this.PROJECTS_KEY_NAME);
        this.projects = raw ? JSON.parse(raw) : [];
        return this.projects
    }

    store() {
        localStorage.setItem(this.PROJECTS_KEY_NAME, JSON.stringify(this.projects))
    }

}


console.log("Loading excalidraw projects plugin...")
const pm = new ProjectsManager();

function saveProject(graphic, name) {
    const content = localStorage.getItem("excalidraw");
    if (!content) console.error("Content not found!!")
    const newProject = { name: name, content: content };
    if (pm.add(newProject)) {
        graphic.addProject(newProject)
    } else {
        alert("Unable to save the project, try with another name")
    }
}

function updateProject(_, name) {
    if (!confirm(`Are you sure to update the project ${name}. The previous draw will be deleted.`)){
        return;
    }
    const proj = pm.get(name);
    const content = localStorage.getItem("excalidraw");
    if (!content) console.error("Content not found!!")
    pm.remove(name);
    pm.add({ name: proj.name, content: content })
}

function deleteProject(_, name) {
    if (confirm(`Are you sure to delete the project ${name}`)){
        pm.remove(name)
        return true
    }
    return false
}

function loadProject(_, name) {
    const proj = pm.get(name);
    if (!proj) {
        console.error("Unable to find the project name", name)
        return;
    }
    localStorage.setItem("excalidraw", proj.content);
    localStorage.setItem("current-project", proj.name);
    // need to refresh to let the app reload the local
    // project
    location.reload();
}
let currentProjectName = localStorage.getItem("current-project") ?? "New project";
const graphic = new Graphics(currentProjectName, saveProject, deleteProject, loadProject, updateProject)
pm.load().forEach(p => {
    graphic.addProject(p)
});

console.log("Excalidraw projects loaded")