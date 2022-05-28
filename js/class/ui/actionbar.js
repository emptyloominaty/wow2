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
    if (!spellTooltip) {
        spellTooltip = true
        let ability = player.abilities[actionBars[i].abilities[j]]
        let htmlTooltip = "<div class='spellTooltip' id='spellTooltip'><h4 class='spellTooltip_name'>" + ability.name + "</h4><p class='spellTooltip_cost'>" + ability.cost + "% mana</p> <p class='spellTooltip_castTime'>" + ability.castTime + "s cast</p> <p class='spellTooltip_cd'>" + ability.maxCd + "s cd</p><p class='spellTooltip_info'>"+ability.getTooltip()+"</p></div>"

        elements.ui.insertAdjacentHTML("beforeend", htmlTooltip)

        document.getElementById("spellTooltip").style.left = mousePosition.x + "px"
        document.getElementById("spellTooltip").style.top = mousePosition.y-200 + "px"
    }
}

let hideSpellTooltip = function() {
    spellTooltip = false
    document.getElementById("spellTooltip").remove()
}