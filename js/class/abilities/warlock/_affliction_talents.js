let _affliction_talents = function(caster) {
    //1
    caster.abilities["Nightfall"] = new Nightfall()
    caster.abilities["Inevitable Demise"] = new InevitableDemise()
    caster.abilities["Drain Soul"] = new DrainSoul()

    //2
    caster.abilities["Writhe in Agony"] = new WritheinAgony()
    caster.abilities["Absolute Corruption"] = new AbsoluteCorruption()
    caster.abilities["Siphon Life"] = new SiphonLife()

    //3
    caster.abilities["Demon Skin"] = new DemonSkin()
    caster.abilities["Burning Rush"] = new BurningRush()
    caster.abilities["Dark Pact"] = new DarkPact()

    //4
    caster.abilities["Sow the Seeds"] = new SowtheSeeds()
    caster.abilities["Phantom Singularity"] = new PhantomSingularity()
    caster.abilities["Vile Taint"] = new VileTaint()

    //5
    caster.abilities["Darkfury"] = new Darkfury()
    caster.abilities["Mortal Coil"] = new MortalCoil()
    caster.abilities["Howl of Terror"] = new HowlofTerror()

    //6
    //caster.abilities["Shadow Embrace"] = new ShadowEmbrace()
    //caster.abilities["Haunt"] = new Haunt()
    caster.abilities["Grimoire of Sacrifice"] = new GrimoireofSacrifice()

    //7
    caster.abilities["Soul Conduit"] = new SoulConduit()
    //caster.abilities["Creeping Death"] = new CreepingDeath()
    //caster.abilities["Dark Soul: Misery"] = new DarkSoulMisery()

    caster.talents = [["Nightfall","Inevitable Demise","Drain Soul"],
        ["Writhe in Agony","Absolute Corruption","Siphon Life"],
        ["Demon Skin","Burning Rush","Dark Pact"],
        ["Sow the Seeds","Phantom Singularity","Vile Taint"],
        ["Darkfury","Mortal Coil","Howl of Terror"],
        ["Shadow Embrace","Haunt","Grimoire of Sacrifice"],
        ["Soul Conduit","Creeping Death","Dark Soul: Misery"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Nightfall extends Ability {
    constructor() {
        super("Nightfall", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Corruption damage has a chance to cause your next Shadow Bolt to be instant and deal 50% increased damage."
    }
}
//------------------------------------------------
class InevitableDemise extends Ability {
    constructor() {
        super("Inevitable Demise", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Damaging an enemy with Agony increases the damage of your next Drain Life by 15%. This effect stacks up to 50 times."
    }
}
//------------------------------------------------
class DrainSoul extends Ability {
    constructor() {
        super("Drain Soul", 1, 1.5, 5, 0, true, false, false, "shadow", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO: Replace Shadow Bolt
        return "//NOT IMPLEMENTED//Drains the target's soul, causing (140.625% of Spell power) Shadow damage over 5 sec.\n" +
            "\n" +
            "Damage is increased by 100% against enemies below 20% health.\n" +
            "\n" +
            "Generates 1 Soul Shard if the target dies during this effect."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class WritheinAgony extends Ability {
    constructor() {
        super("Writhe in Agony", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Agony's damage starts at 4 stacks and may now ramp up to 18 stacks."
    }
    setTalent(caster) {
        caster.abilities["Agony"].stacks = 4
        caster.abilities["Agony"].maxStacks = 18
    }

    unsetTalent(caster) {
        caster.abilities["Agony"].stacks = 2
        caster.abilities["Agony"].maxStacks = 10
    }
}
//------------------------------------------------
class AbsoluteCorruption extends Ability {
    constructor() {
        super("Absolute Corruption", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Corruption is now permanent and deals 15% increased damage."
    }

    setTalent(caster) {
        caster.abilities["Corruption"].spellPowerDot *= 1.15
        caster.abilities["Corruption"].spellPower *= 1.15
        caster.abilities["Corruption"].permanentBuff = true
    }

    unsetTalent(caster) {
        caster.abilities["Corruption"].spellPowerDot /= 1.15
        caster.abilities["Corruption"].spellPower /= 1.15
        caster.abilities["Corruption"].permanentBuff = false
    }
}
//------------------------------------------------
class SiphonLife extends Ability {
    constructor() {
        super("Siphon Life", 1, 1.5, 0, 0, false, false, false, "shadow", 40, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.75*1.14
        this.duration = 15
        this.timer1 = 0
        this.timer2 = 1
    }

    getTooltip() {
        return "Siphons the target's life essence, dealing "+spellPowerHotToNumber(this.spellPower)+" Shadow damage over 15 sec and healing you for 30% of the damage done."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            }
            if (done) {

                applyDot(caster, caster.castTarget, this)

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(target, buff, id) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            doHeal(buff.caster,buff.caster,this,undefined,this.spellPower/this.duration*0.3)
        }
    }

}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class SowtheSeeds extends Ability {
    constructor() {
        super("Sow the Seeds", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Seed of Corruption now embeds demon seeds into 2 additional nearby enemies."
    }
}
//------------------------------------------------
class PhantomSingularity extends Ability {
    constructor() {
        super("Phantom Singularity", 1, 1.5, 0, 45, false, false, false, "shadow", 40, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1.8*1.14
        this.duration = 16
        this.timer1 = 0
        this.timer2 = 1
    }

    getTooltip() {
        return "Places a phantom singularity above the target, which consumes the life of all enemies within 15 yards, dealing "+spellPowerHotToNumber(this.spellPower)+" damage over 16 sec, healing you for 25% of the damage done."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            }
            if (done) {

                applyDot(caster, caster.castTarget, this)

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(target, buff, id) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            doHeal(buff.caster,buff.caster,this,undefined,this.spellPower/this.duration*0.25)
        }
    }

}
//------------------------------------------------
class VileTaint extends Ability {
    constructor() {
        super("Vile Taint", 0, 1.5, 1.5, 20, false, true, false, "shadow", 40, 1)
        this.talent = true
        this.secCost = 1
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Unleashes a vile explosion at the target location, dealing (93.75% of Spell power) Shadow damage over 10 sec to all enemies within 10 yds and reducing their movement speed by 30%."
    }
}
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------