let _mistweaver_talents = function(caster) {
    caster.abilities["Mist Wrap"] = new MistWrap()
    caster.abilities["Chi Wave"] = new ChiWave(caster.spec)
    caster.abilities["Chi Burst"] = new ChiBurst(caster.spec)

    caster.abilities["Chi Torpedo"] = new ChiTorpedo()
    caster.abilities["Celerity"] = new Celerity()
    caster.abilities["Tiger's Lust"] = new TigersLust()

    caster.abilities["Lifecycles"] = new Lifecycles()
    caster.abilities["Spirit of the Crane"] = new SpiritoftheCrane()
    caster.abilities["Mana Tea"] = new ManaTea()


    caster.talents = [["Mist Wrap","Chi Wave","Chi Burst"],
        ["Chi Torpedo","Celerity","Tiger's Lust"],
        ["Lifecycles","Spirit of the Crane","Mana Tea"],
        ["Tiger Tail Sweep","Song of Chi-Ji","Ring of Peace"],
        ["Healing Elixir","Diffuse Magic","Dampen Harm"],
        ["Summon Jade Serpent Statue","Refreshing Jade Wind","Invoke Chi-Ji, the Red Crane"],
        ["Focused Thunder","Upwelling","Rising Mist"]
    ]
}
//------------------------------------------------------------------------------------------------ROW1
class MistWrap extends Ability {
    constructor() {
        super("Mist Wrap", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Increases Enveloping Mist's duration by 1 sec and its healing bonus by 10%."
    }

    getDuration() {
        if (this.talentSelect) {
            return 1
        }
        return 0
    }

    getHealingInc() {
        if (this.talentSelect) {
            return 0.1
        }
        return 0
    }
}
//------------------------------------------------
class ChiWave extends Ability {
    constructor(spec) {
        super("Chi Wave", 0, 1, 0, 15, false, false, false, "nature", 40, 1)
        this.talent = true
        this.hasteGcd = false
        if(spec==="mistweaver") {
            this.gcd = 1.5
            this.hasteGcd = true
        }
        this.jumpRange = 25
        this.targets = 7
        this.spellPower = 0.142015 //dmg
        this.spellPowerHeal = 0.42 //heal
    }

