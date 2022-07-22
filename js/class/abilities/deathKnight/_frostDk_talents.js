let _frostDk_talents = function(caster) {
    //1
    caster.abilities["Inexorable Assault"] = new InexorableAssault()
    caster.abilities["Icy Talons"] = new IcyTalons()
    caster.abilities["Cold Heart"] = new ColdHeart()

    //2
    caster.abilities["Runic Attenuation"] = new RunicAttenuation()
    caster.abilities["Murderous Efficiency"] = new MurderousEfficiency()
    caster.abilities["Horn of Winter"] = new HornofWinter()

    //3
    caster.abilities["Death's Reach"] = new DeathsReach()
    caster.abilities["Asphyxiate "] = new Asphyxiate2()
    caster.abilities["Blinding Sleet"] = new BlindingSleet()

    //4
    caster.abilities["Avalanche"] = new Avalanche()
    caster.abilities["Frozen Pulse"] = new FrozenPulse()
    caster.abilities["Frostscythe"] = new Frostscythe()

    //5
    caster.abilities["Permafrost"] = new Permafrost()
    caster.abilities["Wraith Walk"] = new WraithWalk()
    caster.abilities["Death Pact"] = new DeathPact()

    //6
    //caster.abilities["Gathering Storm"] = new GatheringStorm()
    //caster.abilities["Hypothermic Presence"] = new HypothermicPresence()
    //caster.abilities["Glacial Advance"] = new GlacialAdvance()

    //7
    //caster.abilities["Icecap"] = new Icecap()
    //caster.abilities["Obliteration"] = new Obliteration()
    //caster.abilities["Breath of Sindragosa"] = new BreathofSindragosa()


    caster.talents = [["Inexorable Assault","Icy Talons","Cold Heart"],
        ["Runic Attenuation","Murderous Efficiency","Horn of Winter"],
        ["Death's Reach","Asphyxiate ","Blinding Sleet"],
        ["Avalanche","Frozen Pulse","Frostscythe"],
        ["Permafrost","Wraith Walk","Death Pact"],
        ["Gathering Storm","Hypothermic Presence","Glacial Advance"],
        ["Icecap","Obliteration","Breath of Sindragosa"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class InexorableAssault extends Ability {
    constructor() {
        super("Inexorable Assault", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.214
        this.maxStacks = 5
        this.duration = 10

        this.timer1 = 0
        this.timer2 = 8
    }

    getTooltip() { //TODO: Frostscythe
        return "Gain Inexorable Assault every 8 sec, stacking up to 5 times. Obliterate and Frostscythe consume a stack to deal an additional "+spellPowerToNumber(this.spellPower)+" Frost damage."
    }

    run(caster) {
        if (this.talentSelect) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                this.timer1 = 0
                applyBuff(caster,caster,this,1,true)
            }
        }
    }

}
//------------------------------------------------
class IcyTalons extends Ability {
    constructor() {
        super("Icy Talons", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.maxStacks = 3
        this.duration = 6
        this.effect = [{name:"incAttackSpeed",val:0.05}]
    }

    getTooltip() {
        return "Your Runic Power spending abilities increase your melee attack speed by 5% for 6 sec, stacking up to 3 times."
    }

}
//------------------------------------------------
class ColdHeart extends Ability {
    constructor() {
        super("Cold Heart", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.maxStacks = 20
        this.duration = 10
        this.permanentBuff = true
        this.spellPower = 0.107
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Every 2 sec, gain a stack of Cold Heart, causing your next Chains of Ice to deal "+spellPowerToNumber(this.spellPower)+" Frost damage. Stacks up to 20 times."
    }

}
//------------------------------------------------------------------------------------------------ROW2
class RunicAttenuation extends Ability {
    constructor() {
        super("Runic Attenuation", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Auto attacks have a chance to generate 5 Runic Power."
    }

}
//------------------------------------------------
class MurderousEfficiency extends Ability {
    constructor() {
        super("Murderous Efficiency", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Consuming the Killing Machine effect has a 50% chance to grant you 1 Rune."
    }
}
//------------------------------------------------
class HornofWinter extends Ability {
    constructor() {
        super("Horn of Winter", 0, 1.5, 0, 45, false, false, false, "frost", 5, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Blow the Horn of Winter, gaining 2 Rune and generating 25 Runic Power."
    }
}
//------------------------------------------------------------------------------------------------ROW3
class DeathsReach extends Ability {
    constructor() {
        super("Death's Reach", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:Killing an enemy that yields experience or honor resets the cooldown of Death Grip.
        return "Increases the range of Death Grip by 10 yds."
    }

    setTalent(caster) {
        caster.abilities["Death Grip"].range += 10
    }
    unsetTalent(caster) {
        caster.abilities["Death Grip"].range -= 10
    }
}
//------------------------------------------------
class Asphyxiate2 extends Ability {
    constructor() {
        super("Asphyxiate ", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Lifts the enemy target off the ground, crushing their throat with dark energy and stunning them for 4 sec."
    }

    setTalent(caster) {
        caster.abilities["Asphyxiate"].talentSelect = true
    }
    unsetTalent(caster) {
        caster.abilities["Asphyxiate"].talentSelect = false
    }
}
//------------------------------------------------
class BlindingSleet extends Ability {
    constructor() {
        super("Blinding Sleet", 0, 1.5, 0, 60, false, false, false, "frost", 5, 1)
        this.talent = true
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//Targets in a cone in front of you are blinded, causing them to wander disoriented for 5 sec. Damage may cancel the effect.\n" +
            "\n" +
            "When Blinding Sleet ends, enemies are slowed by 50% for 6 sec."
    }

}
//------------------------------------------------------------------------------------------------ROW4
class Avalanche extends Ability {
    constructor() {
        super("Avalanche", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.214
    }

    getTooltip() {
        return "Casting Howling Blast with Rime active causes jagged icicles to fall on enemies nearby your target, dealing "+spellPowerToNumber(this.spellPower)+" Frost damage."
    }

}
//------------------------------------------------
class FrozenPulse extends Ability {
    constructor() {
        super("Frozen Pulse", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.04815
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//While you have fewer than 3 full Rune, your auto attacks radiate intense cold, inflicting (4.815% of Attack power) Frost damage on all nearby enemies."
    }

}
//------------------------------------------------
class Frostscythe extends Ability {
    constructor() {
        super("Frostscythe", -10, 1.5, 0, 0, false, false, false, "frost", 8, 1)
        this.talent = true
        this.spellPower = 0.1498
        this.secCost = 1
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//A sweeping attack that strikes all enemies in front of you for (14.98% of Attack power) Frost damage. This attack benefits from Killing Machine. Critical strikes with Frostscythe deal 4 times normal damage."
    }

}
//------------------------------------------------------------------------------------------------ROW5
class Permafrost extends Ability {
    constructor() {
        super("Permafrost", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.effect = [{name:"absorb",val:0}]
        this.duration = 10
    }

    getTooltip() {
        return "Your auto attack damage grants you an absorb shield equal to 100% of the damage dealt." //TODO:40% + NO RESET
    }



}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------