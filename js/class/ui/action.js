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


        document.getElementById("action_"+bar+"_"+slot+"").innerHTML = "<div class='action_gcd' id='action_gcd_"+bar+"_"+slot+"'></div><div class='action_cd'  id='action_cd_"+bar+"_"+slot+"'></div><img  id='action_"+bar+"_"+slot+"img' draggable='false' src='"+iconsPath[ability]+"'> <span class='ab_keybind'>"+keybind+"</span> <span class='ab_charges'  id='action_charges_"+bar+"_"+slot+"'></span> </span> <span class='ab_cdText'  id='action_cdText_"+bar+"_"+slot+"'></span>"

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
        if (player.abilities[this.name].checkCost(player,undefined,false) && (player.abilities[this.name].talent===player.abilities[this.name].talentSelect) && player.abilities[this.name].canUse && (!player.abilities[this.name].requiresStealth || player.isStealthed || player.abilities[this.name].canUseWithoutStealth) && (!player.abilities[this.name].lessthanhealth || (player.targetObj.health/player.targetObj.maxHealth<player.abilities[this.name].lessthanhealth))) {
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
        "Purge": new Action("Purge", 0, 7),
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
        "Purge": new Action("Purge", 0, 7),
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
        "Heroism": new Action("Heroism", 3, 5),
    }
}



if (player.spec==="restorationDruid") {
    actions = {
        //bar1
        "Swiftmend": new Action("Swiftmend",1,0),
        "Rejuvenation": new Action("Rejuvenation", 1, 1),
        "Efflorescence": new Action("Efflorescence",1,2),
        "Cat Form": new Action("Cat Form",1,3),


        "Regrowth": new Action("Regrowth", 1, 8),
        "Lifebloom": new Action("Lifebloom",1,9),
        "Cenarion Ward": new Action("Cenarion Ward",1,10),

        //bar0
        "Tranquility": new Action("Tranquility",0,0),
        "Wild Growth": new Action("Wild Growth", 0, 1),
        "Flourish": new Action("Flourish",0,2),

        "Nature's Cure": new Action("Nature's Cure",0,4),
        "Soothe": new Action("Soothe",0,5),
        "Sunfire": new Action("Sunfire", 0,6),
        "Renewal": new Action( "Renewal",0,7),
        "Barkskin": new Action("Barkskin",0,8),
        "Entangling Roots": new Action("Entangling Roots",0,11),

        //bar2
        "Moonfire": new Action("Moonfire", 2, 0),
        "Wrath": new Action("Wrath", 2, 1),
        //"Starfire": new Action("Starfire", 2, 2),

        "Ironbark": new Action("Ironbark",2,4),
        "Bear Form": new Action("Bear Form",2,5),
        "Incarnation: Tree of Life": new Action("Incarnation: Tree of Life",2,6),
        "Nature's Swiftness":new Action("Nature's Swiftness",2,7),

        //bar3
        "Innervate": new Action("Innervate",3,0),
        "Rebirth": new Action("Rebirth",3,1),

        "Revive": new Action ("Revive",3,4),
        "Revitalize": new Action ("Revitalize",3,5),
    }
}

if (player.spec==="balance") {
    actions = {
        //bar0
        "Celestial Alignment": new Action("Celestial Alignment", 0, 0),
        "Starfall": new Action("Starfall", 0, 1),

        "Remove Corruption": new Action("Remove Corruption",0,4),
        "Solar Beam": new Action("Solar Beam",0,5),
        "Sunfire": new Action("Sunfire", 0, 6),
        "Renewal": new Action( "Renewal",0,7),
        "Barkskin": new Action("Barkskin",0,8),
        "Entangling Roots": new Action("Entangling Roots",0,11),

        //bar1
        "Starsurge": new Action("Starsurge", 1, 0),
        "New Moon": new Action("New Moon",1,1),

        "Wrath": new Action("Wrath", 1, 8),
        "Starfire": new Action("Starfire", 1, 9),
        "Mighty Bash": new Action("Mighty Bash",1,10),

        //bar2
        "Moonfire": new Action("Moonfire", 2, 0),
        "Regrowth": new Action("Regrowth", 2, 2),
        "Moonkin Form": new Action("Moonkin Form", 2, 3),
        "Bear Form": new Action("Bear Form", 2, 5),
        "Incarnation: Chosen of Elune": new Action("Incarnation: Chosen of Elune",2,6),

        //bar3
        "Innervate": new Action("Innervate",3,0),
        "Rebirth": new Action("Rebirth",3,1),

        "Revive": new Action ("Revive",3,4),
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
        //bar 0
        "Arcane Power": new Action("Arcane Power",0,0),
        "Rune of Power": new Action("Rune of Power",0,1),

        "Remove Curse": new Action("Remove Curse",0,4),
        "Counterspell": new Action("Counterspell",0,5),
        "Arcane Explosion": new Action("Arcane Explosion",0,6),
        "Spellsteal":  new Action("Spellsteal",0,7),
        "Prismatic Barrier": new Action("Prismatic Barrier",0,8),

        //bar1
        "Arcane Barrage": new Action("Arcane Barrage", 1, 0),
        "Touch of the Magi": new Action("Touch of the Magi",1,1),
        "Evocation": new Action("Evocation",1,2),
        "Blink": new Action("Blink",1,3),

        "Arcane Blast": new Action("Arcane Blast", 1, 8),
        "Arcane Missiles": new Action("Arcane Missiles", 1, 9),
        "Frost Nova": new Action("Frost Nova",1,10),

        //bar2
        "Arcane Orb": new Action("Arcane Orb",2,0),
        "Presence of Mind": new Action("Presence of Mind",2,1),
        "Alter Time": new Action("Alter Time",2,2),

        "Ice Block": new Action("Ice Block",2,4),
        "Mirror Image": new Action("Mirror Image",2,5),

        //bar3
        "Greater Invisibility": new Action("Greater Invisibility",3,1),
        "Time Warp": new Action("Time Warp",3,5),
        "Arcane Intellect": new Action("Arcane Intellect",3,6),
    }
}


