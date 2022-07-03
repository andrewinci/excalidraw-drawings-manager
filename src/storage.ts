interface ExcalidrawProject {
    name: string
    project: string
}

export class StorageHelper {
    private KEY_CURRENT_PROJECT = "current-project";

    getCurrentProjectName(): string | null {
        return localStorage.getItem(this.KEY_CURRENT_PROJECT)
    }
}