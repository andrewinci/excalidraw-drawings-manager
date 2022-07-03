import "../manifest.json"
import { PluginUi } from "./ui"
import { StorageHelper } from './storage'
//import "./main.js"

const storage = new StorageHelper()
const currentProjectName = storage.getCurrentProjectName() ?? "New project";
const ui = new PluginUi(currentProjectName)
storage
    .getAllProjects()
    .forEach(p => ui.addToProjectList(p.name))