if (player.spec==="fury") {
    actions = {
        //bar0
        "Recklessness": new Action("Recklessness",0,0),
        "Pummel": new Action("Pummel", 0, 5),
        "Bladestorm": new Action("Bladestorm", 0, 6),
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

if (player.spec==="arms") {
    actions = {
        //bar0
        "Avatar": new Action("Avatar", 0, 0),
        "Bladestorm ": new Action("Bladestorm ", 0, 1),

        "Pummel": new Action("Pummel", 0, 5),
        "Whirlwind": new Action("Whirlwind", 0, 6),
        "Ignore Pain": new Action("Ignore Pain",0,7),
        "Die by the Sword": new Action("Die by the Sword",0,8),

        //bar1
        "Overpower": new Action("Overpower",1,0),
        "Sweeping Strikes": new Action("Sweeping Strikes",1,1),
        "Victory Rush": new Action("Victory Rush", 1, 2),
        "Charge": new Action("Charge", 1, 3),

        "Slam": new Action("Slam",1,8),
        "Mortal Strike": new Action("Mortal Strike",1,9),
        "Rend": new Action("Rend",1,10),

        //bar2
        "Execute": new Action("Execute", 2, 0),
        "Colossus Smash": new Action("Colossus Smash",2,1),
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

if (player.spec==="protectionWarrior") {
    actions = {
        //bar0
        "Avatar ": new Action("Avatar ", 0, 0),
        "Demoralizing Shout": new Action("Demoralizing Shout",0,1),

        "Pummel": new Action("Pummel", 0, 5),
        "Revenge": new Action("Revenge",0,6),
        "Ignore Pain": new Action("Ignore Pain",0,7),
        "Shield Wall": new Action("Shield Wall",0,8),

        //bar1
        "Taunt": new Action("Taunt",1,0),
        "Thunder Clap": new Action("Thunder Clap",1,1),
        "Victory Rush": new Action("Victory Rush", 1, 2),
        "Charge": new Action("Charge", 1, 3),

        "Devastate": new Action("Devastate",1,8),
        "Shield Slam": new Action("Shield Slam",1,9),
        "Shockwave": new Action("Shockwave",1,10),

        //bar2
        "Execute": new Action("Execute", 2, 0),
        "Challenging Shout": new Action("Challenging Shout",2,1),
        "Shattering Throw": new Action("Shattering Throw",2,2),
        "Heroic Throw": new Action("Heroic Throw",2,3),
        "Rallying Cry": new Action("Rallying Cry", 2, 4),
        "Last Stand": new Action("Last Stand",2,5),

        "Shield Block": new Action("Shield Block",2,7),

        "Heroic Leap": new Action("Heroic Leap", 2, 11),

        //bar3
        "Intervene": new Action("Intervene",3,0),
        "Spell Reflection": new Action("Spell Reflection",3,1),
        "Piercing Howl": new Action("Piercing Howl",3,2),
        "Battle Shout":  new Action("Battle Shout", 3, 10),

    }
}

if (player.spec==="holyPriest") {
    actions = {
        "Holy Word: Serenity": new Action("Holy Word: Serenity", 1, 0),
        "Renew": new Action("Renew", 1, 1),
        "Holy Word: Sanctify": new Action("Holy Word: Sanctify", 1, 2),
        "Angelic Feather": new Action("Angelic Feather", 1, 3),
        "Mass Dispel": new Action("Mass Dispel",1,4),
        "Symbol of Hope": new Action("Symbol of Hope", 1, 6),

        "Flash Heal": new Action("Flash Heal", 1, 8),
        "Heal": new Action("Heal", 1, 9),
        "Holy Word: Chastise": new Action("Holy Word: Chastise", 1, 10),

        "Divine Hymn": new Action("Divine Hymn", 0, 0),
        "Circle of Healing": new Action("Circle of Healing", 0, 1),
        "Prayer of Healing": new Action("Prayer of Healing", 0, 2),

        "Purify": new Action("Purify", 0, 4),
        "Shadow Word: Death": new Action("Shadow Word: Death",0,5),
        "Holy Nova": new Action("Holy Nova", 0, 6),
        "Dispel Magic": new Action("Dispel Magic", 0, 7),
        "Desperate Prayer": new Action("Desperate Prayer", 0, 8),

        //bar2
        "Shadow Word: Pain": new Action("Shadow Word: Pain", 2, 0),
        "Holy Fire": new Action("Holy Fire", 2, 1),
        "Smite": new Action("Smite", 2, 2),
        "Divine Star": new Action("Divine Star",2,3),
        "Guardian Spirit": new Action("Guardian Spirit", 2, 4),
        "Fade": new Action("Fade", 2, 5),
        "Holy Word: Salvation": new Action("Holy Word: Salvation",2,6),
        "Prayer of Mending": new Action("Prayer of Mending", 2, 7),


        "Leap of Faith": new Action( "Leap of Faith",3,0),
        "Power Infusion": new Action( "Power Infusion",3,1),
        "Power Word: Shield": new Action( "Power Word: Shield",3,2),

    }
}


if (player.spec==="discipline") {
    actions = {
        //bar0
        "Evangelism": new Action("Evangelism",0,0),
        "Power Word: Radiance": new Action("Power Word: Radiance",0,1),

        "Purify": new Action("Purify", 0, 4),
        "Shadow Word: Death": new Action("Shadow Word: Death",0,5),
        "Holy Nova": new Action("Holy Nova", 0, 6),
        "Dispel Magic": new Action("Dispel Magic", 0, 7),
        "Desperate Prayer": new Action("Desperate Prayer", 0, 8),

        //bar1
        "Shadow Mend": new Action("Shadow Mend",1,0),
        "Power Word: Shield": new Action( "Power Word: Shield",1,1),
        "Shadowfiend": new Action("Shadowfiend",1,2),
        "Angelic Feather": new Action("Angelic Feather", 1, 3),

        "Mass Dispel": new Action("Mass Dispel",1,4),
        "Smite": new Action("Smite", 1, 8),
        "Penance": new Action("Penance",1,9),
        "Power Word: Solace": new Action("Power Word: Solace",1,10),

        //bar2
        "Shadow Word: Pain": new Action("Shadow Word: Pain", 2, 0),
        "Mind Blast": new Action("Mind Blast",2,1),
        "Schism": new Action("Schism",2,2),

        "Divine Star": new Action("Divine Star",2,3),
        "Pain Suppression": new Action("Pain Suppression",2,4),
        "Power Word: Barrier": new Action("Power Word: Barrier",2,5),
        "Rapture": new Action("Rapture",2,6),

        //bar3
        "Leap of Faith": new Action( "Leap of Faith",3,0),
        "Power Infusion": new Action( "Power Infusion",3,1),

    }
}

if (player.spec==="holyPaladin") {
    actions = {
        //bar0
        "Avenging Wrath": new Action("Avenging Wrath",0,0),
        "Light of Dawn": new Action("Light of Dawn",0,1),
        "Light of the Martyr": new Action("Light of the Martyr",0,2),
        "Cleanse": new Action("Cleanse",0,4),

        "Consecration": new Action("Consecration",0,6),
        "Divine Shield": new Action("Divine Shield",0,7),
        "Divine Protection": new Action("Divine Protection",0,8),

        //bar1
        "Holy Shock": new Action("Holy Shock",1,0),
        "Word of Glory": new Action("Word of Glory",1,1),
        "Beacon of Light": new Action("Beacon of Light",1,2),
        "Divine Steed": new Action("Divine Steed",1,3),

        "Flash of Light": new Action("Flash of Light", 1, 8),
        "Holy Light": new Action("Holy Light",1,9),
        "Hammer of Justice": new Action("Hammer of Justice",1,10),

        //bar2
        "Judgment": new Action("Judgment",2,0),
        "Crusader Strike": new Action("Crusader Strike",2,1),
        "Hammer of Wrath": new Action("Hammer of Wrath",2,2),

        "Lay on Hands": new Action("Lay on Hands",2,4),
        "Blessing of Protection": new Action("Blessing of Protection",2,5),
        "Aura Mastery": new Action("Aura Mastery",2,6),
        "Blessing of Freedom": new Action( "Blessing of Freedom",2,11),

        //bar3

    }
}


if (player.spec==="protectionPaladin") {
    actions = {
        //bar0
        "Avenging Wrath": new Action("Avenging Wrath",0,0),
        "Avenger's Shield": new Action("Avenger's Shield",0,1),

        "Cleanse Toxins": new Action("Cleanse Toxins",0,4),
        "Rebuke": new Action("Rebuke",0,5),
        "Consecration": new Action("Consecration",0,6),
        "Ardent Defender": new Action("Ardent Defender",0,7),
        "Guardian of Ancient Kings": new Action("Guardian of Ancient Kings",0,8),

        //bar1
        "Hand of Reckoning": new Action("Hand of Reckoning",1,0),
        "Word of Glory": new Action("Word of Glory",1,1),
        "Shield of the Righteous": new Action("Shield of the Righteous",1,2),

        "Divine Steed": new Action("Divine Steed",1,3),

        "Judgment": new Action("Judgment",1,8),
        "Hammer of the Righteous": new Action("Hammer of the Righteous",1,9),
        "Hammer of Justice": new Action("Hammer of Justice",1,10),

        //bar2
        "Flash of Light": new Action("Flash of Light", 2, 0),
        "Hammer of Wrath": new Action("Hammer of Wrath",2,1),

        "Lay on Hands": new Action("Lay on Hands",2,4),
        "Blessing of Protection": new Action("Blessing of Protection",2,5),
        "Divine Shield": new Action("Divine Shield",2,6),
        "Blessing of Freedom": new Action( "Blessing of Freedom",2,11),

        //bar3

    }
}
if (player.spec==="retribution") {
    actions = {
        //bar0
        "Avenging Wrath": new Action("Avenging Wrath",0,0),
        "Divine Storm": new Action("Divine Storm",0,1),

        "Cleanse Toxins": new Action("Cleanse Toxins",0,4),
        "Rebuke": new Action("Rebuke",0,5),
        "Consecration": new Action("Consecration",0,6),

        "Shield of Vengeance": new Action("Shield of Vengeance",0,8),

        //bar1
        "Templar's Verdict": new Action("Templar's Verdict",1,0),
        "Blade of Justice": new Action("Blade of Justice",1,1),
        "Wake of Ashes": new Action("Wake of Ashes",1,2),
        "Divine Steed": new Action("Divine Steed",1,3),

        "Judgment": new Action("Judgment",1,8),
        "Crusader Strike": new Action("Crusader Strike",1,9),
        "Hammer of Justice": new Action("Hammer of Justice",1,10),

        //bar2
        "Flash of Light": new Action("Flash of Light", 2, 0),
        "Hammer of Wrath": new Action("Hammer of Wrath",2,1),
        "Final Reckoning": new Action("Final Reckoning",2,2),

        "Lay on Hands": new Action("Lay on Hands",2,4),
        "Blessing of Protection": new Action("Blessing of Protection",2,5),
        "Divine Shield": new Action("Divine Shield",2,6),
        "Blessing of Freedom": new Action( "Blessing of Freedom",2,11),

        //bar3

    }
}

if (player.spec==="havoc") {
    actions = {
        //bar0
        "Metamorphosis": new Action("Metamorphosis",0,0),
        "Disrupt": new Action("Disrupt",0,5),
        "Blade Dance": new Action("Blade Dance",0,6),
        "Consume Magic": new Action("Consume Magic", 0, 7),
        "Blur": new Action("Blur",0,8),

        //bar1
        "Felblade": new Action("Felblade",1,0),
        "Immolation Aura": new Action("Immolation Aura",1,1),
        "Eye Beam": new Action("Eye Beam",1,2),
        "Fel Rush": new Action("Fel Rush",1,3),

        "Demon's Bite": new Action("Demon's Bite", 1, 8),
        "Chaos Strike": new Action("Chaos Strike", 1, 9),
        "Chaos Nova": new Action("Chaos Nova",1,10),

        //bar2
        "Fel Eruption": new Action("Fel Eruption",2,0),
        "Netherwalk": new Action("Netherwalk",2,1),
        "Throw Glaive": new Action( "Throw Glaive",2,3),
        "Darkness": new Action("Darkness",2,4),
        "Vengeful Retreat":new Action("Vengeful Retreat",2,11)

        //bar3
    }
}

if (player.spec==="vengeance") {
    actions = {
        //bar0
        "Metamorphosis": new Action("Metamorphosis",0,0),
        "Disrupt": new Action("Disrupt",0,5),
        "Sigil of Flame": new Action("Sigil of Flame",0,6),
        "Consume Magic": new Action("Consume Magic", 0, 7),
        "Fiery Brand":new Action("Fiery Brand",0,8),

        //bar1
        "Torment": new Action("Torment",1,0),
        "Immolation Aura": new Action("Immolation Aura",1,1),
        "Fel Devastation": new Action("Fel Devastation",1,2),
        "Infernal Strike" :new Action("Infernal Strike",1,3),

        "Shear": new Action("Shear", 1, 8),
        "Soul Cleave": new Action("Soul Cleave",1,9),
        "Spirit Bomb": new Action("Spirit Bomb",1,10),

        //bar2
        "Sigil of Silence": new Action ("Sigil of Silence",2,1),
        "Throw Glaive": new Action( "Throw Glaive",2,3),
        "Demon Spikes": new Action("Demon Spikes", 2, 7),
        //bar3
    }
}

if (player.spec==="blood") {
    actions = {
        //bar0
        "Dancing Rune Weapon": new Action("Dancing Rune Weapon",0,0),
        "Vampiric Blood": new Action("Vampiric Blood",0,1),

        "Mind Freeze": new Action("Mind Freeze",0,5),
        "Death and Decay": new Action("Death and Decay",0,6),
        "Lichborne": new Action("Lichborne",0,7),
        "Icebound Fortitude": new Action("Icebound Fortitude",0,8),

        //bar1
        "Dark Command": new Action("Dark Command",1,0),
        "Marrowrend": new Action("Marrowrend",1,1),
        "Blood Boil": new Action("Blood Boil",1,2),
        "Death's Advance": new Action("Death's Advance",1,3),

        "Death Grip": new Action("Death Grip",1,4),
        "Gorefiend's Grasp": new Action("Gorefiend's Grasp",1,5),


        "Heart Strike": new Action("Heart Strike",1,8),
        "Death Strike": new Action("Death Strike",1,9),
        "Asphyxiate": new Action("Asphyxiate",1,10),

        //bar2
        "Anti-Magic Shell": new Action("Anti-Magic Shell",2,0),
        "Death Coil": new Action("Death Coil",2,1),
        "Raise Dead": new Action("Raise Dead",2,2),

        "Death's Caress": new Action("Death's Caress",2,3),
        "Anti-Magic Zone": new Action("Anti-Magic Zone",2,4),

        "Rune Tap": new Action("Rune Tap",2,7),

        //bar3
        "Raise Ally": new Action("Raise Ally",3,0),
        "Sacrificial Pact": new Action("Sacrificial Pact",3,1),

    }
}


if (player.spec==="frostDk") {
    actions = {
        //bar0
        "Empower Rune Weapon": new Action("Empower Rune Weapon",0,0),
        "Pillar of Frost": new Action("Pillar of Frost",0,1),

        "Mind Freeze": new Action("Mind Freeze",0,5),
        "Death and Decay": new Action("Death and Decay",0,6),
        "Lichborne": new Action("Lichborne",0,7),
        "Icebound Fortitude": new Action("Icebound Fortitude",0,8),

        //bar1
        "Howling Blast": new Action("Howling Blast",1,0),
        "Frostwyrm's Fury": new Action("Frostwyrm's Fury",1,1),
        "Remorseless Winter": new Action("Remorseless Winter" ,1,2),
        "Death's Advance": new Action("Death's Advance",1,3),
        "Death Grip": new Action("Death Grip",1,4),

        "Obliterate": new Action("Obliterate",1,8),
        "Frost Strike": new Action("Frost Strike",1,9),
        "Asphyxiate": new Action("Asphyxiate",1,10),

        //bar2
        "Anti-Magic Shell": new Action("Anti-Magic Shell",2,0),
        "Death Coil": new Action("Death Coil",2,1),
        "Raise Dead": new Action("Raise Dead",2,2),
        "Death Strike": new Action("Death Strike",2,3),
        "Anti-Magic Zone": new Action("Anti-Magic Zone",2,4),


        //bar3
        "Raise Ally": new Action("Raise Ally",3,0),
        "Sacrificial Pact": new Action("Sacrificial Pact",3,1),

    }
}
//
if (player.spec==="unholy") {
    actions = {
        //bar0
        "Army of the Dead": new Action("Army of the Dead",0,0),
        "Dark Transformation": new Action("Dark Transformation",0,1),

        "Mind Freeze": new Action("Mind Freeze",0,5),
        "Death and Decay": new Action("Death and Decay",0,6),
        "Lichborne": new Action("Lichborne",0,7),
        "Icebound Fortitude": new Action("Icebound Fortitude",0,8),

        //bar1
        "Death Coil": new Action("Death Coil",1,0),
        "Outbreak": new Action("Outbreak",1,1),
        "Epidemic": new Action("Epidemic",1,2),
        "Death's Advance": new Action("Death's Advance",1,3),
        "Death Grip": new Action("Death Grip",1,4),

        "Scourge Strike": new Action("Scourge Strike",1,8),
        "Festering Strike": new Action("Festering Strike",1,9),
        "Asphyxiate": new Action("Asphyxiate",1,10),

        //bar2
        "Anti-Magic Shell": new Action("Anti-Magic Shell",2,0),
        "Soul Reaper": new Action("Soul Reaper",2,1),
        "Raise Dead": new Action("Raise Dead",2,2),
        "Death Strike": new Action("Death Strike",2,3),
        "Anti-Magic Zone": new Action("Anti-Magic Zone",2,4),
        "Unholy Blight": new Action("Unholy Blight",2,5),
        "Apocalypse": new Action("Apocalypse",2,7),

        //bar3
        "Raise Ally": new Action("Raise Ally",3,0),
        "Sacrificial Pact": new Action("Sacrificial Pact",3,1),

    }
}


if (player.spec==="guardian") {
    actions = {
        //bar0
        "Berserk": new Action("Berserk",0,0),
        "Swipe": new Action("Swipe",0,1),


        "Remove Corruption": new Action("Remove Corruption",0,4),

        "Skull Bash": new Action("Skull Bash",0,5),
        "Thrash": new Action("Thrash",0,6),
        "Soothe": new Action("Soothe",0,7),
        //"Renewal": new Action( "Renewal",0,7),
        "Survival Instincts": new Action("Survival Instincts",0,8),
        "Entangling Roots": new Action("Entangling Roots",0,11),

        //bar1
        "Growl": new Action("Growl",1,0),
        "Ironfur": new Action("Ironfur",1,1),
        "Frenzied Regeneration": new Action("Frenzied Regeneration",1,2),
        "Stampeding Roar": new Action("Stampeding Roar",1,3),
        "Mangle": new Action("Mangle",1,8),
        "Maul": new Action("Maul",1,9),
        "Incapacitating Roar": new Action("Incapacitating Roar",1,10),


        //bar2
        "Moonfire": new Action("Moonfire", 2, 0),
        "Barkskin": new Action("Barkskin",2,1),

        "Bear Form": new Action("Bear Form",2,5),

        //bar3
        "Rebirth": new Action("Rebirth",3,1),

        "Revive": new Action ("Revive",3,4),

    }
}


if (player.spec==="feral") {
    actions = {
        //bar0
        "Berserk": new Action("Berserk",0,0),
        "Swipe": new Action("Swipe",0,1),

        "Remove Corruption": new Action("Remove Corruption",0,4),

        "Skull Bash": new Action("Skull Bash",0,5),
        "Thrash": new Action("Thrash",0,6),
        "Soothe": new Action("Soothe",0,7),
        //"Renewal": new Action( "Renewal",0,7),
        "Survival Instincts": new Action("Survival Instincts",0,8),
        "Entangling Roots": new Action("Entangling Roots",0,11),

        //bar1
        "Rake": new Action("Rake",1,0),
        "Rip": new Action("Rip",1,1),

        "Cat Form": new Action("Cat Form",1,3),

        "Stampeding Roar": new Action("Stampeding Roar",1,5),



        "Shred": new Action("Shred",1,8),
        "Ferocious Bite": new Action("Ferocious Bite",1,9),
        "Maim": new Action("Maim",1,10),

        //bar2
        "Moonfire": new Action("Moonfire", 2, 0),
        "Barkskin": new Action("Barkskin",2,1),

        "Bear Form": new Action("Bear Form",2,5),
        "Tiger's Fury": new Action("Tiger's Fury",2,7),

        //bar3
        "Rebirth": new Action("Rebirth",3,1),

        "Revive": new Action ("Revive",3,4),

    }
}



if (player.spec==="enhancement") {
    actions = {
        "Feral Spirit": new Action("Feral Spirit",0,0),
        "Crash Lightning": new Action("Crash Lightning",0,1),

        "Wind Shear": new Action("Wind Shear", 0, 5),
        "Chain Lightning": new Action("Chain Lightning", 0, 6),
        "Purge": new Action("Purge", 0, 7),
        "Astral Shift": new Action("Astral Shift", 0, 8),


        "Lava Lash": new Action("Lava Lash",1,0),
        "Flame Shock": new Action("Flame Shock", 1, 1),
        "Sundering": new Action("Sundering",1,2),

        "Ghost Wolf": new Action("Ghost Wolf",1,3),

        "Lightning Bolt": new Action("Lightning Bolt", 1, 8),
        "Stormstrike": new Action("Stormstrike",1,9),
        "Capacitor Totem": new Action("Capacitor Totem", 1, 10),


        "Windfury Totem": new Action("Windfury Totem",2,7),
        "Spirit Walk": new Action("Spirit Walk",2,11),

        "Frost Shock": new Action("Frost Shock", 3, 1),
        "Heroism": new Action("Heroism", 3, 5),
    }
}

if (player.spec==="outlaw") {
    actions = {
        //bar0
        "Adrenaline Rush": new Action("Adrenaline Rush",0,0),
        "Blade Rush": new Action("Blade Rush",0,1),

        "Sprint": new Action("Sprint", 0, 2),
        "Shiv": new Action("Shiv", 0, 4),

        "Kick": new Action("Kick", 0, 5),
        "Blade Flurry": new Action("Blade Flurry",0,6),
        "Crimson Vial": new Action("Crimson Vial", 0, 7),

        "Sap": new Action("Sap", 0, 11),

        //bar1
        "Between the Eyes": new Action("Between the Eyes",1,0),
        "Roll the Bones": new Action("Roll the Bones",1,1),
        "Slice And Dice": new Action("Slice And Dice",1,2),
        "Grappling Hook": new Action("Grappling Hook",1,3),

        "Sinister Strike": new Action("Sinister Strike",1,8),
        "Dispatch": new Action("Dispatch",1,9),


        //bar2
        "Ambush": new Action("Ambush", 2, 0),
        "Pistol Shot": new Action("Pistol Shot",2,3),
        "Cloak of Shadows": new Action("Cloak of Shadows", 2, 4),
        "Evasion": new Action("Evasion", 2, 5),
        "Vanish": new Action("Vanish", 2, 6),

        "Stealth": new Action("Stealth", 2, 11),

        //bar3
    }
}


if (player.spec==="subtlety") {
    actions = {
        //bar0
        "Shadow Blades": new Action("Shadow Blades",0,0),
        "Black Powder": new Action("Black Powder",0,1),
        "Sprint": new Action("Sprint", 0, 2),

        "Shiv": new Action("Shiv", 0, 4),
        "Kick": new Action("Kick", 0, 5),
        "Shuriken Storm": new Action("Shuriken Storm",0,6),
        "Crimson Vial": new Action("Crimson Vial", 0, 7),

        "Sap": new Action("Sap", 0, 11),

        //bar1
        "Rupture": new Action("Rupture", 1, 0),
        "Symbols of Death": new Action("Symbols of Death",1,1),
        "Slice And Dice": new Action("Slice And Dice",1,2),
        "Shadowstep": new Action("Shadowstep",1,3),

        "Shadowstrike": new Action("Shadowstrike",1,8),
        "Eviscerate": new Action("Eviscerate",1,9),

        //bar2

        "Backstab": new Action("Backstab",2,1),

        "Shuriken Toss": new Action("Shuriken Toss",2,3),
        "Cloak of Shadows": new Action("Cloak of Shadows", 2, 4),
        "Evasion": new Action("Evasion", 2, 5),
        "Vanish": new Action("Vanish", 2, 6),
        "Shadow Dance": new Action("Shadow Dance",2,7),

        "Stealth": new Action("Stealth", 2, 11),

        //bar3
    }
}

if (player.spec==="fire") {
    actions = {
        //bar 0
        "Combustion": new Action("Combustion",0,0),
        "Rune of Power": new Action("Rune of Power",0,1),

        "Remove Curse": new Action("Remove Curse",0,4),
        "Counterspell": new Action("Counterspell",0,5),
        "Flamestrike": new Action("Flamestrike",0,6),
        "Spellsteal":  new Action("Spellsteal",0,7),
        "Blazing Barrier": new Action("Blazing Barrier",0,8),

        //bar1
        "Fire Blast": new Action("Fire Blast",1,0),
        "Pyroblast": new Action("Pyroblast",1,1),
        "Phoenix Flames": new Action("Phoenix Flames",1,2),
        "Blink": new Action("Blink",1,3),

        "Frost Nova": new Action("Frost Nova",1,5),

        "Fireball": new Action("Fireball",1,8),
        "Scorch": new Action("Scorch",1,9),
        "Dragon's Breath": new Action("Dragon's Breath",1,10),


        //bar2


        "Ice Block": new Action("Ice Block",2,4),
        "Mirror Image": new Action("Mirror Image",2,5),

        //bar3

        "Time Warp": new Action("Time Warp",3,5),
        "Arcane Intellect": new Action("Arcane Intellect",3,6),
    }
}

if (player.spec==="frostMage") {
    actions = {
        //bar 0
        "Icy Veins": new Action("Icy Veins",0,0),
        "Rune of Power": new Action("Rune of Power",0,1),


        "Remove Curse": new Action("Remove Curse",0,4),
        "Counterspell": new Action("Counterspell",0,5),
        "Blizzard": new Action("Blizzard",0,6),
        "Spellsteal":  new Action("Spellsteal",0,7),
        "Ice Barrier": new Action("Ice Barrier",0,8),


        //bar1
        "Flurry": new Action("Flurry",1,0),
        "Frozen Orb": new Action("Frozen Orb",1,1),
        "Cone of Cold": new Action("Cone of Cold",1,2),
        "Blink": new Action("Blink",1,3),

        "Frost Nova": new Action("Frost Nova",1,5),


        "Frostbolt": new Action("Frostbolt",1,8),
        "Ice Lance": new Action("Ice Lance",1,9),


        //bar2
        "Cold Snap": new Action("Cold Snap",2,0),

        "Ice Block": new Action("Ice Block",2,4),
        "Mirror Image": new Action("Mirror Image",2,5),
        "Summon Water Elemental": new Action("Summon Water Elemental",2,6),

        //bar3

        "Time Warp": new Action("Time Warp",3,5),
        "Arcane Intellect": new Action("Arcane Intellect",3,6),
    }
}

if (player.spec==="shadow") {
    actions = {
        //bar0
        "Power Infusion": new Action( "Power Infusion",0,0),
        "Vampiric Embrace": new Action("Vampiric Embrace",0,1),

        "Purify Disease": new Action("Purify Disease",0,4),
        "Silence": new Action("Silence",0,5),
        "Mind Sear": new Action("Mind Sear",0,6),
        "Dispel Magic": new Action("Dispel Magic", 0, 7),
        "Desperate Prayer": new Action("Desperate Prayer", 0, 8),

        //bar1
        "Void Eruption": new Action("Void Eruption",1,0),
        "Shadow Word: Pain": new Action("Shadow Word: Pain", 1, 1),
        "Shadowfiend": new Action("Shadowfiend",1,2),
        //"Angelic Feather": new Action("Angelic Feather", 1, 3),

        "Mass Dispel": new Action("Mass Dispel",1,4),

        "Mind Blast": new Action("Mind Blast",1,8),
        "Mind Flay": new Action("Mind Flay",1,9),

        //bar2

        "Shadow Word: Death": new Action("Shadow Word: Death",2,0),
        "Vampiric Touch": new Action("Vampiric Touch",2,1),
        "Devouring Plague": new Action("Devouring Plague",2,2),

        "Dispersion": new Action("Dispersion",2,4),

        //bar3
        "Leap of Faith": new Action( "Leap of Faith",3,0),
        "Power Word: Shield": new Action( "Power Word: Shield",3,2),

    }
}

if (player.spec==="destruction") {
    actions = {
        //bar0
        "Summon Infernal": new Action("Summon Infernal",0,0),
        "Dark Soul: Instability": new Action("Dark Soul: Instability",0,1),


        "Command Demon": new Action("Command Demon",0,5),
        "Rain of Fire": new Action("Rain of Fire",0,6),
        "Havoc": new Action("Havoc",0,7),
        "Unending Resolve": new Action("Unending Resolve",0, 8),

        //bar1
        "Conflagrate": new Action("Conflagrate",1,0),
        "Immolate": new Action("Immolate",1,1),
        "Cataclysm": new Action("Cataclysm",1,2),

        "Burning Rush": new Action("Burning Rush",1,3),

        "Incinerate": new Action("Incinerate",1,8),
        "Chaos Bolt": new Action("Chaos Bolt",1,9),
        "Shadowfury": new Action("Shadowfury",1,10),

        //bar2



        //bar3
        "Soulstone": new Action("Soulstone",3,0),

        "Summon Imp": new Action("Summon Imp",3,4),
        "Summon Felhunter": new Action("Summon Felhunter",3,5),

    }
}

if (player.spec==="affliction") {
    actions = {
        //bar0
        "Summon Darkglare": new Action("Summon Darkglare",0,0),
        "Dark Soul: Misery": new Action("Dark Soul: Misery",0,1),

        "Command Demon": new Action("Command Demon",0,5),
        "Seed of Corruption": new Action("Seed of Corruption",0,6),
        "Unending Resolve": new Action("Unending Resolve",0, 8),

        //bar1
        "Agony": new Action("Agony",1,0),
        "Corruption": new Action("Corruption",1,1),
        "Unstable Affliction": new Action("Unstable Affliction",1,2),
        "Burning Rush": new Action("Burning Rush",1,3),

        "Shadow Bolt": new Action("Shadow Bolt",1,8),
        "Malefic Rapture": new Action("Malefic Rapture",1,9),
        "Shadowfury": new Action("Shadowfury",1,10),

        //bar2
        "Phantom Singularity": new Action("Phantom Singularity",2,0),
        "Siphon Life": new Action("Siphon Life",2,1),

        "Haunt": new Action("Haunt",2,7),

        //bar3
        "Soulstone": new Action("Soulstone",3,0),

        "Summon Imp": new Action("Summon Imp",3,4),
        "Summon Felhunter": new Action("Summon Felhunter",3,5),

    }
}

if (player.spec==="demonology") {
    actions = {
        //bar0
        "Summon Demonic Tyrant": new Action("Summon Demonic Tyrant",0,0),

        "Command Demon": new Action("Command Demon",0,5),
        "Implosion": new Action("Implosion",0,6),

        "Unending Resolve": new Action("Unending Resolve",0, 8),

        //bar1
        "Call Dreadstalkers": new Action("Call Dreadstalkers",1,0),
        "Demonbolt": new Action("Demonbolt",1,1),
        "Burning Rush": new Action("Burning Rush",1,3),

        "Shadow Bolt": new Action("Shadow Bolt",1,8),
        "Hand of Gul'dan": new Action("Hand of Gul'dan",1,9),
        "Shadowfury": new Action("Shadowfury",1,10),

        //bar2




        //bar3
        "Soulstone": new Action("Soulstone",3,0),

        "Summon Imp": new Action("Summon Imp",3,4),
        "Summon Felhunter": new Action("Summon Felhunter",3,5),

    }
}