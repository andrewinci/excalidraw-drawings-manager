import "../manifest.json"
import { PluginUi } from "./ui"
import { DrawingStore } from './storage'
//import "./main.js"

console.log("Loading excalidraw drawings plugin....")
const storage = new DrawingStore()
const currentDrawingName = storage.getCurrentName() ?? "New drawing";
const ui = new PluginUi(currentDrawingName)
storage
    .getAll()
    .forEach(p => ui.addToDrawingList(p.name))

ui.setEventHandler('onLoad', (name) => {
    let currentDrawing = storage.findByName(name)
    storage.setCurrent(currentDrawing)
    location.reload()
})
ui.setEventHandler('onUpdate', () => {
    if (!storage.getCurrentName()) {
        alert("Save the drawing first")
        return
    }
    if (!storage.update()) {
        alert(`Unable to udpdate the drawing. Please retry and check the console.`)
    }
})
ui.setEventHandler('onSave', () => {
    const newDrawingName = prompt("New drawing name: ")
    if (!newDrawingName) {
        // no name for the new drawing has been specified.
        // nothing to do
        return
    }
    const currentDrawing = storage.create(newDrawingName);
    if (currentDrawing) {
        // storing suceedeed
        storage.setCurrent(currentDrawing)
        location.reload()
    }
    else {
        alert("Unable to store this drawing. The name for the new drawing must be unique")
    }
})
ui.setEventHandler('onNew', () => {
    storage.cleanCurrent()
    location.reload()
})
ui.setEventHandler('onDelete', (drawingName) => {
    storage.delete(drawingName)
    storage.cleanCurrent()
    location.reload()
})
console.log("Excalidraw drawings plugin loaded")