interface ExcalidrawProject {
    name: string
    content: string
}

export class StorageHelper {
    private KEY_CURRENT_PROJECT = "current-project";
    private KEY_PROJECTS = "projects"
    private KEY_EXCALIDRAW = "excalidraw"

    getCurrentProjectName(): string | null {
        return localStorage.getItem(this.KEY_CURRENT_PROJECT)
    }
    getAllProjects(): ExcalidrawProject[] {
        const raw = localStorage.getItem(this.KEY_PROJECTS) ?? "[]"
        return JSON.parse(raw)
    }
    getProject(name: string): ExcalidrawProject | null {
        return this.getAllProjects().find(p => p.name === name)
    }
    setCurrentProject(project: ExcalidrawProject) {
        localStorage.setItem(this.KEY_EXCALIDRAW, project.content)
        localStorage.setItem(this.KEY_CURRENT_PROJECT, project.name)
    }
    updateProject(): boolean {
        const all = this.getAllProjects()
        const currentProject = all.find(p => p.name == this.getCurrentProjectName())
        if (currentProject) {
            currentProject.content = localStorage.getItem(this.KEY_EXCALIDRAW)
            localStorage.setItem(this.KEY_PROJECTS, JSON.stringify(all))
            return true
        }
        return false
    }
    storeCurrentProject(projectName: string): ExcalidrawProject | null {
        const allProjects = this.getAllProjects();
        const alreadyExists = allProjects.find(p => p.name == projectName) != undefined;
        if (alreadyExists) {
            return null;
        }
        const newProject = { name: projectName, content: localStorage.getItem(this.KEY_EXCALIDRAW) }
        allProjects.push(newProject)
        localStorage.setItem(this.KEY_PROJECTS, JSON.stringify(allProjects))
        return newProject;
    }
    cleanCurrentProject() {
        localStorage.removeItem(this.KEY_CURRENT_PROJECT);
        localStorage.removeItem(this.KEY_EXCALIDRAW);
    }
    deleteProject(projectName: string) {
        const allProjects = this.getAllProjects();
        const newListOfProjects = allProjects.filter(p => p.name != projectName)
        localStorage.setItem(this.KEY_PROJECTS, JSON.stringify(newListOfProjects))
    }
}