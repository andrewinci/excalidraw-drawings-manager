interface ExcalidrawDrawing {
    name: string
    content: string
}

export class DrawingStore {
    private KEY_CURRENT_DRAWING_NAME = "current-drawing";
    private KEY_DRAWINGS = "drawings"
    private KEY_EXCALIDRAW = "excalidraw"

    getCurrentName(): string | null {
        return localStorage.getItem(this.KEY_CURRENT_DRAWING_NAME)
    }
    setCurrent(drawing: ExcalidrawDrawing) {
        localStorage.setItem(this.KEY_EXCALIDRAW, drawing.content)
        localStorage.setItem(this.KEY_CURRENT_DRAWING_NAME, drawing.name)
    }
    cleanCurrent() {
        localStorage.removeItem(this.KEY_CURRENT_DRAWING_NAME);
        localStorage.removeItem(this.KEY_EXCALIDRAW);
    }
    getAll(): ExcalidrawDrawing[] {
        const raw = localStorage.getItem(this.KEY_DRAWINGS) ?? "[]"
        return JSON.parse(raw)
    }
    findByName(name: string): ExcalidrawDrawing | null {
        return this.getAll().find(p => p.name === name)
    }
    update(): boolean {
        const all = this.getAll()
        const currentDrawing = all.find(p => p.name == this.getCurrentName())
        if (currentDrawing) {
            currentDrawing.content = localStorage.getItem(this.KEY_EXCALIDRAW)
            localStorage.setItem(this.KEY_DRAWINGS, JSON.stringify(all))
            return true
        }
        return false
    }
    create(name: string): ExcalidrawDrawing | null {
        const allDrawings = this.getAll();
        const alreadyExists = allDrawings.find(p => p.name == name) != undefined;
        if (alreadyExists) {
            return null;
        }
        const newDrawing = { name: name, content: localStorage.getItem(this.KEY_EXCALIDRAW) }
        allDrawings.push(newDrawing)
        localStorage.setItem(this.KEY_DRAWINGS, JSON.stringify(allDrawings))
        return newDrawing;
    }
    delete(name: string) {
        const allDrawings = this.getAll();
        const newListOfDrawings = allDrawings.filter(p => p.name != name)
        localStorage.setItem(this.KEY_DRAWINGS, JSON.stringify(newListOfDrawings))
    }
}