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
        if (player.abilities[this.name].checkCost(player,undefined,false)) {
            if (player.gcd > 0 && !player.abilities[this.name].noGcd) {
                document.getElementById("action_gcd_" + this.bar + "_" + this.slot + "").style.height = ((bars.playerCast.val / bars.playerCast.maxVal) * 100) + "%"
                document.getElementById("action_gcd_" + this.bar + "_" + this.slot + "").style.borderBottom = "1px Solid #FFF"
            } else {
                document.getElementById("action_gcd_" + this.bar + "_" + this.slot + "").style.height = "0%"
                document.getElementById("action_gcd_" + this.bar + "_" + this.slot + "").style.borderBottom = "0px Solid #FFF"
            }
        } else {
            document.getElementById("action_gcd_" + this.bar + "_" + this.slot + "").style.height =  "100%"
            document.getElementById("action_gcd_" + this.bar + "_" + this.slot + "").style.borderBottom = "0px Solid #FFF"
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
        "Spinning Crane Kick": new Action("Spinning Crane Kick", 0, 6),
        "Fortifying Brew": new Action("Fortifying Brew", 0, 8),
        //bar2
        "Rising Sun Kick": new Action("Rising Sun Kick", 2, 0),
        "Tiger Palm": new Action("Tiger Palm", 2, 1),
        "Blackout Kick": new Action("Blackout Kick", 2, 2),

        "Tiger's Lust": new Action("Tiger's Lust", 2, 11),
    }
}

if (player.spec==="restorationShaman") {
    actions = {
        //bar1
        "Riptide": new Action("Riptide", 1, 1),
        "Ghost Wolf": new Action("Ghost Wolf",1,3),

        "Healing Surge": new Action("Healing Surge", 1, 8),
        //bar0
        "Healing Tide Totem": new Action("Healing Tide Totem", 0, 0),
        "Healing Rain": new Action("Healing Rain", 0, 1),
        //bar2
        "Flame Shock": new Action("Flame Shock", 2, 0),
        "Lava Burst": new Action("Lava Burst", 2, 1),
        "Lightning Bolt": new Action("Lightning Bolt", 2, 2),
    }

}

if (player.spec==="restorationDruid") {
    actions = {
        //bar1
        "Rejuvenation": new Action("Rejuvenation", 1, 1),
        "Regrowth": new Action("Regrowth", 1, 8),
        //bar0
        "Wild Growth": new Action("Wild Growth", 0, 1),
        "Sunfire": new Action("Sunfire", 0, 6),
        //bar2
        "Moonfire": new Action("Moonfire", 2, 0),
        "Wrath": new Action("Wrath", 2, 1),
        //"Starfire": new Action("Starfire", 2, 2),
    }
}

if (player.spec==="balance") {
    actions = {
        //bar1
        "Starsurge": new Action("Starsurge", 1, 0),
        "Wrath": new Action("Wrath", 1, 8),
        "Starfire": new Action("Starfire", 1, 9),
        //bar0
        "Starfall": new Action("Starfall", 0, 1),
        "Sunfire": new Action("Sunfire", 0, 6),
        //bar2
        "Moonfire": new Action("Moonfire", 2, 0),
        "Regrowth": new Action("Regrowth", 2, 2),
    }

}


if (player.spec==="assassination") {
    actions = {
        //bar1
        "Rupture": new Action("Rupture", 1, 0),
        "Garrote": new Action("Garrote", 1, 1),
        "Slice And Dice": new Action("Slice And Dice", 1, 2),


        "Mutilate": new Action("Mutilate", 1, 8),
        "Envenom": new Action("Envenom", 1, 9),

        "Deadly Poison": new Action("Deadly Poison", 2, 2),
    }
}
if (player.spec==="windwalker") {
    actions = {
        //bar1
        "Rising Sun Kick": new Action("Rising Sun Kick", 1, 0),

        "Tiger Palm": new Action("Tiger Palm", 1, 8),
        "Blackout Kick": new Action("Blackout Kick", 1, 9),

        "Provoke": new Action("Provoke", 2, 2),
    }
}

if (player.spec==="arcane") {
    actions = {
        //bar1
        "Arcane Barrage": new Action("Arcane Barrage", 1, 0),

        "Arcane Blast": new Action("Arcane Blast", 1, 8),
        "Arcane Missiles": new Action("Arcane Missiles", 1, 9),
    }
}


if (player.spec==="fury") {
    actions = {
        "Raging Blow": new Action("Raging Blow", 1, 0),
        "Bloodthirst": new Action("Bloodthirst", 1, 1),
        "Charge": new Action("Charge", 1, 3),

        "Whirlwind": new Action("Whirlwind", 1, 8),
        "Rampage": new Action("Rampage", 1, 9),

        "Execute": new Action("Execute", 2, 0),
    }
}

if (player.spec==="holyPriest") {
    actions = {
        "Holy Word: Serenity": new Action("Holy Word: Serenity", 1, 0),
        "Renew": new Action("Renew", 1, 1),
        "Holy Word: Sanctify": new Action("Holy Word: Sanctify", 1, 2),

        "Flash Heal": new Action("Flash Heal", 1, 8),
        "Heal": new Action("Heal", 1, 9),
        "Holy Word: Chastise": new Action("Holy Word: Chastise", 1, 10),

        "Divine Hymn": new Action("Divine Hymn", 0, 0),
        "Circle of Healing": new Action("Circle of Healing", 0, 1),
        "Prayer of Healing": new Action("Prayer of Healing", 0, 2),

        "Holy Nova": new Action("Holy Nova", 0, 6),

        //bar2
        "Shadow Word: Pain": new Action("Shadow Word: Pain", 2, 0),
        "Holy Fire": new Action("Holy Fire", 2, 1),
        "Smite": new Action("Smite", 2, 2),

        "Prayer of Mending": new Action("Prayer of Mending", 2, 7),

    }
}