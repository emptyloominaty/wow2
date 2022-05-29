class Action {
    press = 0
    casting = 0
    constructor(ability,bar,slot) {
        this.name = ability
        this.bar = bar
        this.slot = slot
        actionBars[bar].abilities[slot] = ability

        let keybind = keybindsD[keybinds["Bar"+bar+" Ability"+slot+""].key]
        if (keybinds["Bar"+bar+" Ability"+slot+""].mod==="ShiftLeft") {
            keybind = "S"+keybind
        } else if (keybinds["Bar"+bar+" Ability"+slot+""].mod==="ControlLeft") {
            keybind = "C"+keybind
        }


        document.getElementById("action_"+bar+"_"+slot+"").innerHTML = "<div class='action_gcd' id='action_gcd_"+bar+"_"+slot+"'></div><div class='action_cd'  id='action_cd_"+bar+"_"+slot+"'></div><img src='"+iconsPath[ability]+"'> <span class='ab_keybind'>"+keybind+"</span> <span class='ab_charges'  id='action_charges_"+bar+"_"+slot+"'></span> </span> <span class='ab_cdText'  id='action_cdText_"+bar+"_"+slot+"'></span>"
    }

    run() {
        if (this.press>0) {
            this.press-=progress
            if (this.press<=0) {
                this.pressEnd()
            }
        }
        //gcd
        if (player.gcd>0) {
            document.getElementById("action_gcd_"+this.bar+"_"+this.slot+"").style.height = ((bars.playerCast.val/bars.playerCast.maxVal)*100)+"%"
            document.getElementById("action_gcd_"+this.bar+"_"+this.slot+"").style.borderBottom = "1px Solid #FFF"
        } else {
            document.getElementById("action_gcd_"+this.bar+"_"+this.slot+"").style.height = "0%"
            document.getElementById("action_gcd_"+this.bar+"_"+this.slot+"").style.borderBottom = "0px Solid #FFF"
        }
        //cd
        if (player.abilities[this.name].cd<player.abilities[this.name].maxCd) {
            document.getElementById("action_cd_"+this.bar+"_"+this.slot+"").style.height = (100-((player.abilities[this.name].cd/player.abilities[this.name].maxCd)*100))+"%"
            document.getElementById("action_cd_"+this.bar+"_"+this.slot+"").style.borderBottom = "1px Solid #FFFF00"

            let cd = player.abilities[this.name].maxCd-player.abilities[this.name].cd
            if (player.abilities[this.name].hasteCd) {
                cd = (player.abilities[this.name].maxCd-player.abilities[this.name].cd) / (1 + (player.stats.haste / 100))
            }
            document.getElementById("action_cdText_"+this.bar+"_"+this.slot+"").textContent = (cd).toFixed(0)+"s"
        } else {
            document.getElementById("action_cd_"+this.bar+"_"+this.slot+"").style.height = "0%"
            document.getElementById("action_cd_"+this.bar+"_"+this.slot+"").style.borderBottom = "0px Solid #FFFF00"
            document.getElementById("action_cdText_"+this.bar+"_"+this.slot+"").textContent = ""
        }
        if (player.abilities[this.name].maxCharges>1) {
            document.getElementById("action_charges_"+this.bar+"_"+this.slot).textContent = player.abilities[this.name].charges

        }
    }

    pressStart() {
        if (!player.targetObj.isDead) {
            player.castTarget = player.targetObj
        }
        this.press = 20+progress //ms
        document.getElementById("action_"+this.bar+"_"+this.slot+"").style.outline = "1px solid #fff"

    }

    pressEnd() {
        document.getElementById("action_"+this.bar+"_"+this.slot+"").style.outline = "0px solid #fff"
    }

}
let actions = {}

if (player.spec==="mistweaver") {
    actions = {
        //bar1
        "Vivify": new Action("Vivify", 1, 0),
        "Renewing Mist": new Action("Renewing Mist", 1, 1),
        "Mana Tea": new Action("Mana Tea", 1, 2),
        "Roll": new Action("Roll", 1, 3),
        "Soothing Mist": new Action("Soothing Mist", 1, 8),
        "Enveloping Mist": new Action("Enveloping Mist", 1, 9),

        //bar0
        "Revival": new Action("Revival", 0, 0),
        "Essence Font": new Action("Essence Font", 0, 1),
        "Fortifying Brew": new Action("Fortifying Brew", 0, 8),
        //bar2
        "Rising Sun Kick": new Action("Rising Sun Kick", 2, 0),
        "Tiger Palm": new Action("Tiger Palm", 2, 1),
        "Blackout Kick": new Action("Blackout Kick", 2, 2),
    }
}

if (player.spec==="restorationShaman") {
    actions = {
        //bar1
        "Healing Surge": new Action("Healing Surge", 1, 8),

    }

}

