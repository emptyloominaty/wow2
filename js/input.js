let strafing = false
let mousePosition = {x:0,y:0}
let mousePosition2d = {x:0,y:0}
let gameScaling = 1.8

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
    "KeyZ":"Y",
    "KeyU":"U",
    "KeyP":"P",
    "KeyF":"F",
    "KeyY":"Z",
    "KeyG":"G",
    "KeyV":"V",
    "KeyC":"C",
    "KeyN":"N",
    "Backquote":";",
    "F1":"F1",
    "F2":"F2",
    "F3":"F3",
    "F4":"F4",
}


let keybinds = {
    keyListening:0,
    keyDone:true,
    "Character Info":{mod:"",key:"KeyC"},
    "Spellbook":{mod:"",key:"KeyP"},
    "Talents":{mod:"",key:"KeyN"},

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

    "Bar0 Ability0":{mod:"ControlLeft",key:"Digit1"}, //
    "Bar0 Ability1":{mod:"ControlLeft",key:"Digit2"}, //
    "Bar0 Ability2":{mod:"",key:"Digit5"}, //
    "Bar0 Ability3":{mod:"",key:"Digit6"}, //
    "Bar0 Ability4":{mod:"ControlLeft",key:"Digit5"}, //
    "Bar0 Ability5":{mod:"ShiftLeft",key:"Digit1"}, //
    "Bar0 Ability6":{mod:"ShiftLeft",key:"Digit2"}, //
    "Bar0 Ability7":{mod:"ShiftLeft",key:"Digit3"}, //
    "Bar0 Ability8":{mod:"ShiftLeft",key:"Digit4"}, //
    "Bar0 Ability9":{mod:"",key:"KeyF"}, //
    "Bar0 Ability10":{mod:"",key:"KeyP"}, //middle button mouse yikes
    "Bar0 Ability11":{mod:"",key:"Backquote"}, //;

    "Bar2 Ability0":{mod:"ShiftLeft",key:"KeyQ"},
    "Bar2 Ability1":{mod:"ShiftLeft",key:"KeyE"},
    "Bar2 Ability2":{mod:"ShiftLeft",key:"KeyR"},
    "Bar2 Ability3":{mod:"ShiftLeft",key:"KeyT"},
    "Bar2 Ability4":{mod:"ControlLeft",key:"Digit6"},
    "Bar2 Ability5":{mod:"ControlLeft",key:"Digit7"},
    "Bar2 Ability6":{mod:"ControlLeft",key:"Digit8"},
    "Bar2 Ability7":{mod:"",key:"KeyZ"},
    "Bar2 Ability8":{mod:"",key:"KeyG"},
    "Bar2 Ability9":{mod:"ShiftLeft",key:"KeyF"},
    "Bar2 Ability10":{mod:"ControlLeft",key:"Digit9"},
    "Bar2 Ability11":{mod:"",key:"KeyV"},

    "Bar3 Ability0":{mod:"ControlLeft",key:"Digit3"},
    "Bar3 Ability1":{mod:"ControlLeft",key:"Digit4"},

    "Bar3 Ability2":{mod:"",key:"Digit7"},
    "Bar3 Ability3":{mod:"",key:"Digit8"},
    "Bar3 Ability4":{mod:"",key:"Digit9"},
    "Bar3 Ability5":{mod:"",key:"Digit0"},

    "Bar3 Ability6":{mod:"ShiftLeft",key:"Digit5"},
    "Bar3 Ability7":{mod:"ShiftLeft",key:"Digit6"},
    "Bar3 Ability8":{mod:"ShiftLeft",key:"Digit7"},
    "Bar3 Ability9":{mod:"ShiftLeft",key:"Digit8"},
    "Bar3 Ability10":{mod:"ShiftLeft",key:"Digit9"},
    "Bar3 Ability11":{mod:"ShiftLeft",key:"Digit0"},

}

