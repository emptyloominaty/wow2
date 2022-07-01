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

        this.elements = []
        this.elements["action_"+bar+"_"+slot] = document.getElementById("action_"+bar+"_"+slot)
        this.elements["action_gcd_"+bar+"_"+slot] = document.getElementById("action_gcd_"+bar+"_"+slot)
        this.elements["action_cd_"+bar+"_"+slot] = document.getElementById("action_cd_"+bar+"_"+slot)
        this.elements["action_charges_"+bar+"_"+slot] = document.getElementById("action_charges_"+bar+"_"+slot)
        this.elements["action_cdText_"+bar+"_"+slot] = document.getElementById("action_cdText_"+bar+"_"+slot)
    }

    run() {
        if (this.press>0) {
            this.press-=progress
            if (this.press<=0) {
                this.pressEnd()
            }
        }
        //gcd
        if (player.abilities[this.name].checkCost(player,undefined,false) && (player.abilities[this.name].talent===player.abilities[this.name].talentSelect) && player.abilities[this.name].canUse && (!player.abilities[this.name].requiresStealth || player.isStealthed || player.abilities[this.name].canUseWithoutStealth)) {
            if (player.gcd > 0 && !player.abilities[this.name].noGcd) {
                this.elements["action_gcd_" + this.bar + "_" + this.slot + ""].style.height = ((bars.playerCast.val / bars.playerCast.maxVal) * 100) + "%"
                this.elements["action_gcd_" + this.bar + "_" + this.slot + ""].style.borderBottom = "1px Solid #FFF"
            } else {
                this.elements["action_gcd_" + this.bar + "_" + this.slot + ""].style.height = "0%"
                this.elements["action_gcd_" + this.bar + "_" + this.slot + ""].style.borderBottom = "0px Solid #FFF"
            }
        } else {
            this.elements["action_gcd_" + this.bar + "_" + this.slot + ""].style.height =  "100%"
            this.elements["action_gcd_" + this.bar + "_" + this.slot + ""].style.borderBottom = "0px Solid #FFF"
        }
        //cd
        if (player.abilities[this.name].cd<player.abilities[this.name].maxCd) {
            this.elements["action_cd_"+this.bar+"_"+this.slot+""].style.height = (100-((player.abilities[this.name].cd/player.abilities[this.name].maxCd)*100))+"%"
            this.elements["action_cd_"+this.bar+"_"+this.slot+""].style.borderBottom = "1px Solid #FFFF00"

            let cd = player.abilities[this.name].maxCd-player.abilities[this.name].cd
            if (player.abilities[this.name].hasteCd) {
                cd = (player.abilities[this.name].maxCd-player.abilities[this.name].cd) / (1 + (player.stats.haste / 100))
            }
            this.elements["action_cdText_"+this.bar+"_"+this.slot+""].textContent = Math.round(cd)+"s"
        } else {
            this.elements["action_cd_"+this.bar+"_"+this.slot+""].style.height = "0%"
            this.elements["action_cd_"+this.bar+"_"+this.slot+""].style.borderBottom = "0px Solid #FFFF00"
            this.elements["action_cdText_"+this.bar+"_"+this.slot+""].textContent = ""
        }
        if (player.abilities[this.name].maxCharges>1) {
            this.elements["action_charges_"+this.bar+"_"+this.slot].textContent = player.abilities[this.name].charges
        } else {
            this.elements["action_charges_"+this.bar+"_"+this.slot].textContent = ""
        }
    }

    pressStart() {
        if (!player.targetObj.isDead) {
            player.castTarget = player.targetObj
        }
        this.press = 20+progress //ms
        this.elements["action_"+this.bar+"_"+this.slot+""].style.outline = "1px solid #fff"

    }

    pressEnd() {
        this.elements["action_"+this.bar+"_"+this.slot+""].style.outline = "0px solid #fff"
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

        "Ring of Peace": new Action("Ring of Peace", 1, 4),
        "Transcendence: Transfer": new Action("Transcendence: Transfer", 1, 5),
        "Transcendence": new Action("Transcendence", 1, 6),

        "Soothing Mist": new Action("Soothing Mist", 1, 8),
        "Enveloping Mist": new Action("Enveloping Mist", 1, 9),
        "Leg Sweep": new Action("Leg Sweep", 1, 10),

        //bar0
        "Revival": new Action("Revival", 0, 0),
        "Essence Font": new Action("Essence Font", 0, 1),
        "Refreshing Jade Wind": new Action("Refreshing Jade Wind", 0, 2),
        "Chi Burst": new Action("Chi Burst", 0, 3),
        "Detox": new Action("Detox", 0, 4),
        "Touch of Death": new Action("Touch of Death", 0, 5),
        "Spinning Crane Kick": new Action("Spinning Crane Kick", 0, 6),
        "Healing Elixir": new Action("Healing Elixir", 0, 7),
        "Fortifying Brew": new Action("Fortifying Brew", 0, 8),
        "Paralysis": new Action("Paralysis", 0, 11),
        //bar2
        "Rising Sun Kick": new Action("Rising Sun Kick", 2, 0),
        "Tiger Palm": new Action("Tiger Palm", 2, 1),
        "Blackout Kick": new Action("Blackout Kick", 2, 2),
        "Crackling Jade Lightning": new Action("Crackling Jade Lightning", 2, 3),

        "Life Cocoon": new Action("Life Cocoon", 2, 4),
        "Expel Harm": new Action("Expel Harm", 2, 5),
        "Invoke Yu'lon, the Jade Serpent": new Action("Invoke Yu'lon, the Jade Serpent", 2, 6),
        "Thunder Focus Tea": new Action("Thunder Focus Tea", 2, 7),
        "Tiger's Lust": new Action("Tiger's Lust", 2, 11),

        //bar 3


        "Reawaken": new Action("Reawaken",3,5),
        "Resuscitate": new Action("Resuscitate",3,6),
    }
}

