export type PluginUiEvent = 'onLoad' | 'onDelete' | 'onUpdate' | 'onSave' | 'onNew'
export type PluginUiEventHandler = (name: string) => void
export class PluginUi {
    private rootContainer: HTMLDivElement
    private drawingsContainer: HTMLDivElement
    private eventHandlers = new Map<PluginUiEvent, PluginUiEventHandler>()


    constructor(drawingName: string) {
        // retireve the top left island
        const island = document.getElementsByClassName("Island")[0] as HTMLDivElement;
        // set the island title to be the same as the current drawing
        this.rootContainer = island.childNodes[0] as HTMLDivElement;
        const curentDrawingTitle = this.createDrawingTitle(drawingName)
        this.rootContainer.insertBefore(curentDrawingTitle, this.rootContainer.firstChild)
        // add the list of drawings title
        this.rootContainer.appendChild(this.createDrawingsTitle())
        // add the div that will contains all the drawings
        this.drawingsContainer = this.buildDivWithContent('')
        this.drawingsContainer.style.display = "block";
        this.drawingsContainer.style.overflowY = "scroll";
        this.drawingsContainer.style.maxHeight = "10em";
        this.rootContainer.appendChild(this.drawingsContainer)
    }

    setEventHandler(event: PluginUiEvent, handler: PluginUiEventHandler) {
        this.eventHandlers.set(event, handler)
    }

    getEventHandler(event: PluginUiEvent) {
        return this.eventHandlers.get(event) ?? (() => { })
    }

    createDrawingsTitle() {
        return this.buildDivWithContent(`<div>
                <p style="font-weight: bold;margin: 0;">Drawings</p>
            </div>`)
    }

    createDrawingTitle(title: string) {
        const titleContent = this.buildDivWithContent(`<div>
                <p style="font-weight: bold;margin: 0;">${title}</p>
                <button>New</button>
                <button>Update</button>
                <button>Save as</button>              
            </div>`
        )
        const [_, newButton, updateButton, saveAsButton] = titleContent.children[0].children
        newButton.addEventListener("click", () => { this.getEventHandler('onNew')(null) });
        updateButton.addEventListener("click", () => { this.getEventHandler('onUpdate')(null) });
        saveAsButton.addEventListener("click", () => { this.getEventHandler('onSave')(null) });
        return titleContent
    }

    addToDrawingList(name: string) {
        let drawingItem = this.buildDivWithContent(
            `<div style="position: relative;">
                <p style="margin: 0;max-width: 15em;">${name}</p>
                <button>Open</button>
                <button>Delete</button>
        </div>`)
        drawingItem.style.minHeight = "3.5em"
        // re-assing after adding the drawing to the list of drawings
        drawingItem = this.drawingsContainer.appendChild(drawingItem)
        // attach event handler to the buttons
        const [_, openButton, deleteButton] = drawingItem.children[0].children;
        openButton.addEventListener("click", () => this.getEventHandler('onLoad')(name));
        deleteButton.addEventListener("click", () => this.getEventHandler('onDelete')(name));
    }

    private buildDivWithContent(innerHTML: string) {
        const container = document.createElement('div');
        container.style.display = "flex";
        container.innerHTML = innerHTML;
        return container
    }

}