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
        actionBarHTML += "<div onmouseover='showSpellTooltip("+i+","+j+")' onmouseout='hideSpellTooltip()' onmouseup='moveToActionBar("+i+","+j+")'  onclick='pressAbility("+i+","+j+",true)' class='action' id='action_"+i+"_"+j+"'></div>"
    }

    actionBarHTML += "</div>"

    elements.actionBars_parent.insertAdjacentHTML("beforeend", actionBarHTML)
}