let pressAbility = function(bar,slot){
    if (actionBars[bar].abilities[slot] !== undefined) {
        actions[actionBars[bar].abilities[slot]].pressStart()
        player.abilities[actionBars[bar].abilities[slot]].startCast(player)
    }
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
        //if ((modPressed("Move Left"))) {
            if (!strafing) {
                player.rotate(player.direction+2)
            } else {
                player.moving[0] = true
                player.move(1/player.getMoveSpeedPlayer(),1)
            }
        //}
    }
    if (keyPressed[keybinds["Move Right"].key]) {
        //if ((modPressed("Move Right"))) {
            if (!strafing) {
                player.rotate(player.direction - 2)
            } else {
                player.moving[1] = true
                player.move(1/player.getMoveSpeedPlayer(),2)
            }
        //}
    }
    if (keyPressed[keybinds["Move Up"].key]) {
        //if ((modPressed("Move Up"))) {
        if (!player.isMoving) {
            player.moving[2] = true
            player.move(1/player.getMoveSpeedPlayer())
        }
        //}
    }
    if (keyPressed[keybinds["Move Down"].key]) {
        //if ((modPressed("Move Down"))) {
        player.moving[3] = true
            player.move(-0.357/player.getMoveSpeedPlayer())
        //}
    }
    if (keyPressed[keybinds["Bar1 Ability0"].key]) {
        if ((modPressed("Bar1 Ability0"))) {
            pressAbility(1,0)

        }
    }
    if (keyPressed[keybinds["Bar1 Ability1"].key]) {
        if ((modPressed("Bar1 Ability1"))) {
            pressAbility(1,1)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability2"].key]) {
        if ((modPressed("Bar1 Ability2"))) {
            pressAbility(1,2)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability3"].key]) {
        if ((modPressed("Bar1 Ability3"))) {
            pressAbility(1,3)

        }
    }

    if (keyPressed[keybinds["Bar1 Ability4"].key]) {
        if ((modPressed("Bar1 Ability4"))) {
            pressAbility(1,4)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability5"].key]) {
        if ((modPressed("Bar1 Ability5"))) {
            pressAbility(1,5)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability6"].key]) {
        if ((modPressed("Bar1 Ability6"))) {
            pressAbility(1,6)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability7"].key]) {
        if ((modPressed("Bar1 Ability7"))) {
            pressAbility(1,7)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability8"].key]) {
        if ((modPressed("Bar1 Ability8"))) {
            pressAbility(1,8)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability9"].key]) {
        if ((modPressed("Bar1 Ability9"))) {
            pressAbility(1,9)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability10"].key]) {
        if ((modPressed("Bar1 Ability10"))) {
            pressAbility(1,10)
        }
    }

    if (keyPressed[keybinds["Bar1 Ability11"].key]) {
        if ((modPressed("Bar1 Ability11"))) {
            pressAbility(1,11)
        }
    }
    //Bar 0
    if (keyPressed[keybinds["Bar0 Ability0"].key]) {
        if ((modPressed("Bar0 Ability0"))) {
            pressAbility(0,0)

        }
    }
    if (keyPressed[keybinds["Bar0 Ability1"].key]) {
        if ((modPressed("Bar0 Ability1"))) {
            pressAbility(0,1)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability2"].key]) {
        if ((modPressed("Bar0 Ability2"))) {
            pressAbility(0,2)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability3"].key]) {
        if ((modPressed("Bar0 Ability3"))) {
            pressAbility(0,3)

        }
    }

    if (keyPressed[keybinds["Bar0 Ability4"].key]) {
        if ((modPressed("Bar0 Ability4"))) {
            pressAbility(0,4)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability5"].key]) {
        if ((modPressed("Bar0 Ability5"))) {
            pressAbility(0,5)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability6"].key]) {
        if ((modPressed("Bar0 Ability6"))) {
            pressAbility(0,6)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability7"].key]) {
        if ((modPressed("Bar0 Ability7"))) {
            pressAbility(0,7)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability8"].key]) {
        if ((modPressed("Bar0 Ability8"))) {
            pressAbility(0,8)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability9"].key]) {
        if ((modPressed("Bar0 Ability9"))) {
            pressAbility(0,9)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability10"].key]) {
        if ((modPressed("Bar0 Ability10"))) {
            pressAbility(0,10)
        }
    }

    if (keyPressed[keybinds["Bar0 Ability11"].key]) {
        if ((modPressed("Bar0 Ability11"))) {
            pressAbility(0,11)
        }
    }
    //Bar 2
    if (keyPressed[keybinds["Bar2 Ability0"].key]) {
        if ((modPressed("Bar2 Ability0"))) {
            pressAbility(2,0)

        }
    }
    if (keyPressed[keybinds["Bar2 Ability1"].key]) {
        if ((modPressed("Bar2 Ability1"))) {
            pressAbility(2,1)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability2"].key]) {
        if ((modPressed("Bar2 Ability2"))) {
            pressAbility(2,2)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability3"].key]) {
        if ((modPressed("Bar2 Ability3"))) {
            pressAbility(2,3)

        }
    }

    if (keyPressed[keybinds["Bar2 Ability4"].key]) {
        if ((modPressed("Bar2 Ability4"))) {
            pressAbility(2,4)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability5"].key]) {
        if ((modPressed("Bar2 Ability5"))) {
            pressAbility(2,5)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability6"].key]) {
        if ((modPressed("Bar2 Ability6"))) {
            pressAbility(2,6)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability7"].key]) {
        if ((modPressed("Bar2 Ability7"))) {
            pressAbility(2,7)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability8"].key]) {
        if ((modPressed("Bar2 Ability8"))) {
            pressAbility(2,8)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability9"].key]) {
        if ((modPressed("Bar2 Ability9"))) {
            pressAbility(2,9)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability10"].key]) {
        if ((modPressed("Bar2 Ability10"))) {
            pressAbility(2,10)
        }
    }

    if (keyPressed[keybinds["Bar2 Ability11"].key]) {
        if ((modPressed("Bar2 Ability11"))) {
            pressAbility(2,11)
        }
    }

    //Bar 3
    if (keyPressed[keybinds["Bar3 Ability0"].key]) {
        if ((modPressed("Bar3 Ability0"))) {
            pressAbility(3,0)

        }
    }
    if (keyPressed[keybinds["Bar3 Ability1"].key]) {
        if ((modPressed("Bar3 Ability1"))) {
            pressAbility(3,1)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability2"].key]) {
        if ((modPressed("Bar3 Ability2"))) {
            pressAbility(3,2)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability3"].key]) {
        if ((modPressed("Bar3 Ability3"))) {
            pressAbility(3,3)

        }
    }

    if (keyPressed[keybinds["Bar3 Ability4"].key]) {
        if ((modPressed("Bar3 Ability4"))) {
            pressAbility(3,4)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability5"].key]) {
        if ((modPressed("Bar3 Ability5"))) {
            pressAbility(3,5)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability6"].key]) {
        if ((modPressed("Bar3 Ability6"))) {
            pressAbility(3,6)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability7"].key]) {
        if ((modPressed("Bar3 Ability7"))) {
            pressAbility(3,7)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability8"].key]) {
        if ((modPressed("Bar3 Ability8"))) {
            pressAbility(3,8)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability9"].key]) {
        if ((modPressed("Bar3 Ability9"))) {
            pressAbility(3,9)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability10"].key]) {
        if ((modPressed("Bar3 Ability10"))) {
            pressAbility(3,10)
        }
    }

    if (keyPressed[keybinds["Bar3 Ability11"].key]) {
        if ((modPressed("Bar3 Ability11"))) {
            pressAbility(3,11)
        }
    }



    if (keyPressed[keybinds["Character Info"].key]) {
        if ((modPressed("Character Info"))) {
            if (currentWindow!=="character") {
                open_character()
            } else {
                close_window()
            }
            keyPressed[keybinds["Character Info"].key] = false
        }
    }

    if (keyPressed[keybinds["Spellbook"].key]) {
        if ((modPressed("Spellbook"))) {
            if (currentWindow!=="spellbook") {
                open_spellbook()
            } else {
                close_window()
            }
            keyPressed[keybinds["Spellbook"].key] = false
        }
    }

    if (keyPressed[keybinds["Talents"].key]) {
        if ((modPressed("Talents"))) {
            if (currentWindow !== "talents") {
                open_talents()
            } else {
                close_window()
            }
        }
            keyPressed[keybinds["Talents"].key] = false
    }



    if (keyPressed["Escape"]) {
        if (player.isChanneling) {
            if (player.abilities[player.channeling.name].endChanneling) {
                player.abilities[player.channeling.name].endChanneling(player)
            }
        }
        if (player.isCasting || player.isChanneling) {
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

    if (keyPressed["Tab"]) {
        let target = findNearestEnemy(player,player.tabIdx)
            if (target!==false) {
                document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                player.targetObj = target
                player.target = target.name
                player.tabIdx++
            }
        keyPressed["Tab"] = false
    }


}

//----------------------------------
let keyup = (e)=> {
    if (e.code==="ControlLeft" || e.code==="F1" || e.code==="F2" || e.code==="F3" || e.code==="F4" || e.code==="Tab" || e.code==="Digit0" || e.code==="Digit1" || e.code==="Digit2" || e.code==="Digit3" || e.code==="Digit4" || e.code==="Digit5" || e.code==="Digit6" || e.code==="Digit7" || e.code==="Digit8" || e.code==="Digit9" || e.code==="Period" || e.code==="NumpadDecimal" || e.code==="Backspace" || e.code==="ControlLeft") {
        e.preventDefault()
    }
    keyPressed[e.code]=false
}

let keydown = (e)=> {
    if (e.code==="ControlLeft" || e.code==="F1" || e.code==="F2" || e.code==="F3" || e.code==="F4" || e.code==="Tab" || e.code==="Digit0" || e.code==="Digit1" || e.code==="Digit2" || e.code==="Digit3" || e.code==="Digit4" || e.code==="Digit5" || e.code==="Digit6" || e.code==="Digit7" || e.code==="Digit8" || e.code==="Digit9" || e.code==="Period" || e.code==="NumpadDecimal" || e.code==="Backspace" || e.code==="ControlLeft") {
        e.preventDefault()
        e.stopPropagation() //ctrl+123456789
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

let moveWithMouseButtons = [false,false]

//right click
let strafeStart = function(e) {
    //0=left, 1=middle, 2=right
    if (e.button===2) {
        strafing = true
        moveWithMouseButtons[1] = true
    } else if (e.button===0) {
        moveWithMouseButtons[0] = true
    }

}

let strafeEnd = function(e) {
    if (e.button===2) {
        strafing = false
        moveWithMouseButtons[1] = false
    } else if (e.button===0) {
        moveWithMouseButtons[0] = false
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
        let val = (e.pageX-mousePosition.x)/settings.mouseSensitivity
        player.rotate(player.direction - val)
    }
    mousePosition.x = e.pageX
    mousePosition.y = e.pageY

    mousePosition2d.x = ((player.x+((e.pageX)-(game2d.canvasW/2))/gameScaling))
    mousePosition2d.y = ((player.y+((e.pageY)-(game2d.canvasH/2))/gameScaling))
}

//input.js:492 Uncaught ReferenceError: player is not defined
setTimeout( ()=> {
    document.addEventListener('mousemove', onMouseUpdate)

    //update bars size on start
    Object.keys(bars).forEach(function(key) {
        bars[key].updateSize()
    })

},150 )


//mouse position
let onMouseClick = function(e) {
//check targets
    for (let i = 0; i<creatures.length; i++) {
        let creatureSize = creatures[i].size*gameScaling
        if (getDistance(mousePosition,creatures[i].screenPosition)<creatureSize/pxToMeter) {
            player.targetObj = creatures[i]
            player.target = creatures[i].name
            document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
            if (!creatures[i].enemy) {
                document.getElementById("raidFrame"+creatures[i].id3).style.outline = "1px solid #fff"
                targetSelect=creatures[i].id3
            }
        }
    }

}

document.addEventListener('click', onMouseClick)

//------------------------------------------------------------------------
let zoom = function(event) {
    //event.preventDefault()
    let val = event.deltaY * -0.001 * gameScaling
    gameScaling += val
    if (gameScaling < 0.9) {
        gameScaling = 0.9
    } else if (gameScaling>4) { //2.8
        gameScaling = 4  //2.8
    }

    Object.keys(bars).forEach(function(key) {
        bars[key].updateSize()
    })
}

document.body.onwheel = zoom
//-------------------------------
let resetInputs = function() {
    Object.keys(keyPressed).forEach(key => {
        keyPressed[key] = false
    })
}

window.addEventListener('blur', resetInputs)


//disable ctrl+s
document.onkeydown = function (e) {
    e = e || window.event;//Get event
    if (e.ctrlKey) {
        var c = e.which || e.keyCode;//Get key code
        switch (c) {
            case 83://Block Ctrl+S
                e.preventDefault();
                e.stopPropagation();
                break;
        }
    }
}

//ctrl+w
window.onbeforeunload = function (e) {
    if (keyPressed["ControlLeft"] /*TODO:|| keyPressed["F5"]*/) {
        e.preventDefault()
        e.returnValue = 'NO'
    }
}
