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
    setCurrentProject(project: ExcalidrawProject){
        localStorage.setItem(this.KEY_EXCALIDRAW, project.content)
        localStorage.setItem(this.KEY_CURRENT_PROJECT, project.name)
    }
}