if (player.spec==="brewmaster") {
    actions = {
        //bar1
        "Provoke": new Action("Provoke", 1, 0),
        "Keg Smash": new Action("Keg Smash", 1, 1),
        "Breath of Fire": new Action("Breath of Fire", 1, 2),
        "Roll": new Action("Roll", 1, 3),
        "Ring of Peace": new Action("Ring of Peace", 1, 4),
        "Transcendence: Transfer": new Action("Transcendence: Transfer", 1, 5),
        "Transcendence": new Action("Transcendence", 1, 6),
        "Tiger Palm": new Action("Tiger Palm", 1, 8),
        "Blackout Kick": new Action("Blackout Kick", 1, 9),
        "Leg Sweep": new Action("Leg Sweep", 1, 10),


        //bar0
        "Invoke Niuzao, the Black Ox": new Action("Invoke Niuzao, the Black Ox", 0, 0),
        "Detox": new Action("Detox", 0, 4),
        "Spear Hand Strike": new Action("Spear Hand Strike", 0, 5),
        "Spinning Crane Kick": new Action("Spinning Crane Kick", 0, 6),
        "Healing Elixir": new Action("Healing Elixir", 0, 7),
        "Fortifying Brew": new Action("Fortifying Brew", 0, 8),
        "Paralysis": new Action("Paralysis", 0, 11),

        //bar2
        "Celestial Brew": new Action("Celestial Brew", 2, 0),
        "Purifying Brew": new Action("Purifying Brew", 2, 1),
        "Crackling Jade Lightning": new Action("Crackling Jade Lightning", 2, 3),
        "Zen Meditation": new Action("Zen Meditation", 2, 4),
        "Expel Harm": new Action("Expel Harm", 2, 7),
        "Tiger's Lust": new Action("Tiger's Lust", 2, 11),

        "Vivify": new Action("Vivify", 3, 0),
    }
}