    getTooltip() {
        return "A wave of Chi energy flows through friends and foes, dealing "+spellPowerToNumber(this.spellPower)+" Nature damage or "+spellPowerToNumber(this.spellPowerHeal)+" healing. Bounces up to 7 times to targets within 25 yards."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {

            let ttt = 0
            let lastTarget = caster
            for (let i = 0; i<creatures.length ;i++) {
                if (!creatures[i].isDead && this.checkDistance(lastTarget, creatures[i],this.jumpRange)) {
                    lastTarget = creatures[i]
                    if (isEnemy(caster,creatures[i])) {
                        doDamage(caster, creatures[i], this)
                    } else if (creatures[i].health<creatures[i].maxHealth) {
                        doHeal(caster, creatures[i], this,undefined,this.spellPowerHeal)
                    }

                    ttt++
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue()) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------
class ChiBurst extends Ability {
    constructor(spec) {
        super("Chi Burst", 0, 1.5, 1, 30, false, true, false, "nature", 40, 1)
        this.talent = true
        this.talentSelect = true
        if (spec==="windwalker") {
            this.secCost = -1 //per target
            this.gcd = 1
            this.hasteGcd = false
        } else if (spec==="brewmaster") {
            this.gcd = 1
            this.hasteGcd = false
        }
        this.spellPower = 0.46 //dmg
        this.spellPowerHeal = 0.945 //heal
        this.area = {type:"circle", radius:8, duration:1,data:{type:"damage", maxTargets:"all", spellPower:this.spellPower,moving:true,speed:40,color:"#8f6aff",color2:"rgba(192,182,255,0.05)"}}
        this.area2 = {type:"circle", radius:8, duration:1,data:{type:"heal", maxTargets:6, spellPower:this.spellPowerHeal,moving:true,speed:40,color:"#8f6aff",color2:"rgba(192,182,255,0.05)"}}
    }

    getTooltip() {
        return "Hurls a torrent of Chi energy up to 40 yds forward, dealing "+spellPowerToNumber(this.spellPower)+" Nature damage to all enemies, and "+spellPowerToNumber(this.spellPowerHeal)+" healing to the Monk and all allies in its path. Healing reduced beyond 6 targets."
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

        addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,false,this.area.radius)
        addArea(areas.length,caster,this,this.area2.type,this.area2.duration,this.area2.data,caster.x,caster.y,false,this.area2.radius)

        let target = getPointTarget(caster,40,caster.direction)

        addSpellVisualEffects(caster.x,caster.y,getDirection(caster,target),"projectile",
            {size:10,speed:40,target:target,color:"#704fff",onEnd:{},onRun:{name:"fire",color1:"rgba(80,87,255,0.7)",color2:"rgba(82,175,255,0.7)",life:0.4}})

        this.setCd()
        caster.useEnergy(this.cost,this.secCost)
    }
}
//------------------------------------------------------------------------------------------------ROW2
class Celerity extends Ability {
    constructor() {
        super("Celerity", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    setTalent(caster) {
        caster.abilities["Roll"].cd = 15
        caster.abilities["Roll"].maxCd = 15
        caster.abilities["Roll"].charges = 3
        caster.abilities["Roll"].maxCharges = 3
    }

    unsetTalent(caster) {
        caster.abilities["Roll"].cd = 20
        caster.abilities["Roll"].maxCd = 20
        caster.abilities["Roll"].charges = 2
        caster.abilities["Roll"].maxCharges = 2
    }

    getTooltip() {
        return "Reduces the cooldown of Roll by 5 sec and increases its maximum number of charges by 1"
    }
}
//------------------------------------------------
class ChiTorpedo extends Ability {
    constructor() {
        let name = "Chi Torpedo"
        let cost = 0 //% mana
        let gcd = 1.1
        let castTime = 0
        let cd = 20
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true

        this.spellPower = 0

        this.effect = [{name:"move",val:0.795*pxToMeter}]

        this.effects = [{name:"move",val:0.795*pxToMeter},{name:"moveSpeed",val:0.3}]
        this.maxStacks = 10

        this.duration = 1.1
        this.canCastWhileRooted = false
    }

    getTooltip() {
        return "Torpedoes you forward a long distance and increases your movement speed by 30% for 10 sec, stacking up to 2 times."
    }
    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.isCasting) {
                caster.isCasting = false
            }
            caster.isRolling = true
            this.setGcd(caster)
            this.setCd()
            this.effect[0] = this.effects[0]
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
    endBuff(target) {
        this.effect[0] = this.effects[1]
        applyBuff(target,target,this,1,true,"Chi Torpedo ",10)
        target.isRolling = false
    }

    setTalent(caster) {
        caster.abilities["Roll"].canUse = false
    }

    unsetTalent(caster) {
        caster.abilities["Roll"].canUse = true
    }

}
//------------------------------------------------
class TigersLust extends Ability {
    constructor() {
        let name = "Tiger's Lust"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true

        this.spellPower = 0
        this.effect = "moveSpeed"
        this.effectValue = 0.7
        this.duration = 6
        //TODO: REMOVE ROOTS AND SNARES
    }

    getTooltip() {
        return "Increases a friendly target's movement speed by 70% for 6 sec and removes all roots and snares."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (this.isEnemy(caster,caster.castTarget) || (this.checkDistance(caster,caster.castTarget))>this.range || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
                //heal self
                applyBuff(caster,caster,this)
            } else {
                //heal target
                applyBuff(caster,caster.castTarget,this)
            }
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW3
class Lifecycles extends Ability {
    constructor() {
        super("Lifecycles", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    check(caster,ability) {
        if (this.talentSelect) {
            if (ability.name === "Enveloping Mist") {
                for (let i = 0; i < caster.buffs.length; i++) {
                    if (caster.buffs[i].name === "Lifecycles (Enveloping Mist)") {
                        caster.buffs[i].duration = -1
                        applyBuff(caster, caster, this, undefined, undefined, "Lifecycles (Vivify)")
                        return 0.25
                    }
                }
                applyBuff(caster, caster, this, undefined, undefined, "Lifecycles (Vivify)")
            } else if (ability.name === "Vivify") {
                for (let i = 0; i < caster.buffs.length; i++) {
                    if (caster.buffs[i].name === "Lifecycles (Vivify)") {
                        caster.buffs[i].duration = -1
                        applyBuff(caster, caster, this, undefined, undefined, "Lifecycles (Enveloping Mist)")
                        return 0.25
                    }
                }
            }
            applyBuff(caster, caster, this, undefined, undefined, "Lifecycles (Enveloping Mist)")
        }
        return 0
    }

    getTooltip() {
        return "Enveloping Mist reduces the mana cost of your next Vivify by 25%.\n" +
            "\n" +
            "Vivify reduces the mana cost of your next Enveloping Mist by 25%."
    }
}
//------------------------------------------------
class SpiritoftheCrane extends Ability {
    constructor() {
        super("Spirit of the Crane", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    restoreMana(caster,stacks) {
        if (this.talentSelect) {
            caster.useEnergy(stacks*(-0.65))
        }
    }

    getTooltip() {
        return "Teachings of the Monastery causes each additional Blackout Kick to restore 0.65% mana."
    }
}
//------------------------------------------------
class ManaTea extends Ability {
    constructor() {
        let name = "Mana Tea"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true

        this.spellPower = 0
        this.effect = "reduceEnergyCost"
        this.effectValue = 0.5
        this.duration = 10

        this.noGcd = true
    }

    getTooltip() {
        return "Reduces the mana cost of your spells by 50% for 10 sec."
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            this.cd = 0
            applyBuff(caster,caster,this)
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//TODO:------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7