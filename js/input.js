let keyPressed = {}

let keybinds = {
    keyListening:0,
    keyDone:true,
    "Move Up":{mod:"",key:"KeyW"},
    "Move Down":{mod:"",key:"KeyS"},
    "Move Left":{mod:"",key:"KeyA"},
    "Move Right":{mod:"",key:"KeyD"},
    "Ability1 Bar1":{mod:"",key:"Digit1"}, //vivify
    "Ability1+":{mod:"ShiftLeft",key:"KeyQ"}, //rsk

}
let keyLoop = () => {
    let modPressed = function(name) {
        if (keybinds[name].mod === "") {
            return !(keyPressed["ShiftLeft"] || keyPressed["ControlLeft"])
        } else if (keyPressed[keybinds[name].mod]) {
            return true
        }
    }

    if (keyPressed[keybinds["Move Left"].key]) {
        if ((modPressed("Move Left"))) {
            player.rotate(player.direction+1)

        }
    }
    if (keyPressed[keybinds["Move Right"].key]) {
        if ((modPressed("Move Right"))) {
            player.rotate(player.direction-1)
        }
    }
    if (keyPressed[keybinds["Move Up"].key]) {
        if ((modPressed("Move Up"))) {
            player.move(1)
        }
    }
    if (keyPressed[keybinds["Move Down"].key]) {
        if ((modPressed("Move Down"))) {
            player.move(-0.5)
        }
    }
    if (keyPressed[keybinds["Ability1 Bar1"].key]) {
        if ((modPressed("Ability1 Bar1"))) {
            player.abilities["Vivify"].startCast(player)
        }
    }

}

//----------------------------------
let keyup = (e)=> {
    if(e.code!=="F12" && e.code!=="F11" && e.code!=="Numpad0" && e.code!=="Numpad1" && e.code!=="Numpad2" && e.code!=="Numpad3" && e.code!=="Numpad4" && e.code!=="Numpad5" && e.code!=="Numpad6" && e.code!=="Numpad7" && e.code!=="Numpad8" && e.code!=="Numpad9" && e.code!=="Period" && e.code!=="NumpadDecimal" && e.code!=="Backspace") {
        e.preventDefault()
    }
    keyPressed[e.code]=false
}

let keydown = (e)=> {
    if (e.code!=="F12" &&  e.code!=="F11" && e.code!=="Numpad0" && e.code!=="Numpad1" && e.code!=="Numpad2" && e.code!=="Numpad3" && e.code!=="Numpad4" && e.code!=="Numpad5" && e.code!=="Numpad6" && e.code!=="Numpad7" && e.code!=="Numpad8" && e.code!=="Numpad9" && e.code!=="Period" && e.code!=="NumpadDecimal" && e.code!=="Backspace") {
        e.preventDefault()
    }
    keyPressed[e.code]=true
    if (keybinds.keyListening!==0) {
        if (e.code!=="ShiftLeft" && e.code!=="ControlLeft") {
            keybinds[keybinds.keyListening].key = e.code
            if (keyPressed["ShiftLeft"]) {
                keybinds[keybinds.keyListening].mod = "ShiftLeft"
            } else if (keyPressed["ControlLeft"]) {
                keybinds[keybinds.keyListening].mod = "ControlLeft"
            } else {
                keybinds[keybinds.keyListening].mod = ""
            }
            keybinds.keyListening = 0
            keyPressed[e.code]=false
            keybinds.keyDone = false
        }
    }
}


document.addEventListener('keydown', keydown)
document.addEventListener('keyup', keyup)

//-------------------------------
let resetInputs = function() {
    Object.keys(keyPressed).forEach(key => {
        keyPressed[key] = false
    })
}

window.addEventListener('blur', resetInputs)
