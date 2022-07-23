let _unholy_talents = function(caster) {
    //1
    caster.abilities["Infected Claws"] = new InfectedClaws()
    caster.abilities["All Will Serve"] = new AllWillServe()
    caster.abilities["Clawing Shadows"] = new ClawingShadows()

    //2
    caster.abilities["Bursting Sores"] = new BurstingSores()
    caster.abilities["Ebon Fever"] = new EbonFever()
    caster.abilities["Unholy Blight"] = new UnholyBlight()
    caster.abilities["Unholy Blight Dot"] = new UnholyBlightDot()


    //3
    caster.abilities["Grip of the Dead"] = new GripoftheDead()
    caster.abilities["Death's Reach"] = new DeathsReach()
    caster.abilities["Asphyxiate "] = new Asphyxiate2()

    //4
    caster.abilities["Pestilent Pustules"] = new PestilentPustules()
    caster.abilities["Harbinger of Doom"] = new HarbingerofDoom()
    caster.abilities["Soul Reaper"] = new SoulReaper()

    //5
    caster.abilities["Spell Eater"] = new SpellEater()
    caster.abilities["Wraith Walk"] = new WraithWalk()
    caster.abilities["Death Pact"] = new DeathPact()

    //6
    caster.abilities["Pestilence"] = new Pestilence()
    caster.abilities["Unholy Pact"] = new UnholyPact()
    caster.abilities["Defile"] = new Defile()

    //7
    caster.abilities["Army of the Damned"] = new ArmyoftheDamned()
    caster.abilities["Summon Gargoyle"] = new SummonGargoyle()
    caster.abilities["Unholy Assault"] = new UnholyAssault()



    caster.talents = [["Infected Claws","All Will Serve","Clawing Shadows"],
        ["Bursting Sores","Ebon Fever","Unholy Blight"],
        ["Grip of the Dead","Death's Reach","Asphyxiate"],
        ["Pestilent Pustules","Harbinger of Doom","Soul Reaper"],
        ["Spell Eater","Wraith Walk","Death Pact"],
        ["Pestilence","Unholy Pact","Defile"],
        ["Army of the Damned","Summon Gargoyle","Unholy Assault"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class InfectedClaws extends Ability {
    constructor() {
        super("Infected Claws", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Your ghoul's Claw attack has a 30% chance to cause a Festering Wound on the target."
    }

}
//------------------------------------------------
class AllWillServe extends Ability {
    constructor() {
        super("All Will Serve", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.petId = false
        this.petData = {
            name:"Risen Skulker",
            abilities:{"Skulker Shot":new SkulkerShot()},
            color:"#eae4d2",
            size:4,
            do:[{name:"cast",ability:"Skulker Shot"}],
            autoAttackDamage:1
        }
        this.petDuration = 999
    }

    getTooltip() {
        return "Your Raise Dead spell summons an additional skeletal minion."
    }

    spawnPet(caster) {
        if (caster.pets[this.petId]!==undefined) {
            if (caster.pets[this.petId] && caster.pets[this.petId].name==="Risen Skulker") {
                caster.pets[this.petId] = undefined
            }
        }
        this.petId = spawnPet(caster,"guardian",this.petData.name,caster.x+10,caster.y+10,this)
    }

}
//------------------------------------------------
class ClawingShadows extends Ability {
    constructor() {
        super("Clawing Shadows", -10, 1.5, 0, 0, false, false, false, "shadow", 30, 1)
        this.talent = true
        this.secCost = 1
        this.spellPower = 0.46
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Deals (46% of Attack power) Shadow damage and causes 1 Festering Wound to burst."
    }

}
//------------------------------------------------------------------------------------------------ROW2
class BurstingSores extends Ability {
    constructor() {
        super("Bursting Sores", 0, 0, 0, 0, false, false, false, "shadow", 0, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.2
    }

    getTooltip() {
        return "Bursting a Festering Wound deals 25% more damage, and deals "+spellPowerToNumber(this.spellPower)+" Shadow damage to all nearby enemies."
    }

    setTalent(caster) {
        caster.abilities["Festering Wound"].spellPower *= 1.25
    }
    unsetTalent(caster) {
        caster.abilities["Festering Wound"].spellPower /= 1.25
    }
}
//------------------------------------------------
class EbonFever extends Ability {
    constructor() {
        super("Ebon Fever", 0, 0, 0, 0, false, false, false, "shadow", 0, 1)
        this.talent = true
    }

    getTooltip() {
        return "Virulent Plague deals 15% more damage over time in half the duration."
    }

    setTalent(caster) {
        caster.abilities["Virulent Plague"].spellPower *= 1.15
        caster.abilities["Virulent Plague"].duration /= 2
    }
    unsetTalent(caster) {
        caster.abilities["Virulent Plague"].spellPower /= 1.15
        caster.abilities["Virulent Plague"].duration *= 2
    }
}
//------------------------------------------------
class UnholyBlight extends Ability {
    constructor() {
        super("Unholy Blight", -10, 1.5, 0, 45, false, false, false, "shadow", 8, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 6
        this.secCost = 1
    }

    getTooltip() {
        return "Surrounds yourself with a vile swarm of insects for 6 sec, stinging all nearby enemies and infecting them with Virulent Plague" +
            " and an unholy disease that deals "+spellPowerHotToNumber(0.85)+" damage over 14 sec.<br>" +
            "<br>" +
            "Your minions deal 10% increased damage to enemies infected by Unholy Blight."
    }

    getBuffTooltip(caster, target, buff) {
        return "Surrounded by a vile swarm of insects, infecting enemies within 10 yds with Virulent Plauge and an unholy disease that increases the damage your minions deal to them."
    }

    runBuff(caster, buff, id = 0) {
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                applyDot(caster, enemies[i],caster.abilities["Unholy Blight Dot"])
                applyDot(caster, enemies[i], caster.abilities["Virulent Plague"])
            }
        }
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }


}
class UnholyBlightDot extends Ability {
    constructor() {
        super("Unholy Blight Dot", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.hiddenSB = true
        this.duration = 14
        this.spellPower = 0.85
    }
}

//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class PestilentPustules extends Ability {
    constructor() {
        super("Pestilent Pustules", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Bursting a Festering Wound has a 10% chance to grant you Runic Corruption."
    }
}
//------------------------------------------------
class HarbingerofDoom extends Ability {
    constructor() {
        super("Harbinger of Doom", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Sudden Doom triggers 15% more often and can accumulate up to 2 charges."
    }
}
//------------------------------------------------Soul Reaper
class SoulReaper extends Ability {
    constructor() {
        super("Soul Reaper", -10, 1.5, 0, 6, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.secCost = 1
        this.duration = 5
        this.spellPower = 0.34
        this.spellPowerExplode = 1.56
        this.caster = {}
    }

    getTooltip() {
        return "Strike an enemy for "+spellPowerToNumber(this.spellPower)+" Shadow damage and afflict the enemy with Soul Reaper.<br>" +
            "<br>" +
            "After 5 sec, if the target is below 35% health this effect will explode dealing an additional "+spellPowerToNumber(this.spellPower)+" Shadow damage to the target."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {

                this.caster = caster
                doDamage(caster,caster.castTarget,this)
                applyDebuff(caster, caster.castTarget, this)

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost, this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(target) {
        if (target.health/target.maxHealth<0.35) {
            doDamage(this.caster,target,this,undefined,this.spellPowerExplode)
        }
    }
}
//------------------------------------------------------------------------------------------------ROW5
class SpellEater extends Ability {
    constructor() {
        super("Spell Eater", 0, 0, 0, 0, false, false, false, "shadow", 0, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Anti-Magic Shell absorbs 30% more magic damage and lasts 5 sec longer."
    }

    setTalent(caster) {
        caster.abilities["Anti-Magic Shell"].duration += 5
    }
    unsetTalent(caster) {
        caster.abilities["Anti-Magic Shell"].duration -= 5
    }
}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class Pestilence extends Ability {
    constructor() {
        super("Pestilence", 0, 0, 0, 0, false, false, false, "shadow", 0, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {  // Death and Decay damage has a 10% chance to apply a Festering Wound to the enemy.
        return "Death and Decay damage increased by 100%."
    }

    setTalent(caster) {
        caster.abilities["Death and Decay"].spellPower *= 2
    }
    unsetTalent(caster) {
        caster.abilities["Death and Decay"].spellPower /= 2
    }
}
//------------------------------------------------
class UnholyPact extends Ability {
    constructor() {
        super("Unholy Pact", 0, 0, 0, 0, false, false, false, "shadow", 0, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"increaseStat",stat:"primary",val:7,percent:true}]
        this.duration = 15
    }

    getTooltip() {
        return "While Dark Transformation is active, your strength is increased by 7%."
    }
    //TODO:Dark Transformation creates an unholy pact between you and your pet, igniting flaming chains that deal [(15.75% of Attack power) * 15] Shadow damage over 15 sec to enemies between you and your pet.
    // While active, your strength is increased by 5%.
    getBuffTooltip(caster, target, buff) {
        return "Strength is increased by 7%."
    }

}


//------------------------------------------------
class Defile extends Ability {
    constructor() {
        super("Defile", -10, 1.5, 0, 20, false, false, false, "shadow", 30, 1)
        this.talent = true
        this.secCost = 1
    }

    getTooltip() { //TODO: REPLACE "Death and Decay"
        return "//NOT IMPLEMENTED//Defile the targeted ground, dealing [((5% of Attack power) * (11) / 1)] Shadow damage to all enemies over 10 sec.\n" +
            "\n" +
            "While you remain within your Defile, your\n" +
            "Clawing Shadows/\n" +
            "\n" +
            "Scourge Strike will hit 4 enemies near the target.\n" +
            "\n" +
            "If any enemies are standing in the Defile, it grows in size and deals increasing damage every sec."
    }

}
//------------------------------------------------------------------------------------------------ROW7
class ArmyoftheDamned extends Ability {
    constructor() {
        super("Army of the Damned", 0, 0, 0, 0, false, false, false, "shadow", 0, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Death Coil and Epidemic reduce the cooldown of Apocalypse by 1 sec and Army of the Dead by 5 sec.<br>" +
            "<br>" +
            "//NOT IMPLEMENTED//Apocalypse and Army of the Dead also summon a Magus of the Dead who hurls Frostbolts and Shadow Bolts at your foes." //TODO:
    }
}
//------------------------------------------------
class SummonGargoyle extends Ability {
    constructor() {
        super("Summon Gargoyle", 0, 1.5, 0, 180, false, false, false, "shadow", 30, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Summon a Gargoyle into the area to bombard the target for 30 sec.\n" +
            "\n" +
            "The Gargoyle gains 1% increased damage for every 2 Runic Power you spend."
    }

}
//------------------------------------------------
class UnholyAssault extends Ability {
    constructor() {
        super("Unholy Assault", 0, 1.5, 0, 75, false, false, false, "shadow", 30, 1)
        this.talent = true
        this.duration = 12
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Strike your target dealing (127.6% of Attack power) Shadow damage, infecting the target with 4 Festering Wounds" +
            " and sending you into an Unholy Frenzy increasing haste by 20% for 12 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Haste increased by 20%."
    }

}