let _arcane_talents = function(caster) {

    //1
    caster.abilities["Amplification"] = new Amplification()
    caster.abilities["Rule of Threes"] = new RuleofThrees()
    caster.abilities["Arcane Familiar"] = new ArcaneFamiliar()

    //2
    caster.abilities["Master of Time"] = new MasterofTime()
    caster.abilities["Shimmer"] = new Shimmer()
    caster.abilities["Slipstream"] = new Slipstream()

    //3
    caster.abilities["Incanter's Flow"] = new IncantersFlow()
    caster.abilities["Focus Magic"] = new FocusMagic()
    caster.abilities["Rune of Power"] = new RuneofPower()

    //4
    caster.abilities["Resonance"] = new Resonance()
    caster.abilities["Arcane Echo"] = new ArcaneEcho()
    caster.abilities["Nether Tempest"] = new NetherTempest()

    //5
    caster.abilities["Chrono Shift"] = new ChronoShift()
    caster.abilities["Ice Ward"] = new IceWard()
    caster.abilities["Ring of Frost"] = new RingofFrost()

    //6
    caster.abilities["Reverberate"] = new Reverberate()
    caster.abilities["Arcane Orb"] = new ArcaneOrb()
    caster.abilities["Supernova"] = new Supernova()

    //7
    caster.abilities["Overpowered"] = new Overpowered()
    caster.abilities["Time Anomaly"] = new TimeAnomaly()
    caster.abilities["Enlightened"] = new Enlightened()

    caster.talents = [["Amplification","Rule of Threes","Arcane Familiar"],
        ["Master of Time","Shimmer","Slipstream"],
        ["Incanter's Flow","Focus Magic","Rune of Power"],
        ["Resonance","Arcane Echo","Nether Tempest"],
        ["Chrono Shift","Ice Ward","Ring of Frost"],
        ["Reverberate","Arcane Orb","Supernova"],
        ["Overpowered","Time Anomaly","Enlightened"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Amplification extends Ability {
    constructor() {
        super("Amplification", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "When Clearcast, Arcane Missiles fires 2 additional missile."
    }
}
//------------------------------------------------
class RuleofThrees extends Ability {
    constructor() {
        super("Rule of Threes", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return "When you gain your third Arcane Charge, the cost of your next Arcane Blast or Arcane Missiles is reduced by 100%."
    }
}
//------------------------------------------------
class ArcaneFamiliar extends Ability {
    constructor() {
        super("Arcane Familiar", 0, 1.5, 0, 10, false, false, false, "arcane", 5, 1)
        this.talent = true
        //pet casts:  Arcane Assault: Launches bolts of arcane energy at the enemy target, causing (8.75% of Spell power) Arcane damage.
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Summon a Familiar that attacks your enemies and increases your maximum mana by 10% for 1 hour."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class MasterofTime extends Ability {
    constructor() {
        super("Master of Time", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Alter Time by 30 sec.<br>" +
            "<br>" +
            "Alter Time resets the cooldown of Blink when you return to your original location."
    }


    setTalent(caster) {
        caster.abilities["Alter Time"].cd -= 30
        caster.abilities["Alter Time"].maxCd -= 30

    }

    unsetTalent(caster) {
        caster.abilities["Alter Time"].cd += 30
        caster.abilities["Alter Time"].maxCd += 30
    }

}
//------------------------------------------------
class Shimmer extends Ability {
    constructor() {
        super("Shimmer", 2, 0.5, 0, 25, false, false, false, "arcane", 5, 2)
        this.talent = true
        this.talentSelect = true
        this.noGcd = true
        this.distance = 20
    }

    getTooltip() {
        return "Teleports you 20 yards forward, unless something is in the way. Unaffected by the global cooldown and castable while casting."
    }

    setTalent(caster) {
        caster.abilities["Blink"].canUse = false
        replaceAction(caster, "Blink", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Blink"].canUse = true
        replaceAction(caster,this.name,"Blink")
    }

    startCast(caster) {
        if (!caster.isStunned && !caster.isDead && !caster.isInterrupted && !caster.isRooted && this.talentSelect && this.checkCd(caster) && this.checkCost(caster) && this.abilityCd>=this.abilityMaxCd) {
            caster.canMoveWhileCasting = true
            caster.move(this.distance*pxToMeter,undefined,undefined,true)
            caster.canMoveWhileCasting = false
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//------------------------------------------------
class Slipstream extends Ability {
    constructor() {
        super("Slipstream", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return "Clearcasting allows Arcane Missiles to be channeled while moving.<br>" +
            "<br>" +
            "Evocation can be channeled while moving."
    }
}
//------------------------------------------------------------------------------------------------ROW3
class IncantersFlow extends Ability {
    constructor() {
        super("Incanter's Flow", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 10
        this.permanentBuff = true
        this.effect = [{name:"increaseDamage",val:0.05}]
        this.maxStacks = 5
        this.timer1 = 0
        this.timer2 = 1
        this.timer3 = 0
    }

    getTooltip() {
        return "Magical energy flows through you while in combat, building up to 20% increased damage and then diminishing down to 4% increased damage, cycling every 10 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage increased by "+buff.stacks*4+"%."
    }

    runBuff(caster) {
        this.timer3 += progressInSec
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            if (this.timer3<5) {
                applyBuff(caster, caster, this, 1, true)
            } else {
                applyBuff(caster,caster,this,-1,true)
            }
            this.timer1 = 0
        }
        if (this.timer3>=10) {
            this.timer3 = 0
        }
    }

    setTalent(caster) {
        applyBuff(caster,caster,this,1,true)
    }

    unsetTalent(caster) {
        checkBuff(caster,caster,"Incanter's Flow",true)
    }
}
//------------------------------------------------
class FocusMagic extends Ability {
    constructor() {
        super("Focus Magic", 2, 1.5, 0, 0, false, false, false, "arcane", 40, 1)
        this.talent = true
        this.duration = 600
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Increases the target's chance to critically hit with spells by 5% for 30 min." +
            " When the target critically hits your Intellect and chance to critically hit with spells is increased by 5% for 10 sec. Cannot be cast on self. Limit 1 target."
    }

    getBuffTooltip(caster, target, buff) {
        return "$auracaster has focused their magic on you, increasing your spell critical strike chance by 5%."
    }
}
//------------------------------------------------
class RuneofPower extends Ability {
    constructor() {
        super("Rune of Power", 0, 1.5, 1.5, 45, false, true, false, "arcane", 40, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 1.49
        this.effect = [{name:"increaseDamage",val:0.4}]
        this.area = {type:"circle", radius:8, duration: 12,data:{type:"applyBuffToCaster",color:"#cbb8ff",color2:"rgba(216,191,255,0.2)",cast:false}}
    }

    getTooltip() {
        if (player.spec==="arcane") {
            return "Places a Rune of Power on the ground for 12 sec which increases your spell damage by 40% while you stand within 8 yds. Casting Arcane Power will also create a Rune of Power at your location."
        } else if (player.spec==="fire") {
            return "Places a Rune of Power on the ground for 12 sec which increases your spell damage by 40% while you stand within 8 yds. Casting Combustion will also create a Rune of Power at your location."
        } else {
            return "Places a Rune of Power on the ground for 12 sec which increases your spell damage by 40% while you stand within 8 yds. Casting Icy Veins will also create a Rune of Power at your location."
        }
    }

    getBuffTooltip(caster, target, buff) {
        return "Spell damage increased by 40%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:(this.castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,true,this.area.radius)
        if (caster.spec==="arcane") {
            applyBuff(caster,caster,caster.abilities["Arcane Power"])
        }
        caster.useEnergy(this.cost,this.secCost)
        this.setCd()

    }

}
//------------------------------------------------------------------------------------------------ROW4
class Resonance extends Ability {
    constructor() {
        super("Resonance", 0, 0, 0, 0, false, false, false, "arcane", 0, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Arcane Barrage deals 15% increased damage per target it hits."
    }

}
//------------------------------------------------
class ArcaneEcho extends Ability {
    constructor() {
        super("Arcane Echo", 0, 0, 0, 0, false, false, false, "arcane", 8, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.1092
    }

    getTooltip() {
        return "Direct damage you deal to enemies affected by Touch of the Magi, causes an explosion that deals "+spellPowerToNumber(this.spellPower)+" Arcane damage to all nearby enemies."
    }

    doDamage(caster,target) {
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(target, enemies[i],10)) {
                doDamage(caster, enemies[i], this)
            }
        }
    }

}
//------------------------------------------------
class NetherTempest extends Ability {
    constructor() {
        super("Nether Tempest", 1.5, 1.5, 0, 0, false, false, false, "arcane", 40, 1)
        this.talent = true
        this.spellPower = 0.1092
        this.duration = 12
    }

    getTooltip() {
        return "Places a Nether Tempest on the target which deals (17.061% of Spell power) Arcane damage over 12 sec to the target and nearby enemies within 10 yards." +
            " Limit 1 target. Deals reduced damage to secondary targets.<br>" +
            "<br>" +
            "Damage increased by 60% per Arcane Charge."
    }

    getBuffTooltip(caster, target, buff) {
        return "Deals (1.42175% of Spell power) Arcane damage and an additional (1.42175% of Spell power) Arcane damage to all enemies within 8 yards every 1 sec."
    }

    doDamage(caster,target) {
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(target, enemies[i],10)) {
                doDamage(caster, enemies[i], this)
            }
        }
    }

}
//------------------------------------------------------------------------------------------------ROW5
class ChronoShift extends Ability {
    constructor() {
        super("Chrono Shift", 0, 0, 0, 0, false, false, false, "arcane", 0, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 5
        this.effect = [{name:"moveSpeed",val:0.5}]

    }

    getTooltip() {
        return "Arcane Barrage slows enemies by 50% and increases your movement speed by 50% for 5 sec."
    }

}
//------------------------------------------------
class IceWard extends Ability {
    constructor() {
        super("Ice Ward", 0, 0, 0, 0, false, false, false, "arcane", 0, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Frost Nova now has 2 charges."
    }

    setTalent(caster) {
        caster.abilities["Frost Nova"].charges = 2
        caster.abilities["Frost Nova"].maxCharges = 2
    }

    unsetTalent(caster) {
        caster.abilities["Frost Nova"].charges = 1
        caster.abilities["Frost Nova"].maxCharges = 1
    }

}
//------------------------------------------------
class RingofFrost extends Ability {
    constructor() {
        super("Ring of Frost", 8, 1.5, 2, 45, false, true, false, "frost", 30, 1)
        this.passive = true
        this.talent = true
        this.duration = 10

    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Summons a Ring of Frost for 10 sec at the target location. Enemies entering the ring are incapacitated for 10 sec. Limit 10 targets.<br>" +
            "<br>" +
            "When the incapacitate expires, enemies are slowed by 65% for 4 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW6
class Reverberate extends Ability {
    constructor() {
        super("Reverberate", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "If Arcane Explosion hits at least 3 targets, it has a 50% chance to generate an extra Arcane Charge."
    }

}
//------------------------------------------------
class ArcaneOrb extends Ability {
    constructor() {
        super("Arcane Orb", 1, 1.5, 0, 20, false, false, false, "arcane", 40, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1.092
        this.area = {type:"circle", radius:8, duration:2.5,data:{type:"damage", maxTargets:"all", spellPower:this.spellPower,moving:true,speed:14,color:"#8f6aff",color2:"rgba(192,182,255,0.05)"}}
        this.secCost = -2 //TODO:Grants 1 Arcane Charge when cast and every time it deals damage.
    }

    getTooltip() {
        return "Launches an Arcane Orb forward from your position, traveling up to 40 yards, dealing "+spellPowerToNumber(this.spellPower)+" Arcane damage to enemies it passes through."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}

            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue()) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        this.area.data.direction = caster.direction
        addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,false,this.area.radius)

        let target = getPointTarget(caster,40,caster.direction)

        addSpellVisualEffects(caster.x,caster.y,getDirection(caster,target),"projectile",
            {size:10,speed:40,target:target,color:"#966eff",onEnd:{},onRun:{name:"fire",color1:"rgba(93,37,255,0.7)",color2:"rgba(194,139,255,0.7)",life:0.4}})

        this.setCd()
        caster.useEnergy(this.cost,this.secCost)
    }
}
//------------------------------------------------
class Supernova extends Ability {
    constructor() {
        super("Supernova", 0, 1.5, 0, 25, false, false, false, "arcane", 40, 1)
        this.talent = true
        this.spellPower = 0.3
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Pulses arcane energy around the target enemy or ally, dealing "+spellPowerToNumber(this.spellPower)+" Arcane damage to all enemies within 8 yards, and knocking them upward." +
            " A primary enemy target will take 100% increased damage."
    }

}
//------------------------------------------------------------------------------------------------ROW7
class Overpowered extends Ability {
    constructor() {
        super("Overpowered", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Arcane Power now increases damage by 50% and reduces mana costs by 50%."
    }


    setTalent(caster) {
        caster.abilities["Arcane Power"].effect[0].val = 0.5
        caster.abilities["Arcane Power"].effect[1].val = 0.5
    }

    unsetTalent(caster) {
        caster.abilities["Arcane Power"].effect[0].val = 0.3
        caster.abilities["Arcane Power"].effect[1].val = 0.3
    }

}
//------------------------------------------------
class TimeAnomaly extends Ability {
    constructor() {
        super("Time Anomaly", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.timer1 = 0
        this.timer2 = 2
    }

    run(caster) {
        if (this.talentSelect) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                this.timer1 = 0
                this.anomaly(caster)
            }
        }
    }

    getTooltip() {
        return "At any moment, you have a chance to gain Arcane Power for 8 sec, gain Evocation for 1 sec, or gain Time Warp for 6 sec."
    }

    anomaly(caster) {
        if (getChance(5)) {//???
            if (getChance(34)) {
                applyBuff(caster,caster,caster.abilities["Time Warp"],undefined,undefined,undefined,6)
            } else if (getChance(33)) {
                applyBuff(caster,caster,caster.abilities["Arcane Power"],undefined,undefined,undefined,8)
            } else {
                //TODO: evocation
                caster.energy += caster.maxEnergy*0.167
            }

        }
    }

}
//------------------------------------------------
class Enlightened extends Ability {
    constructor() {
        super("Enlightened", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Arcane damage dealt while above 70% mana is increased by 8%, Mana Regen while below 70% is increased by 20%."
    }


}