if (player.spec==="restorationShaman") {
    actions = {
        //bar1
        "Chain Heal": new Action("Chain Heal", 1, 0),
        "Riptide": new Action("Riptide", 1, 1),
        "Cloudburst Totem": new Action("Cloudburst Totem", 1, 2),
        "Ghost Wolf": new Action("Ghost Wolf",1,3),

        "Earthbind Totem": new Action("Earthbind Totem", 1, 5),
        "Mana Tide Totem": new Action("Mana Tide Totem",1,6),

        "Healing Surge": new Action("Healing Surge", 1, 8),
        "Healing Wave": new Action("Healing Wave", 1, 9),
        "Capacitor Totem": new Action("Capacitor Totem", 1, 10),

        //bar0
        "Healing Tide Totem": new Action("Healing Tide Totem", 0, 0),
        "Healing Rain": new Action("Healing Rain", 0, 1),
        "Wellspring": new Action("Wellspring", 0, 2),

        "Purify Spirit": new Action("Purify Spirit",0,4),

        "Wind Shear": new Action("Wind Shear", 0, 5),
        "Chain Lightning": new Action("Chain Lightning", 0, 6),
        "Astral Shift": new Action("Astral Shift", 0, 8),
        "Hex": new Action("Hex", 0, 11),
        //bar2
        "Flame Shock": new Action("Flame Shock", 2, 0),
        "Lava Burst": new Action("Lava Burst", 2, 1),
        "Lightning Bolt": new Action("Lightning Bolt", 2, 2),


        "Earthen Wall Totem": new Action("Earthen Wall Totem", 2, 3),

        "Spirit Link Totem": new Action("Spirit Link Totem", 2, 4),
        "Ascendance": new Action("Ascendance", 2, 6),
        "Earth Shield": new Action("Earth Shield", 2, 7),

        "Spiritwalker's Grace": new Action("Spiritwalker's Grace", 2, 11),

        "Unleash Life": new Action("Unleash Life", 3, 0),
        "Frost Shock": new Action("Frost Shock", 3, 1),
        "Water Shield": new Action("Water Shield", 3, 11),
    }
}

if (player.spec==="elemental") {
    actions = {
        "Fire Elemental": new Action("Fire Elemental", 0, 0),
        "Earthquake": new Action("Earthquake", 0, 1),

        "Wind Shear": new Action("Wind Shear", 0, 5),
        "Chain Lightning": new Action("Chain Lightning", 0, 6),
        "Astral Shift": new Action("Astral Shift", 0, 8),

        "Earth Shock": new Action("Earth Shock", 1, 0),
        "Flame Shock": new Action("Flame Shock", 1, 1),
        "Stormkeeper": new Action("Stormkeeper", 1, 2),
        "Ghost Wolf": new Action("Ghost Wolf",1,3),

        "Lightning Bolt": new Action("Lightning Bolt", 1, 8),
        "Lava Burst": new Action("Lava Burst", 1, 9),

        "Capacitor Totem": new Action("Capacitor Totem", 1, 10),

        "Elemental Blast": new Action("Elemental Blast", 2, 0),

        "Spiritwalker's Grace": new Action("Spiritwalker's Grace", 2, 11),

        "Frost Shock": new Action("Frost Shock", 3, 1),

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
        "Celestial Alignment": new Action("Celestial Alignment", 0, 0),
        "Starfall": new Action("Starfall", 0, 1),
        "Sunfire": new Action("Sunfire", 0, 6),
        //bar2
        "Moonfire": new Action("Moonfire", 2, 0),
        "Regrowth": new Action("Regrowth", 2, 2),
        "Moonkin Form": new Action("Moonkin Form", 2, 3),
    }

}


