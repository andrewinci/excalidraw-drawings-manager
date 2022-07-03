interface ExcalidrawProject {
    name: string
    project: string
}

export class StorageHelper {
    private KEY_CURRENT_PROJECT = "current-project";
    private KEY_PROJECTS = "projects"

    getCurrentProjectName(): string | null {
        return localStorage.getItem(this.KEY_CURRENT_PROJECT)
    }

    getAllProjects(): ExcalidrawProject[] {
        const raw = localStorage.getItem(this.KEY_PROJECTS) ?? "[]"
        return JSON.parse(raw)
    }
}