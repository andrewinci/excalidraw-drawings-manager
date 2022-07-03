import "../manifest.json"
import { PluginUi } from "./ui"
import { StorageHelper } from './storage'
//import "./main.js"

console.log("Loading excalidraw projects plugin....")
const storage = new StorageHelper()
const currentProjectName = storage.getCurrentProjectName() ?? "New project";
const ui = new PluginUi(currentProjectName)
storage
    .getAllProjects()
    .forEach(p => ui.addToProjectList(p.name))

ui.setOnLoad((projectName) => {
    let currentProj = storage.getProject(projectName)
    storage.setCurrentProject(currentProj)
    location.reload()
})
ui.setOnUpdate(() => {
    if (!storage.getCurrentProjectName()){
        alert("Save the project first")
        return
    }
    if (!storage.updateProject()) {
        alert(`Unable to udpdate the project. Please retry and check the console.`)
    }
})
ui.setOnSave(() => {
    const newProjectName = prompt("New project name: ")
    if (!newProjectName) {
        // no name for the new project has been specified.
        // nothing to do
        return
    }
    const currentProject = storage.storeCurrentProject(newProjectName);
    if (currentProject) {
        // storing suceedeed
        storage.setCurrentProject(currentProject)
        location.reload()
    }
    else {
        alert("Unable to store this drawing. The name for the new project must be unique")
    }
})
ui.setOnNew(() => {
    storage.cleanCurrentProject()
    location.reload()
})
console.log("Excalidraw projects plugin loaded")