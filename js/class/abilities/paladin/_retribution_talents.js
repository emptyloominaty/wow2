let _retribution_talents = function(caster) {
    //1
    caster.abilities["Zeal"] = new Zeal()
    caster.abilities["Righteous Verdict"] = new RighteousVerdict()
    caster.abilities["Execution Sentence"] = new ExecutionSentence()

    //2
    caster.abilities["Fires of Justice"] = new FiresofJustice()
    caster.abilities["Blade of Wrath"] = new BladeofWrath()
    caster.abilities["Empyrean Power"] = new EmpyreanPower()

    //3
    caster.abilities["Fist of Justice"] = new FistofJustice()
    caster.abilities["Repentance"] = new Repentance()
    caster.abilities["Blinding Light"] = new BlindingLight()

    //4
    caster.abilities["Unbreakable Spirit"] = new UnbreakableSpirit()
    caster.abilities["Cavalier"] = new Cavalier()
    caster.abilities["Eye for an Eye"] = new EyeforanEye()

    //5
    caster.abilities["Divine Purpose"] = new DivinePurpose() //TODO:  ExecutionSentence, JusticarsVengeance
    caster.abilities["Holy Avenger"] = new HolyAvenger()
    caster.abilities["Seraphim"] = new Seraphim()

    //6
    caster.abilities["Selfless Healer"] = new SelflessHealer()
    caster.abilities["Justicar's Vengeance"] = new JusticarsVengeance()
    caster.abilities["Healing Hands"] = new HealingHands()

    //7
    caster.abilities["Sanctified Wrath"] = new SanctifiedWrath()
    caster.abilities["Crusade"] = new Crusade()
    caster.abilities["Final Reckoning"] = new FinalReckoning()


    caster.talents = [["Zeal","Righteous Verdict","Execution Sentence"],
        ["Fires of Justice","Blade of Wrath","Empyrean Power"],
        ["Fist of Justice","Repentance","Blinding Light"],
        ["Unbreakable Spirit","Cavalier","Eye for an Eye"],
        ["Divine Purpose","Holy Avenger","Seraphim"],
        ["Selfless Healer","Justicar's Vengeance","Healing Hands"],
        ["Sanctified Wrath","Crusade","Final Reckoning"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Zeal extends Ability {
    constructor() {
        super("Zeal", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.085
        this.duration = 20
        this.maxStacks = 9
    }

    getTooltip() {
        return "Judgment empowers you with holy zeal, causing your next 3 auto attacks to occur 30% faster and deal an additional "+spellPowerToNumber(this.spellPower)+" Holy damage."
    }
}
//------------------------------------------------
class RighteousVerdict extends Ability {
    constructor() {
        super("Righteous Verdict", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
    }

    getTooltip() {
        return "Templar's Verdict increases the damage of your next Templar's Verdict by 15% for 6 sec."
    }
}
//------------------------------------------------
class ExecutionSentence extends Ability {
    constructor() {
        super("Execution Sentence", 0, 1.5, 0, 60, false, false, false, "holy", 30, 1)

        this.talent = true
        this.secCost = 3
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//A hammer slowly falls from the sky upon the target. After 8 sec, they suffer [(250% of Attack power) * 1] Holy damage, plus 20% of damage taken from your abilities in that time."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class FiresofJustice extends Ability {
    constructor() {
        super("Fires of Justice", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Crusader Strike by 15% and grants it a 15% chance to generate 1 Holy Power."
    }

    setTalent(caster) {
        caster.abilities["Crusader Strike"].cd *= 0.85
        caster.abilities["Crusader Strike"].maxCd *= 0.85
    }

    unsetTalent(caster) {
        caster.abilities["Crusader Strike"].cd /= 0.85
        caster.abilities["Crusader Strike"].maxCd /= 0.85
    }
}
//------------------------------------------------
class BladeofWrath extends Ability {
    constructor() {
        super("Blade of Wrath", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Art of War resets the cooldown of Blade of Justice 100% more often and increases its damage by 25%."
    }

    setTalent(caster) {
        caster.abilities["Blade of Justice"].spellPower *= 1.25
    }

    unsetTalent(caster) {
        caster.abilities["Blade of Justice"].cd /= 1.25
    }

}
//------------------------------------------------
class EmpyreanPower extends Ability {
    constructor() {
        super("Empyrean Power", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Crusader Strike has a 15% chance to make your next Divine Storm free and deal 25% additional damage."
    }
}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
class EyeforanEye extends Ability {
    constructor() {
        super("Eye for an Eye", 0, 1.5, 0, 60, false, false, false, "physical", 10, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Surround yourself with a bladed bulwark, reducing Physical damage taken by 35% and dealing (35.3028% of Attack power)% Physical damage to any melee attackers for 10 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Counterattacking all melee attacks."
    }
}
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class SelflessHealer extends Ability {
    constructor() {
        super("Selfless Healer", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.maxStacks = 4
        this.duration = 15
    }

    getTooltip() {
        return "Your Holy Power spending abilities reduce the cast time of your next Flash of Light by 25%, and increase its healing done by 10%. Stacks up to 4 times."
    }

    getBuffTooltip(caster, target, buff) {
        return "Flash of Light cast time reduced by "+((buff.stacks*25).toFixed(0))+"%." +
            "Flash of Light heals for "+((buff.stacks*10).toFixed(0))+"% more."
    }
}
//------------------------------------------------
class JusticarsVengeance extends Ability {
    constructor() {
        super("Justicar's Vengeance", 0, 1.5, 0, 0, false, false, false, "holy", 5, 1)
        this.talent = true
        this.secCost = 5
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Focuses Holy energy to deliver a powerful weapon strike that deals (150% of Attack power) Holy damage, and restores health equal to the damage done.<br>" +
            "<br>" +
            "Damage is increased by 50% when used against a stunned target."
    }

}
//------------------------------------------------
class HealingHands extends Ability {
    constructor() {
        super("Healing Hands", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "The cooldown of Lay on Hands is reduced by 50%."
    }

    setTalent(caster) {
        caster.abilities["Lay on Hands"].cd /= 2
        caster.abilities["Lay on Hands"].maxCd /= 2
    }

    unsetTalent(caster) {
        caster.abilities["Lay on Hands"].cd *= 2
        caster.abilities["Lay on Hands"].maxCd *= 2
    }
}
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
class Crusade extends Ability {
    constructor() {
        super("Crusade", 0, 0, 0, 120, false, false, false, "holy", 5, 1)
        this.talent = true
        this.duration = 25
        this.maxStacks = 10
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Call upon the Light and begin a crusade, increasing your damage done and haste by 3% for 25 sec.<br>" +
            "<br>" +
            "Each Holy Power spent during Crusade increases damage done and haste by an additional 3%.<br>" +
            "<br>" +
            "Maximum 10 stacks."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage done and haste increased by "+buff.stacks*3+"%."
    }

}
//------------------------------------------------
class FinalReckoning extends Ability {
    constructor() {
        super("Final Reckoning", 0, 1.5, 0, 60, false, false, false, "holy", 30, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 2.85
        this.spellPower2 = 0.7 //[5 + Haste] procs per minute
    }

    getTooltip() { //TODO: area?
        return "Call down a blast of heavenly energy, dealing (285% of Attack power) Holy damage to all targets in the target area.<br>" +
            "<br>" +
            "Passive: While off cooldown, your attacks have a high chance to call down a bolt that deals (70% of Attack power) Holy damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true)) {
                    doDamage(caster, enemies[i], this)
                }
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setGcd(caster)

            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}