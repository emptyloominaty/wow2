class Action {
    press = 0
    casting = 0
    constructor(ability,bar,slot) {
        this.name = ability
        this.bar = bar
        this.slot = slot
        actionBars[bar].abilities[slot] = ability
        document.getElementById("action_"+bar+"_"+slot+"").innerHTML = "<div class='action_gcd' id='action_gcd_"+bar+"_"+slot+"'></div><div class='action_cd'  id='action_cd_"+bar+"_"+slot+"'></div><img src='"+iconsPath[ability]+"'> <span class='ab_keybind'>"+keybindsD[keybinds["Bar"+bar+" Ability"+slot+""].key]+"</span> <span class='ab_charges'  id='action_charges_"+bar+"_"+slot+"'></span> </span> <span class='ab_cdText'  id='action_cdText_"+bar+"_"+slot+"'></span>"
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
        } else {
            document.getElementById("action_gcd_"+this.bar+"_"+this.slot+"").style.height = "0%"
        }
        //cd
        if (player.abilities[this.name].cd<player.abilities[this.name].maxCd) {
            document.getElementById("action_cd_"+this.bar+"_"+this.slot+"").style.height = (100-((player.abilities[this.name].cd/player.abilities[this.name].maxCd)*100))+"%"
            document.getElementById("action_cdText_"+this.bar+"_"+this.slot+"").textContent = (player.abilities[this.name].maxCd-player.abilities[this.name].cd).toFixed(0)+"s"
        } else {
            document.getElementById("action_cdText_"+this.bar+"_"+this.slot+"").textContent = ""
        }
        if (player.abilities[this.name].maxCharges>1) {
            document.getElementById("action_charges_"+this.bar+"_"+this.slot).textContent = player.abilities[this.name].charges

        }
    }

    pressStart() {
        this.press = 20+progress //ms
        document.getElementById("action_"+this.bar+"_"+this.slot+"").style.outline = "1px solid #fff"
    }

    pressEnd() {
        document.getElementById("action_"+this.bar+"_"+this.slot+"").style.outline = "0px solid #fff"
    }

}

let actions = {
    "Vivify": new Action("Vivify", 1, 0),
    "Renewing Mist": new Action("Renewing Mist", 1, 1),
    "Mana Tea": new Action("Mana Tea", 1, 2),
    "Roll": new Action("Roll", 1, 3),
}

