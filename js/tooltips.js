tooltips = {

    getTooltip:function(ability) {
        if (ability!==undefined && this.text[ability.name]!==undefined) {
            let tooltipArray = this.text[ability.name]
            let tooltip = ""

            for (let i = 0; i<tooltipArray.length; i++) {
                if (tooltipArray[i]==="&SPELLPOWER") {
                    tooltip += this.spellPowerToNumber(ability.spellPower)
                } else if (tooltipArray[i]==="&SPELLPOWERHOT") {
                    tooltip += this.spellPowerHotToNumber(ability.spellPower)
                } else if (tooltipArray[i]==="&SPELLPOWERHOT2") {
                    tooltip += this.spellPowerHotToNumber(ability.values.hotSpellPower)
                } else if (tooltipArray[i]==="&SPELLPOWERX8") {
                    tooltip += this.spellPowerToNumber(ability.spellPower*8)
                } else if (tooltipArray[i]==="&SPELLPOWERREM") {
                    tooltip += this.spellPowerToNumber(ability.effects[1].val)
                } else {
                    tooltip += tooltipArray[i]
                }
            }
            return tooltip
        } else {
            return ""
        }
    },

    spellPowerToNumber:function(val) {
        return ((player.stats.primary * val) * (1 + (player.stats.vers / 100))).toFixed(0)
    },
    spellPowerHotToNumber:function(val) {
        return ((player.stats.primary * val) * (1 + (player.stats.vers / 100))* (1 + (player.stats.haste / 100))).toFixed(0)
    },
    text: {
        //Mage

        //Monk
        "Blackout Kick": ["Kick with a blast of Chi energy, dealing ","&SPELLPOWER"," Physical damage"],
        "Tiger Palm": ["Strike with the palm of your hand, dealing ","&SPELLPOWER"," Physical damage"],
        "Rising Sun Kick":["Kick upwards, dealing ","&SPELLPOWER"," Physical damage"],
        "Fortifying Brew":["Turns your skin to stone for 15 sec, increasing your current and maximum health by 20% and reducing all damage you take by 20%."],
        "Mana Tea":["Reduces the mana cost of your spells by 50% for 10 sec."],
        "Provoke":["Taunts the target to attack you and causes them to move toward you at 50% increased speed"],
        "Renewing Mist":["Surrounds the target with healing mists, restoring ","&SPELLPOWERHOT"," health over 20 sec. If Renewing Mist heals a target past maximum health, it will travel to another injured ally within 20 yds."],
        "Revival":["Heals all party and raid members within 40 yards for ","&SPELLPOWER"," and clears them of all harmful Magical, Poison, and Disease effects. Causes a Gust of Mists on all targets."],
        "Roll":["Roll a short distance."],
        "Soothing Mist":["Heals the target for ","&SPELLPOWERX8","  over 8 sec.  While channeling, Enveloping Mist and Vivify may be cast instantly on the target"],
        "Tiger's Lust":["Increases a friendly target's movement speed by 70% for 6 sec and removes all roots and snares."],
        "Vivify":["Causes a surge of invigorating mists, healing the target for ","&SPELLPOWER"," and all allies with your Renewing Mist active for ","&SPELLPOWERREM",],
        "Enveloping Mist": ["Wraps the target in healing mists, healing for ","&SPELLPOWERHOT"," over 6 sec and increasing healing received from your other spells by 30%"],
        "Essence Font":["Unleashes a rapid twirl of healing bolts at up to 6 allies within 30 yds, every 1.0 sec for 3 sec. Each bolt heals a target for ","&SPELLPOWER"," plus an additional ","&SPELLPOWERHOT2"," over 8 sec. Gust of Mists will heal affected targets twice"],
        //Rogue

        //Shaman
        

        "":[],
    }

}


