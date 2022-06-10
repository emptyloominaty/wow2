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
                } else if (tooltipArray[i]==="&SPELLPOWERDOT") {
                    tooltip += this.spellPowerHotToNumber(ability.spellPower)
                } else if (tooltipArray[i]==="&SPELLPOWERHOT2") {
                    tooltip += this.spellPowerHotToNumber(ability.values.hotSpellPower)
                } else if (tooltipArray[i]==="&SPELLPOWERDOT2") {
                    tooltip += this.spellPowerHotToNumber(ability.values.dotSpellPower) //TODO
                } else if (tooltipArray[i]==="&SPELLPOWERX2") {
                    tooltip += this.spellPowerToNumber(ability.spellPower*2)
                } else if (tooltipArray[i]==="&SPELLPOWERX3") {
                    tooltip += this.spellPowerToNumber(ability.spellPower*3)
                } else if (tooltipArray[i]==="&SPELLPOWERX4") {
                    tooltip += this.spellPowerToNumber(ability.spellPower*4)
                } else if (tooltipArray[i]==="&SPELLPOWERX5") {
                    tooltip += this.spellPowerToNumber(ability.spellPower*5)
                } else if (tooltipArray[i]==="&SPELLPOWERDOTX2") {
                    tooltip += this.spellPowerHotToNumber(ability.spellPower*2)
                } else if (tooltipArray[i]==="&SPELLPOWERDOTX3") {
                    tooltip += this.spellPowerHotToNumber(ability.spellPower*3)
                } else if (tooltipArray[i]==="&SPELLPOWERDOTX4") {
                    tooltip += this.spellPowerHotToNumber(ability.spellPower*4)
                } else if (tooltipArray[i]==="&SPELLPOWERDOTX5") {
                    tooltip += this.spellPowerHotToNumber(ability.spellPower*5)
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
        //Druid
        "Moonfire":["A quick beam of lunar light burns the enemy for ","&SPELLPOWER"," Arcane damage and then an additional  ","&SPELLPOWERDOT2"," Arcane damage over 16 sec."],
        "Regrowth":["Heals a friendly target for ","&SPELLPOWER"," and another ","&SPELLPOWERHOT2"," over 12 sec. Initial heal has a 40% increased chance for a critical effect if the target is already affected by Regrowth."],
        "Rejuvenation":["Heals the target for ","&SPELLPOWERHOT"," over 15 sec."],
        "Sunfire":["A quick beam of solar light burns the enemy for ","&SPELLPOWER"," Nature damage and then an additional  ","&SPELLPOWERDOT2"," Nature damage over 16 sec."],
        "Wild Growth":["Heals up to 6 injured allies within 30 yards of the target for ","&SPELLPOWERHOT"," over 7 sec. "],
        "Wrath":["Hurl a ball of energy at the target, dealing ","&SPELLPOWER"," Nature damage."],

        //Mage
        "Arcane Barrage":[ "Launches bolts of arcane energy at the enemy target, causing ","&SPELLPOWER"," Arcane damage. For each Arcane Charge, deals 30% additional damage"],
        "Arcane Blast":["Blasts the target with energy, dealing ","&SPELLPOWER"," Arcane damage. Damage increased by 60% per Arcane Charge. Mana cost increased by 100% per Arcane Charge. Generates 1 Arcane Charge"],

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
        "Deadly Poison":["Coats your weapons with a Lethal Poison that lasts for 1 hour. Each strike has a 50% chance to poison the enemy for ","&SPELLPOWERDOT2"," Nature damage over 12 sec. Subsequent poison applications will instantly deal ","&SPELLPOWER"," Nature damage."],
        "Envenom":["Finishing move that drives your poisoned blades in deep, dealing instant Nature damage and increasing your poison application chance by 30%. Damage and duration increased per combo point. <br> 1 point:", "&SPELLPOWER","damage <br>", "2 points:","&SPELLPOWERX2","damage <br>", "3 points:","&SPELLPOWERX3","damage <br>", "4 points:","&SPELLPOWERX4","damage <br>", "5 points:","&SPELLPOWERX5","damage <br>"],
        "Garrote":["Garrote the enemy, causing (108% of Attack power) ","&SPELLPOWERDOT"," Bleed damage over 18 sec. Silences the target for 3 sec when used from Stealth"],
        "Mutilate":["Attack with both weapons, dealing a total of  ","&SPELLPOWER"," Physical damage."],
        "Rupture":["Finishing move that tears open the target, dealing Bleed damage over time. Lasts longer per combo point. <br> 1 point:", "&SPELLPOWER","damage over 8 seconds <br>", "2 points:","&SPELLPOWERX2","damage over 12 seconds <br>", "3 points:","&SPELLPOWERX3","damage over 16 seconds <br>", "4 points:","&SPELLPOWERX4","damage over 20 seconds <br>", "5 points:","&SPELLPOWERX5","damage over 24 seconds <br>"],
        "Slice And Dice":["Finishing move that consumes combo points to increase attack speed by 50%. Lasts longer per combo point. <br>1 point  : 12 seconds <br>2 points: 18 seconds <br>3 points: 24 seconds <br>4 points: 30 seconds <br> 5 points: 36 seconds"],

        //Shaman
        "Flame Shock":["Sears the target with fire, causing ","&SPELLPOWER"," Fire damage and then an additional ","&SPELLPOWERDOT2"," Fire damage over 18 sec."],
        "Ghost Wolf":["Turn into a Ghost Wolf, increasing movement speed by 30% and preventing movement speed from being reduced below 100%."],
        "Healing Rain":["Blanket the target area in healing rains, restoring ","&SPELLPOWERHOT"," health to up to 6 allies over 10 sec."],
        "Healing Surge":["A quick surge of healing energy that restores ","&SPELLPOWER"," of a friendly target's health."],
        "Healing Tide Totem":["Summons a totem at your feet for 12 sec, which pulses every 2 sec, healing all party or raid members within 40 yards for ","&SPELLPOWERHOT"," total."],
        "Lava Burst":["Hurls molten lava at the target, dealing ","&SPELLPOWER"," Fire damage. Lava Burst will always critically strike if the target is affected by Flame Shock"],
        "Lightning Bolt":["Hurls a bolt of lightning at the target, dealing ","&SPELLPOWER","  Nature damage."],
        "Riptide":["Restorative waters wash over a friendly target, healing them for ","&SPELLPOWER","and an additional ","&SPELLPOWERHOT2","over 18 sec."],

        "":[],
    }

}


