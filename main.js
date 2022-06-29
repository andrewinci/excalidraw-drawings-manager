function buildTitle() {
    let titleContainer = document.createElement('div')
    titleContainer.style = "display: flex;"
    titleContainer.innerHTML = `<div>
        <p style="font-weight: bold;margin: 0;">My Projects</p>
    </div>`
    return titleContainer
}

function buildSaveItem() {
    let saveItemContainer = document.createElement('div')
    saveItemContainer.style = "display: flex;"
    saveItemContainer.innerHTML = `<div style="position: relative;">
        <div class="color-picker-control-container">
            <input style="border-radius: 4px;margin-right: 10px;width: auto;" spellcheck="false" class="color-picker-input" aria-label="Canvas background" placeholder="project name">
            <button>Save</button>
        </div>
    </div>`
    return saveItemContainer
}

function buildProjectItem(name) {
    let projectContainer = document.createElement('div')
    projectContainer.style = "display: flex;"
    projectContainer.innerHTML = `<div style="position: relative;">
        <div>
            <p style="margin: 0;max-width: 15em;">${name}</p>
            <button>Load</button> <button>Delete</button>
        </div>
    </div>`
    return projectContainer
}

console.log("Loading excalidraw projects plugin...")
let island = document.getElementsByClassName("Island")[0]
let verticalStack = island.childNodes[0]
verticalStack.appendChild(buildTitle())
verticalStack.appendChild(buildSaveItem())
verticalStack.appendChild(buildProjectItem("Long project name for testing Long project name for testing"))
verticalStack.appendChild(buildProjectItem("Project 2"))
verticalStack.appendChild(buildProjectItem("Project 3"))
console.log("Excalidraw projects loaded")