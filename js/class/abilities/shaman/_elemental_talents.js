let _elemental_talents = function(caster) {
    //1
    caster.abilities["Earthen Rage"] = new EarthenRage()
    caster.abilities["Echo of the Elements"] = new EchooftheElements()
    caster.abilities["Static Discharge"] = new StaticDischarge()

    //2
    caster.abilities["Aftershock"] = new Aftershock()
    caster.abilities["Echoing Shock"] = new EchoingShock()
    caster.abilities["Elemental Blast"] = new ElementalBlast()

    //3
    caster.abilities["Spirit Wolf"] = new SpiritWolf()
    caster.abilities["Earth Shield"] = new EarthShield(true)
    caster.abilities["Static Charge"] = new StaticCharge()

    //4
    caster.abilities["Master of the Elements"] = new MasteroftheElements()
    caster.abilities["Storm Elemental"] = new StormElemental()
    caster.abilities["Liquid Magma Totem"] = new LiquidMagmaTotem()

    //5
    caster.abilities["Nature's Guardian "] = new NaturesGuardianShaman()
    caster.abilities["Ancestral Guidance"] = new AncestralGuidance()
    caster.abilities["Wind Rush Totem"] = new WindRushTotem()

    //6
    caster.abilities["Surge of Power"] = new SurgeofPower()
    caster.abilities["Primal Elementalist"] = new PrimalElementalist()
    caster.abilities["Icefury"] = new Icefury()

    //7
    caster.abilities["Unlimited Power"] = new UnlimitedPower()
    caster.abilities["Stormkeeper"] = new Stormkeeper()
    caster.abilities["Ascendance"] = new AscendanceEle()
    caster.abilities["Lava Beam"] = new LavaBeam()

    caster.talents = [["Earthen Rage","Echo of the Elements","Static Discharge"],
        ["Aftershock","Echoing Shock","Elemental Blast"],
        ["Spirit Wolf","Earth Shield","Static Charge"],
        ["Master of the Elements","Storm Elemental","Liquid Magma Totem"],
        ["Nature's Guardian ","Ancestral Guidance","Wind Rush Totem"],
        ["Surge of Power","Primal Elementalist","Icefury"],
        ["Unlimited Power","Stormkeeper","Ascendance"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class EarthenRage extends Ability {
    constructor() {
        super("Earthen Rage", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "//NOT IMPLEMENTED// Your damaging spells incite the earth around you to come to your aid for 6 sec, repeatedly dealing (13.75% of Spell power) Nature damage to your most recently attacked target."
    }
}
//------------------------------------------------
//------------------------------------------------
class StaticDischarge extends Ability {
    constructor() {
        super("Static Discharge", 0, 1.5, 0, 30, false, false, false, "nature", 40, 1)
        this.talent = true
        this.spellPower = 0.23
        this.duration = 3
    }

    getTooltip() {
        return "//NOT IMPLEMENTED// Discharge excess energy from your Lightning Shield, dealing "+spellPowerToNumber(this.spellPower)+" Nature damage to an enemy within 40 yds every 0.5 sec for 3 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Discharging excess Lightning Shield energy at your enemies."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class Aftershock extends Ability {
    constructor() {
        super("Aftershock", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Earth Shock and Earthquake have a 25% chance to refund all Maelstrom spent."
    }

    refund() {
        return this.talentSelect && getChance(25)
    }

}
//------------------------------------------------
class EchoingShock extends Ability {
    constructor() {
        let name = "Echoing Shock"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 0.65 * 1.05
        this.duration = 8
        this.abilityCast = false
        this.target = false
        this.timer = 0
        this.timer2 = 1
    }

    getTooltip() {
        return "Shock the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Elemental damage and create an ancestral echo, causing your next damage or healing spell to be cast a second time 1.0 sec later for free. "
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next damage or healing spell will be cast a second time 1.0 sec later for free."
    }

    run(caster) {
        if (this.abilityCast!==false) {
            if (this.timer<this.timer2) {
                this.timer += progressInSec
            } else {
                this.timer = 0
                doDamage(caster,this.target,caster.abilities[this.abilityCast])
                this.abilityCast = false
            }
        }
    }

    removeBuff(caster) {
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Echoing Shock") {
                caster.buffs[i].duration = -1
            }
        }
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
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
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster,target,this)
                applyBuff(caster,caster,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
//------------------------------------------------
class ElementalBlast extends Ability {
    constructor(enh = false) {
        let name = "Elemental Blast"
        let cost = -30
        let gcd = 1.5
        let castTime = 2
        let cd = 12
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 1.40 * 1.05
        this.duration = 10
        this.effect = [{name:"increaseStat",stat:"haste",val:3}]

        if (enh) {
            this.cost = 2.75
        }
    }

    getTooltip() {
        return "Harnesses the raw power of the elements, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Elemental damage and increasing your Critical Strike or Haste by 3% or Mastery by 5.625% for 10 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return buff.effect[0].stat
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
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
            if (this.checkDistance(caster,target)  && !target.isDead) {

                let spellPower = this.spellPower
                if (caster.spec==="elemental" &&caster.abilities["Master of the Elements"].talentSelect && checkBuff(caster,caster,"Master of the Elements")) {
                    spellPower *= 1.2
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Master of the Elements") {
                            caster.buffs[i].duration = -1
                        }
                    }
                }

                doDamage(caster,target,this,undefined,spellPower)

                let rngBuff = Math.random()
                if (rngBuff<0.33) {
                    this.effect[0].stat = "crit"
                    this.effect[0].val = 3

                } else if (rngBuff>0.66) {
                    this.effect[0].stat = "haste"
                    this.effect[0].val = 3
                } else {
                    this.effect[0].stat = "mastery"
                    this.effect[0].val = 5.625
                }

                applyBuff(caster,caster,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class MasteroftheElements extends Ability {
    constructor() {
        super("Master of the Elements", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 15
    }

    getTooltip() {
        return "Casting Lava Burst increases the damage of your next Nature, Physical, or Frost spell by 20%."
    }

}
//------------------------------------------------
class StormElemental extends Ability {
    constructor() {
        let name = "Storm Elemental"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 150
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 1.05
        this.duration = 10
        this.maxStacks = 10
        this.stacks = 0
        this.petData = {
            name:"Storm Elemental",
            abilities:{"Call Lightning":new CallLightningElemental(true),"Wind Gust":new WindGustElemental(true),"Eye of the Storm":new EyeoftheStormElemental(true)},
            color:"#ff5230",
            size:7,
            do:[{name:"cast",ability:"Call Lightning"},{name:"cast",ability:"Eye of the Storm"},{name:"cast",ability:"Wind Gust"}],
        }
        this.petDuration = 30
    }

    getTooltip() {
        return "Calls forth a Greater Storm Elemental to hurl gusts of wind that damage the Shaman's enemies for 30 sec. While the Storm Elemental is active, each time you cast Lightning Bolt or Chain Lightning, the cast time of Lightning Bolt and Chain Lightning is reduced by 3%, stacking up to 10 times."
    }

    setTalent(caster) {
        caster.abilities["Fire Elemental"].canUse = false
    }

    unsetTalent(caster) {
        caster.abilities["Fire Elemental"].canUse = true
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster){
        this.stacks = 0
    }

    incStacks(caster) {
        applyBuff(caster,caster,this,1,true)
        if (this.stacks<this.maxStacks) {
            this.stacks++
        }
    }

    getVal(caster) {
        return 1-(this.stacks*0.03)
    }

}
//------------------------------------------------
class LiquidMagmaTotem extends Ability {
    constructor() {
        let name = "Liquid Magma Totem"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 0.15*1.05
        this.area = {type:"circle", radius:8, duration:15,data:{type:"dot",timer:1,maxTargets:1, spellPower:this.spellPower,color:"#4eff40",color2:"rgba(103,163,255,0.3)"},cast:false}
        this.petData = {
            name:"Liquid Magma Totem",
            abilities:{},
            color:"rgb(208,62,0)",
            size:4,
            do:[]
        }
        this.petDuration = 15
        this.castPosition = {x:0,y:0}

    }

    getTooltip() {
        return "Summons a totem at the target location for 15 sec that hurls liquid magma at a random nearby target every 1 sec, dealing "+spellPowerToNumber(this.spellPower)+" Fire damage to all enemies within 8 yards."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            spawnPet(caster,"totem",this.petData.name,this.castPosition.x,this.castPosition.y,this)

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,false,this.area.radius)

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
class AncestralGuidance extends Ability {
    constructor() {
        super("Ancestral Guidance", 0, 0, 0, 120, false, false, false, "nature", 8, 1)
        this.talent = true
        this.targets = 3
        this.duration = 10
        this.noGcd = true
        this.healing = 0
        this.timer = 0
        this.timer2 = 1
        this.caster = {}
    }

    getTooltip() {
        return "For the next 10 sec, 25% of your damage and healing is converted to healing on up to 3 nearby injured party or raid members."
    }

    getBuffTooltip(caster, target, buff) {
        return "A percentage of damage or healing dealt is copied as healing to up to 3 nearby injured party or raid members."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.caster = caster
            applyBuff(caster,caster,this)
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    run(caster) {
        if (this.timer<this.timer2) {
            this.timer += progressInSec
        } else {
            this.timer = 0
            if (this.healing>0) {
                this.heal()
            }
        }
    }
    collectHeal(val) {
        this.healing += val
    }

    endBuff(target) {
        this.heal(this.caster,this.val)
    }

    heal() {
        let val = this.healing
        let caster = this.caster
        let targets = []
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (this.checkDistance(caster,friendlyTargets[i],undefined,true) && !friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                targets.push(friendlyTargets[i])
            }
        }

        targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets

        let healing = val*0.25
        for (let i = 0; i<targets.length; i++) {
            doHeal(caster,targets[i],this,undefined,undefined,undefined,undefined,undefined,healing)
        }
        this.healing = 0
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class SurgeofPower extends Ability {
    constructor() {
        super("Surge of Power", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return "Casting Earth Shock also enhances your next spell cast within 15 sec: <br>" +
            "Flame Shock: The next cast also applies Flame Shock to 1 additional target within 8 yards of the target. <br>" +
            "Lightning Bolt: Your next cast will cause an additional 1-3 Elemental Overloads. <br>" +
            "Lava Burst: Reduces the cooldown of your Fire Elemental by 6.0 sec. <br>" +
            "Frost Shock: Freezes the target in place for 6 sec. <br>"
    }

    enhance(caster,target,ability) {
        if (this.talentSelect) {
            let enhanced = false
            let canEnhance = false
            let buffId = 0
            for (let j = 0; j<caster.buffs.length; j++) {
                if (caster.buffs[j].name==="Surge of Power") {
                    buffId = j
                    canEnhance = true
                }
            }
            if (canEnhance) {
                if (ability.name==="Flame Shock") {
                    let targets = enemies
                    for (let i = 0; i<targets.length ;i++) {
                        if (targets[i]!==target && !targets[i].isDead && this.checkDistance(target, targets[i],8)) {
                            doDamage(caster, targets[i], caster.abilities["Flame Shock"])
                            applyDot(caster, targets[i], caster.abilities["Flame Shock"])
                            enhanced = true
                            break
                        }
                    }
                } else if (ability.name==="Lightning Bolt") {
                    let rng = Math.ceil(Math.random()*3)
                    for (let i = 0; i<rng; i++) {
                        doDamage(caster,target,caster.abilities["Elemental Overload"],undefined,ability.spellPower*0.85)
                    }
                } else if (ability.name==="Lava Burst") {
                    caster.abilities["Fire Elemental"].cd += 6
                    caster.abilities["Storm Elemental"].cd += 6
                    enhanced = true
                } else if (ability.name==="Frost Shock") {
                    //TODO:ROOT 6sec
                }
                if (enhanced) {
                    caster.buffs[buffId].duration = -1
                }
            }
        }
    }
}
//------------------------------------------------
class PrimalElementalist extends Ability {
    constructor() {
        super("Primal Elementalist", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Your Earth, Fire, and Storm Elementals are drawn from primal elementals 80% more powerful than regular elementals, with additional abilities, and you gain direct control over them."
    }
    //TODO:EARTH ELEMENTAL
}
//------------------------------------------------
class Icefury extends Ability {
    constructor() {
        let name = "Icefury"
        let cost = -25
        let gcd = 1.5
        let castTime = 2
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "frost"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 0.825*1.05
        this.duration = 15
        this.maxStacks = 4
    }

    getTooltip() {
        return "Hurls frigid ice at the target, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Frost damage and causing your next 4 Frost Shocks to deal 225% increased damage and generate 8 Maelstrom"
    }

    getBuffTooltip(caster, target, buff) {
        return "Frost Shock damage increased by 225%."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
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
            if (this.checkDistance(caster,target)  && !target.isDead) {

                let spellPower = this.spellPower
                if (caster.abilities["Master of the Elements"].talentSelect && checkBuff(caster,caster,"Master of the Elements")) {
                    spellPower *= 1.2
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Master of the Elements") {
                            caster.buffs[i].duration = -1
                        }
                    }
                }

                doDamage(caster,target,this,undefined,spellPower)
                applyBuff(caster,caster,this,4,true)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
//------------------------------------------------------------------------------------------------ROW7
class UnlimitedPower extends Ability {
    constructor() {
        super("Unlimited Power", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 10
        this.maxStacks = 20
        this.effect = [{name:"increaseStat",stat:"haste",val:2}]
    }

    getTooltip() {
        return "When your spells cause an elemental overload, you gain 2% Haste for 10 sec. Gaining a stack does not refresh the duration."
    }
}
//------------------------------------------------
class Stormkeeper extends Ability {
    constructor() {
        super("Stormkeeper", 0, 1.5, 1.5, 60, false, true, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 15
        this.maxStacks = 2
    }

    getTooltip() {
        return "Charge yourself with lightning, causing your next 2 Lightning Bolts to deal 150% more damage, and also causes your next 2 Lightning Bolts or Chain Lightnings to be instant cast and trigger an Elemental Overload on every target."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next Lightning Bolt will deal 150% increased damage, and your next Lightning Bolt or Chain Lightning will be instant cast and cause an Elemental Overload to trigger on every target hit."
    }
    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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

    endCast(caster) {
        caster.isCasting = false
        applyBuff(caster,caster,this,2,true)
        caster.useEnergy(this.cost,this.secCost)
        this.setCd()
    }


}
//------------------------------------------------
class AscendanceEle extends Ability {
    constructor() {
        super("Ascendance", 0, 1.5, 0, 180, false, false, false, "nature", 20, 1)
        this.talent = true
        this.spellPower = 8.76
        this.duration = 15
    }
    getTooltip() {
        return "Transform into a Flame Ascendant for 15 sec, replacing Chain Lightning with Lava Beam, removing the cooldown on Lava Burst, and increasing the damage of Lava Burst by an amount equal to your critical strike chance. When you transform into the Flame Ascendant, instantly cast a Lava Burst at all enemies affected by your Flame Shock, and refresh your Flame Shock durations to 18 sec.\n "
    }
    getBuffTooltip(caster, target, buff) {
        return "Transformed into a powerful Fire ascendant. Chain Lightning is transformed into Lava Beam."
    }


    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let targets = []
            for (let i = 0; i<enemies.length; i++) {
                if (this.checkDistance(caster,enemies[i],undefined,true) && !enemies[i].isDead && checkDebuff(caster,enemies[i],"Flame Shock")) {
                    targets.push(friendlyTargets[i])
                }
            }

            targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets

            let damage = caster.abilities["Lava Burst"].spellPower

            for (let i = 0; i<targets.length; i++) {
                doDamage(caster,targets[i],this,undefined,damage,undefined,undefined,undefined,undefined,undefined,"Lava Burst")
                for (let j = 0; j<targets[i].buffs.length; j++) {
                    if (targets[i].buffs[j].name === "Flame Shock" && targets[i].buffs[j].caster === caster) {
                        targets[i].buffs[j] += 18
                    }
                }
            }

            if (caster===player) {
                //actionbar
                if (actions["Chain Lightning"]) {
                    let bar = actions["Chain Lightning"].bar
                    let slot = actions["Chain Lightning"].slot
                    actions["Lava Beam"] = new Action("Lava Beam", bar, slot)
                }
                caster.abilities["Lava Beam"].canUse = true
            }

            applyBuff(caster,caster,this)
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster) {
        if (caster===player) {
            //actionbar
            if (actions["Lava Beam"]) {
                let bar = actions["Lava Beam"].bar
                let slot = actions["Lava Beam"].slot
                actions["Chain Lightning"] = new Action("Chain Lightning", bar, slot)
            }
            caster.abilities["Lava Beam"].canUse = false
        }
    }

}