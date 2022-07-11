let _balance_talents = function(caster) {
    //1
    caster.abilities["Nature's Balance"] = new NaturesBalance()
    caster.abilities["Warrior of Elune"] = new WarriorofElune()
    caster.abilities["Force of Nature"] = new ForceofNature()

    //2
    caster.abilities["Tiger Dash"] = new TigerDash()
    caster.abilities["Renewal"] = new Renewal()
    caster.abilities["Wild Charge"] = new WildCharge()

    //3
    caster.abilities["Feral Affinity"] = new FeralAffinity()
    caster.abilities["Guardian Affinity"] = new GuardianAffinity()
    caster.abilities["Restoration Affinity"] = new RestorationAffinity()

    //4
    caster.abilities["Mighty Bash"] = new MightyBash()
    caster.abilities["Mass Entanglement"] = new MassEntanglement()
    caster.abilities["Heart of the Wild"] = new HeartoftheWild()

    //5
    caster.abilities["Soul of the Forest "] = new SouloftheForestBalance()
    caster.abilities["Starlord"] = new Starlord()
    caster.abilities["Incarnation: Chosen of Elune"] = new IncarnationChosenofElune()

    //6
    caster.abilities["Twin Moons"] = new TwinMoons()
    caster.abilities["Stellar Drift"] = new StellarDrift()
    caster.abilities["Stellar Flare"] = new StellarFlare()

    //7
    //caster.abilities["Solstice"] = new Solstice()
    //caster.abilities["Fury of Elune"] = new FuryofElune()
    //caster.abilities["New Moon"] = new NewMoon()

    caster.talents = [["Nature's Balance","Warrior of Elune","Force of Nature"],
        ["Tiger Dash","Renewal","Wild Charge"],
        ["Feral Affinity","Guardian Affinity","Restoration Affinity"],
        ["Mighty Bash","Mass Entanglement","Heart of the Wild"],
        ["Soul of the Forest ","Starlord","Incarnation: Chosen of Elune"],
        ["Twin Moons","Stellar Drift","Stellar Flare"],
        ["Solstice","Fury of Elune","New Moon"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class NaturesBalance extends Ability {
    constructor() {
        super("Nature's Balance", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.permanentBuff = true
        this.duration = 10
    }

    getTooltip() {
        return "While in combat you generate 1 Astral Power every 2 sec.<br>" +
            "<br>" +
            "While out of combat your Astral Power rebalances to 50 instead of depleting to empty." //TODO: depleting to empty
    }

    getBuffTooltip(caster, target, buff) {
        return "Grants 1 Astral Power every 2 sec while in combat or while below 50 Astral Power."
    }

    setTalent(caster) {
        caster.energy = 50
        applyBuff(caster,caster,this)
    }

    unsetTalent(caster) {
        checkBuff(caster,caster,"Nature's Balance",true)
    }

    runBuff(caster, buff, id = 0) {
        if (inCombat || caster.energy<50) {
            caster.energy += 0.5 / fps
        }
    }
}
//------------------------------------------------
class WarriorofElune extends Ability {
    constructor() {
        let name = "Warrior of Elune"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.maxStacks = 3
        this.duration = 30

        //TODO:The cooldown doesn't actually start until you use the charges.
    }

    getTooltip() {
        return "Your next 3 Starfires are instant cast and generate 40% increased Astral Power."
    }

    getBuffTooltip(caster, target, buff) {
        return "Starfire is instant cast and generates 40% increased Astral Power."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this,3,true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
//------------------------------------------------
class ForceofNature extends Ability {
    constructor() {
        super("Force of Nature", 0, 1.5, 0, 60, false, false, false, "nature", 40, 1)
        this.talent = true
        this.duration = 10
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Summons a stand of 3 Treants for 10 sec which immediately taunt and attack enemies in the targeted area.<br>" +
            "<br>" +
            "Generates 20 Astral Power."
    }

}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
class RestorationAffinity extends Ability {
    constructor() {
        super("Restoration Affinity", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {//TODO:
        return "You gain:<br>" +
            "<br>" +
            " Ysera's Gift<br>" +
            "Heals you for 3% of your maximum health every 5 sec. If you are at full health, an injured party or raid member will be healed instead.<br>" +
            "<br>" +
            "You also learn:<br>" +
            "<br>" +
            " Rejuvenation<br>" +
            " Swiftmend<br>" +
            " Wild Growth<br>" +
            "//NO//Ursol's Vortex"

    }

    setTalent(caster) {
        caster.abilities["Rejuvenation"].canUse = true
        caster.abilities["Swiftmend"].canUse = true
        caster.abilities["Wild Growth"].canUse = true
        //TODO: caster.abilities["Ursol's Vortex"].canUse = true
        caster.abilities["Ysera's Gift"].canUse = true
    }

    unsetTalent(caster) {
        caster.abilities["Rejuvenation"].canUse = false
        caster.abilities["Swiftmend"].canUse = false
        caster.abilities["Wild Growth"].canUse = false
        //TODO: caster.abilities["Ursol's Vortex"].canUse = false
        caster.abilities["Ysera's Gift"].canUse = false
    }
}
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
class SouloftheForestBalance extends Ability {
    constructor() {
        super("Soul of the Forest ", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Eclipse increases Wrath's Astral power generation 50%, and increases Starfire's area effect damage by 150%."
    }

}
//------------------------------------------------
class Starlord extends Ability {
    constructor() {
        super("Starlord", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
        this.effect = [{name:"increaseStat",stat:"haste",val:4}]
        this.maxStacks = 3
    }

    getTooltip() {
        return "Starsurge and Starfall grant you 4% Haste for 15 sec.<br>" +
            "<br>" +
            "Stacks up to 3 times. Gaining a stack does not refresh the duration."
    }

    getBuffTooltip(caster, target, buff) {
        return "Haste increased by "+buff.stacks*4+"%."
    }

}
//------------------------------------------------
class IncarnationChosenofElune extends Ability {
    constructor() {
        super("Incarnation: Chosen of Elune", 0, 0, 0, 180, false, false, false, "arcane", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 30
        this.effect = [{name:"increaseStat",stat:"haste",val:10},{name:"increaseStat",stat:"crit",val:10}]
    }

    getTooltip() {
        return "An improved Moonkin Form that grants the benefits of Celestial Alignment, and 10% critical strike chance.<br>" +
            "<br>" +
            "Lasts 30 sec. You may shapeshift in and out of this improved Moonkin Form for its duration."
    }

    getBuffTooltip(caster, target, buff) {
        return "Both Eclipses active. Haste increased by 10% and critical strike chance by 10%."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            caster.abilities["Eclipse"].solar = true
            caster.abilities["Eclipse"].lunar = true
            caster.abilities["Eclipse"].next = "none"
            caster.abilities["Eclipse"].solarStacks = 0
            caster.abilities["Eclipse"].lunarStacks = 0
            caster.abilities["Eclipse"].time = this.duration
            caster.abilities["Eclipse"].buffed = 0

            applyBuff(caster, caster, caster.abilities["Eclipse"],undefined,undefined,"Eclipse (Solar)",this.duration)
            applyBuff(caster, caster, caster.abilities["Eclipse"],undefined,undefined,"Eclipse (Lunar)",this.duration)
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true

        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW6
class TwinMoons extends Ability {
    constructor() {
        super("Twin Moons", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Moonfire deals 10% increased damage and also hits another nearby enemy within 15 yds of the target."
    }

    setTalent(caster) {
        caster.abilities["Moonfire"].spellPower *= 1.1
        caster.abilities["Moonfire"].spellPowerDot *= 1.1
    }

    unsetTalent(caster) {
        caster.abilities["Moonfire"].spellPower /= 1.1
        caster.abilities["Moonfire"].spellPowerDot /= 1.1
    }

}
//------------------------------------------------
class StellarDrift extends Ability {
    constructor() {
        super("Stellar Drift", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Starfall deals 50% additional damage and allows you to cast while moving while it is active, but now has a 12 sec cooldown."
    }

    setTalent(caster) {
        caster.abilities["Starfall"].spellPower *= 1.5
        caster.abilities["Starfall"].cd = 12
        caster.abilities["Starfall"].maxCd = 12
    }

    unsetTalent(caster) {
        caster.abilities["Starfall"].spellPower /= 1.5
        caster.abilities["Starfall"].cd = 0
        caster.abilities["Starfall"].maxCd = 0
    }

}
//------------------------------------------------
class StellarFlare extends Ability {
    constructor() {
        super("Stellar Flare", -8, 1.5, 1.5, 0, false, true, false, "astral", 40, 1)
        this.talent = true
        this.duration = 24
        this.spellPower = 0.125
        this.spellPowerDot = 1.05
    }

    getTooltip() {
        return "Burns the target for "+spellPowerToNumber(this.spellPower)+" Astral damage, and then an additional "+spellPowerHotToNumber(this.spellPowerDot)+" damage over 24 sec.<br>" +
            "<br>" +
            "Generates 8 Astral Power."
    }
    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget)) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.castTarget = newTarget
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                this.setGcd(caster)
                this.cd = 0
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster, target) && !target.isDead) {
                doDamage(caster, target, this)
                applyDot(caster, target,this,undefined,undefined,this.spellPowerDot)
                this.setCd()
                caster.useEnergy(this.cost, this.secCost)
            }
        }
    }
}
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------
