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
        actionBarHTML += "<div class='action' id='action_"+i+"_"+j+"'></div>"
    }

    actionBarHTML += "</div>"

    elements.actionBars_parent.insertAdjacentHTML("beforeend", actionBarHTML)
}


actionBars[1].abilities[0] = "Vivify"
document.getElementById("action_1_0").innerHTML = "<img src='img/mistweaver/Vivify.jpg'> <span class='ab_keybind'>1</span> <span class='ab_cd'></span>"

actionBars[1].abilities[1] = "Renewing Mist"
document.getElementById("action_1_1").innerHTML = "<img src='img/mistweaver/RenewingMist.jpg'> <span class='ab_keybind'>2</span> <span class='ab_cd'></span>"