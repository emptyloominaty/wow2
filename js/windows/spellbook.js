let movingFromSpellbook = false
let movingSpellName = ""
let movingSpellElement
let movingCd = 0.5

let moveFromSpellBook = function(spellname) {
    if (!player.abilities[spellname].passive) {
        spellname = spellname.replace('€', '\'')

        if (movingFromSpellbook && movingSpellElement) {
            movingSpellElement.remove()
        }

        movingFromSpellbook = true
        movingSpellName = spellname

        let img = document.createElement("img")
        img.id = "spellBook_img_moving_to_actionbar"
        img.src = iconsPath[spellname]
        img.style.position = "fixed"
        img.style.left = mousePosition.x + 10 + "px"
        img.style.top = mousePosition.y + 10 + "px"
        img.style.zIndex = 150
        elements.ui.appendChild(img)
        movingSpellElement = document.getElementById("spellBook_img_moving_to_actionbar")
    }
}


let moveFromActionBar = function(spellname,bar,slot) {
    if (movingCd>=0.35) {
        delete actions[spellname]
        delete actionBars[bar].abilities[slot]
        document.getElementById("action_"+bar+"_"+slot).innerHTML = ""

        spellname = spellname.replace('€', '\'')

        if (movingFromSpellbook && movingSpellElement) {
            movingSpellElement.remove()
        }

        movingFromSpellbook = true
        movingSpellName = spellname

        let img = document.createElement("img")
        img.id = "spellBook_img_moving_to_actionbar"
        img.src = iconsPath[spellname]
        img.style.position = "fixed"
        img.style.left = mousePosition.x + 10 + "px"
        img.style.top = mousePosition.y + 10 + "px"
        img.style.zIndex = 150
        elements.ui.appendChild(img)
        movingSpellElement = document.getElementById("spellBook_img_moving_to_actionbar")
    }
}

let moveToActionBar = function(bar,slot) {
    if (movingFromSpellbook) {
        actions[movingSpellName] = new Action(movingSpellName, bar, slot)
        movingFromSpellbook = false
        movingSpellName = ""
        movingCd = 0
        movingSpellElement.remove()
        movingSpellElement = undefined
    }
}

let open_spellbook = function() {
    if (currentWindow === "spellbook") {
        close_window()
        return
    }
    currentWindow = "spellbook"
    let html = "<div class='windowHeader'><span>Spellbook</span> <div onclick='close_window()'>x</div></div>  " +
        "<div style='display:flex;flex-direction: column;flex-wrap:wrap;align-content: flex-start;overflow:auto;height:75vh;width:40vw; padding:15px;'>"

    Object.keys(player.abilities).sort().forEach(function(key) {
        if (player.abilities[key].name!==undefined && player.abilities[key].name!=="Leech" && player.abilities[key].name!=="Auto Attack" && (player.abilities[key].talent===player.abilities[key].talentSelect) && player.abilities[key].canUse && !player.abilities[key].hiddenSB) {
            html+= "<div class='window_spellbook_div' onmousedown='moveFromSpellBook(\""+player.abilities[key].name.replace('\'', '€')+"\")' onmouseover='showSpellTooltip(0,0,true,\""+player.abilities[key].name.replace('\'', '€')+"\")' onmouseout='hideSpellTooltip()' " +
                "style='display:flex;flex-direction:row; justify-content: space-between; width:11vw;' ><div style='display:flex;flex-direction:column;'><span>"+player.abilities[key].name+"</span> "
            if (player.abilities[key].mastery) {
                html += "<span style='color:#666666'>Mastery</span>"
            }
            if (player.abilities[key].passive) {
                html += "<span style='color:#666666'>Passive </span>"
            }
            if (player.abilities[key].talent) {
                html += "<span style='color:#666666'>Talent</span>"
            }

            html +=  "</div><img draggable='false' src='"+iconsPath[player.abilities[key].name]+"'></div>"
        }
    })

    html+="</div>"
    elements.window.innerHTML = html
}

let close_window = function() {
    elements.window.innerHTML = ""
    currentWindow = "none"
}

let currentWindow = "none"