if (player.spec==="assassination") {
    actions = {
        //bar0
        "Vendetta": new Action("Vendetta", 0, 0),
        "Crimson Tempest": new Action("Crimson Tempest", 0, 1),
        "Sprint": new Action("Sprint", 0, 2),
        "Shiv": new Action("Shiv", 0, 4),
        "Kick": new Action("Kick", 0, 5),
        "Fan of Knives": new Action("Fan of Knives", 0, 6),
        "Crimson Vial": new Action("Crimson Vial", 0, 7),
        "Feint": new Action("Feint", 0, 8),
        "Sap": new Action("Sap", 0, 11),
        //bar1
        "Rupture": new Action("Rupture", 1, 0),
        "Garrote": new Action("Garrote", 1, 1),
        "Slice And Dice": new Action("Slice And Dice", 1, 2),
        "Shadowstep": new Action("Shadowstep", 1, 3),

        "Mutilate": new Action("Mutilate", 1, 8),
        "Envenom": new Action("Envenom", 1, 9),
        "Kidney Shot": new Action("Kidney Shot", 1, 10),

        //bar2
        "Ambush": new Action("Ambush", 2, 0),
        "Deadly Poison": new Action("Deadly Poison", 2, 2),
        "Poisoned Knife": new Action("Poisoned Knife", 2, 3),
        "Cloak of Shadows": new Action("Cloak of Shadows", 2, 4),
        "Evasion": new Action("Evasion", 2, 5),
        "Vanish": new Action("Vanish", 2, 6),

        "Stealth": new Action("Stealth", 2, 11),

        //bar3
    }
}
if (player.spec==="windwalker") {
    actions = {
        //bar0
        "Invoke Xuen, the White Tiger": new Action("Invoke Xuen, the White Tiger", 0, 0),
        "Storm, Earth, and Fire": new Action("Storm, Earth, and Fire", 0, 1),
        "Flying Serpent Kick": new Action("Flying Serpent Kick", 0, 2),

        "Detox": new Action("Detox", 0, 4),
        "Spear Hand Strike": new Action("Spear Hand Strike", 0, 5),
        "Spinning Crane Kick": new Action("Spinning Crane Kick", 0, 6),

        "Fortifying Brew": new Action("Fortifying Brew", 0, 8),
        "Paralysis": new Action("Paralysis", 0, 11),

        //bar1
        "Rising Sun Kick": new Action("Rising Sun Kick", 1, 0),
        "Fists of Fury": new Action("Fists of Fury", 1, 1),
        "Fist of the White Tiger": new Action("Fist of the White Tiger", 1, 2),
        "Roll": new Action("Roll", 1, 3),
        "Ring of Peace": new Action("Ring of Peace", 1, 4),
        "Transcendence: Transfer": new Action("Transcendence: Transfer", 1, 5),
        "Transcendence": new Action("Transcendence", 1, 6),

        "Tiger Palm": new Action("Tiger Palm", 1, 8),
        "Blackout Kick": new Action("Blackout Kick", 1, 9),
        "Leg Sweep": new Action("Leg Sweep", 1, 10),

        //bar2
        "Whirling Dragon Punch":  new Action("Whirling Dragon Punch", 2, 0),
        "Touch of Death":  new Action("Touch of Death", 2, 2),
        "Touch of Karma":  new Action("Touch of Karma", 2, 2),
        "Crackling Jade Lightning": new Action("Crackling Jade Lightning", 2, 3),
        "Expel Harm": new Action("Expel Harm", 2, 5),
        "Tiger's Lust": new Action("Tiger's Lust", 2, 11),




        //bar3
        "Provoke": new Action("Provoke", 3, 5),
        "Resuscitate": new Action("Resuscitate", 3, 6),
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
        //bar0
        "Recklessness": new Action("Recklessness",0,0),
        "Pummel": new Action("Pummel", 0, 5),
        "Ignore Pain": new Action("Ignore Pain",0,7),
        "Enraged Regeneration": new Action("Enraged Regeneration", 0, 8),

        //bar1
        "Raging Blow": new Action("Raging Blow", 1, 0),
        "Bloodthirst": new Action("Bloodthirst", 1, 1),
        "Victory Rush": new Action("Victory Rush", 1, 2),
        "Charge": new Action("Charge", 1, 3),

        "Whirlwind": new Action("Whirlwind", 1, 8),
        "Rampage": new Action("Rampage", 1, 9),

        //bar2
        "Execute": new Action("Execute", 2, 0),
        "Shattering Throw": new Action("Shattering Throw",2,2),
        "Heroic Throw": new Action("Heroic Throw",2,3),

        "Rallying Cry": new Action("Rallying Cry", 2, 4),

        "Heroic Leap": new Action("Heroic Leap", 2, 11),

        //bar3
        "Intervene": new Action("Intervene",3,0),
        "Spell Reflection": new Action("Spell Reflection",3,1),
        "Piercing Howl": new Action("Piercing Howl",3,2),
        "Challenging Shout":  new Action("Challenging Shout", 3, 8),
        "Battle Shout":  new Action("Battle Shout", 3, 10),

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