class ActionBar {
    constructor(slots,abilities) {
        this.slots = slots
        this.abilities = abilities
    }
}

let actionBars = [new ActionBar(12,[]), new ActionBar(12,[]), new ActionBar(12,[]), new ActionBar(12,[]),]

for (let i = 0; i<actionBars.length; i++) {
    let actionBarHTML = "<div class='actionBar'> "

    for (let j = 0; j<actionBars[i].slots; j++) {
        actionBarHTML += "<div onmouseover='showSpellTooltip("+i+","+j+")' onmouseout='hideSpellTooltip()' onclick='pressAbility("+i+","+j+")' class='action' id='action_"+i+"_"+j+"'></div>"

    }

    actionBarHTML += "</div>"

    elements.actionBars_parent.insertAdjacentHTML("beforeend", actionBarHTML)
}

let spellTooltip = false

let showSpellTooltip = function(i,j) {
    if (!spellTooltip && (actionBars[i].abilities[j] !== undefined)) {
        spellTooltip = true
        let ability = player.abilities[actionBars[i].abilities[j]]

        let range = ability.range
        if (range === 5) {
            range = "Melee"
        } else {
            range = range+" m Range"
        }

        let castTime = ability.castTime
        if (castTime === 0) {
            castTime = "Instant"
        } else {
            if (ability.channeling) {
                castTime = castTime + "s Channel"
            } else {
                castTime = castTime + "s Cast"
            }
        }

        let cd = ability.maxCd
        if (cd === 0) {
            cd = ""
        } else {
            cd = cd + "s CD"
        }

        let cost = ability.cost
        if (cost === 0) {
            cost = ""
        } else {
            cost = cost + "% Mana"
        }


        let htmlTooltip = "<div class='spellTooltip' id='spellTooltip'><h4 class='spellTooltip_name'>" + ability.name + "</h4><p class='spellTooltip_cost'>" + cost + "</p> <p class='spellTooltip_castTime'>" + castTime + "</p> <p class='spellTooltip_cd'>" + cd + "</p> <p> "+range+"</p> <p class='spellTooltip_info'>"+ability.getTooltip()+"</p></div>"

        elements.ui.insertAdjacentHTML("beforeend", htmlTooltip)

        document.getElementById("spellTooltip").style.left = mousePosition.x+30 + "px"
        document.getElementById("spellTooltip").style.top = mousePosition.y-200 + "px"
    }
}

let hideSpellTooltip = function() {
    spellTooltip = false
    if (document.getElementById("spellTooltip")) {
        document.getElementById("spellTooltip").remove()
    }
}