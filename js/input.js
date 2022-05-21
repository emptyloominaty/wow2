let strafing = false
let mousePosition = {x:0,y:0}

let keyPressed = {}

let keybindsD = {
    "Digit1":"1",
    "Digit2":"2",
    "Digit3":"3",
    "Digit4":"4",
    "Digit5":"5",
    "Digit6":"6",
    "Digit7":"7",
    "Digit8":"8",
    "Digit9":"9",
    "Digit0":"0",
    "KeyQ":"Q",
    "KeyW":"W",
    "KeyE":"E",
    "KeyR":"R",
    "KeyT":"T",
    "KeyZ":"Z",
    "KeyU":"U",
    "F1":"F1",
    "F2":"F2",
    "F3":"F3",
    "F4":"F4",
}


let keybinds = {
    keyListening:0,
    keyDone:true,
    "Move Up":{mod:"",key:"KeyW"},
    "Move Down":{mod:"",key:"KeyS"},
    "Move Left":{mod:"",key:"KeyA"},
    "Move Right":{mod:"",key:"KeyD"},
    "Bar1 Ability0":{mod:"",key:"Digit1"}, //vivify
    "Bar1 Ability1":{mod:"",key:"Digit2"}, //rem
    "Bar1 Ability2":{mod:"",key:"Digit3"}, //mana tea
    "Bar1 Ability3":{mod:"",key:"Digit4"}, //roll
    "Bar1 Ability4":{mod:"",key:"F1"}, //ring
    "Bar1 Ability5":{mod:"",key:"F2"}, //transcendence port
    "Bar1 Ability6":{mod:"",key:"F3"}, //transcendence
    "Bar1 Ability7":{mod:"",key:"F4"}, //trinket
    "Bar1 Ability8":{mod:"",key:"KeyQ"}, //soothing mist
    "Bar1 Ability9":{mod:"",key:"KeyE"}, //enveloping mist
    "Bar1 Ability10":{mod:"",key:"KeyR"}, //aoe stun
    "Bar1 Ability11":{mod:"",key:"KeyT"}, //healt pot

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
            if (!strafing) {
                player.rotate(player.direction+2)
            } else {
                player.move(1,1)
            }
        }
    }
    if (keyPressed[keybinds["Move Right"].key]) {
        if ((modPressed("Move Right"))) {
            if (!strafing) {
                player.rotate(player.direction - 2)
            } else {
                player.move(1,2)
            }
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
    if (keyPressed[keybinds["Bar1 Ability0"].key]) {
        if ((modPressed("Bar1 Ability0"))) {
            if (actionBars[1].abilities[0] !== undefined) {
                player.abilities[actionBars[1].abilities[0]].startCast(player)
                actions[actionBars[1].abilities[0]].pressStart()
            }
        }
    }
    if (keyPressed[keybinds["Bar1 Ability1"].key]) {
        if ((modPressed("Bar1 Ability1"))) {
            if (actionBars[1].abilities[1] !== undefined) {
                player.abilities[actionBars[1].abilities[1]].startCast(player)
                actions[actionBars[1].abilities[1]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability2"].key]) {
        if ((modPressed("Bar1 Ability2"))) {
            if (actionBars[1].abilities[2]!==undefined) {
                player.abilities[actionBars[1].abilities[2]].startCast(player)
                actions[actionBars[1].abilities[2]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability3"].key]) {
        if ((modPressed("Bar1 Ability3"))) {
            if (actionBars[1].abilities[3] !== undefined) {
                player.abilities[actionBars[1].abilities[3]].startCast(player)
                actions[actionBars[1].abilities[3]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability4"].key]) {
        if ((modPressed("Bar1 Ability4"))) {
            if (actionBars[1].abilities[4] !== undefined) {
                player.abilities[actionBars[1].abilities[4]].startCast(player)
                actions[actionBars[1].abilities[4]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability5"].key]) {
        if ((modPressed("Bar1 Ability5"))) {
            if (actionBars[1].abilities[5] !== undefined) {
                player.abilities[actionBars[1].abilities[5]].startCast(player)
                actions[actionBars[1].abilities[5]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability6"].key]) {
        if ((modPressed("Bar1 Ability6"))) {
            if (actionBars[1].abilities[6] !== undefined) {
                player.abilities[actionBars[1].abilities[6]].startCast(player)
                actions[actionBars[1].abilities[6]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability7"].key]) {
        if ((modPressed("Bar1 Ability7"))) {
            if (actionBars[1].abilities[7] !== undefined) {
                player.abilities[actionBars[1].abilities[7]].startCast(player)
                actions[actionBars[1].abilities[7]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability8"].key]) {
        if ((modPressed("Bar1 Ability8"))) {
            if (actionBars[1].abilities[8] !== undefined) {
                player.abilities[actionBars[1].abilities[8]].startCast(player)
                actions[actionBars[1].abilities[8]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability9"].key]) {
        if ((modPressed("Bar1 Ability9"))) {
            if (actionBars[1].abilities[9] !== undefined) {
                player.abilities[actionBars[1].abilities[9]].startCast(player)
                actions[actionBars[1].abilities[9]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability10"].key]) {
        if ((modPressed("Bar1 Ability10"))) {
            if (actionBars[1].abilities[10] !== undefined) {
                player.abilities[actionBars[1].abilities[10]].startCast(player)
                actions[actionBars[1].abilities[10]].pressStart()
            }
        }
    }

    if (keyPressed[keybinds["Bar1 Ability11"].key]) {
        if ((modPressed("Bar1 Ability11"))) {
            if (actionBars[1].abilities[11] !== undefined) {
                player.abilities[actionBars[1].abilities[11]].startCast(player)
                actions[actionBars[1].abilities[11]].pressStart()
            }
        }
    }


    if (keyPressed["Escape"]) {
        if (player.isCasting) {
            player.isCasting = false
            player.casting = {name:"", time:0, time2:0}
            player.gcd = 0
            player.isChanneling = false
            player.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            player.castTarget = ""
        }

        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
        player.targetObj = {}
        player.target = ""
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

//right click
let strafeStart = function(e) {
    //0=left, 1=middle, 2=right
    if (e.button===2) {
        strafing = true
    }
}

let strafeEnd = function(e) {
    if (e.button===2) {
        strafing = false
    }
}

elements.canvas.addEventListener('mousedown', strafeStart)
elements.canvas.addEventListener('mouseup', strafeEnd)


window.oncontextmenu = (e) => {
    e.preventDefault()

}

//mouse position
let onMouseUpdate = function(e) {
    if (strafing) {
        let val = (e.pageX-mousePosition.x)/mouseSensitivity
        player.rotate(player.direction - val)
    }
    mousePosition.x = e.pageX
    mousePosition.y = e.pageY
}

document.addEventListener('mousemove', onMouseUpdate)

//-------------------------------
let resetInputs = function() {
    Object.keys(keyPressed).forEach(key => {
        keyPressed[key] = false
    })
}

window.addEventListener('blur', resetInputs)

