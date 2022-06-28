let _windwalker_talents = function(caster) {
    //1
    caster.abilities["Eye of the Tiger"] = new EyeoftheTiger()
    caster.abilities["Chi Wave"] = new ChiWave(caster.spec)
    caster.abilities["Chi Burst"] = new ChiBurst(caster.spec)

    //2
    caster.abilities["Chi Torpedo"] = new ChiTorpedo()
    caster.abilities["Celerity"] = new Celerity()
    caster.abilities["Tiger's Lust"] = new TigersLust()

    //3
    caster.abilities["Ascension"] = new Ascension()
    caster.abilities["Fist of the White Tiger"] = new FistoftheWhiteTiger()
    caster.abilities["Energizing Elixir"] = new EnergizingElixir()

    //4
    caster.abilities["Tiger Tail Sweep"] = new TigerTailSweep()
    caster.abilities["Good Karma"] = new GoodKarma()
    caster.abilities["Ring of Peace"] = new RingofPeace()

    //5
    caster.abilities["Inner Strength"] = new InnerStrength()
    caster.abilities["Diffuse Magic"] = new DiffuseMagic()
    caster.abilities["Dampen Harm"] = new DampenHarm()

    //6
    caster.abilities["Hit Combo"] = new HitCombo()
    caster.abilities["Rushing Jade Wind"] = new RushingJadeWind()
    caster.abilities["Dance of Chi-Ji"] = new DanceofChiJi()

    //7
    caster.abilities["Spiritual Focus"] = new SpiritualFocus()
    caster.abilities["Whirling Dragon Punch"] = new WhirlingDragonPunch()
    //caster.abilities[""] = new ()


    caster.talents = [["Eye of the Tiger","Chi Wave","Chi Burst"],
        ["Celerity","Chi Torpedo","Tiger's Lust"],
        ["Ascension","Fist of the White Tiger","Energizing Elixir"],
        ["Tiger Tail Sweep","Good Karma","Ring of Peace"],
        ["Inner Strength","Diffuse Magic","Dampen Harm"],
        ["Hit Combo","Rushing Jade Wind","Dance of Chi-Ji"],
        ["Spiritual Focus","Whirling Dragon Punch","Serenity"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class EyeoftheTiger extends Ability {
    constructor() {
        super("Eye of the Tiger", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
        this.spellPower = 0.281736
    }

    getTooltip() {
        return "Tiger Palm also applies Eye of the Tiger, dealing "+spellPowerHotToNumber(this.spellPower)+" Nature damage to the enemy and "+spellPowerHotToNumber(this.spellPower)+" healing to the Monk over 8 sec. Limit 1 target."
    }

    //TODO:ONLY 1 TARGET
    apply(caster,target) {
        if (this.talentSelect) {
            applyHot(caster,caster,this)
            applyDot(caster,target,this)
        }
    }

}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//Ascension
class Ascension extends Ability {
    constructor() {
        super("Ascension", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Increases your maximum Chi by 1, maximum Energy by 20, and your Energy regeneration by 10%."
    }

    setTalent(caster) {
        caster.energy += 20
        caster.maxEnergy += 20
        caster.maxSecondaryResource += 1
        caster.energyRegen += 1
    }

    unsetTalent(caster) {
        caster.energy -= 20
        caster.maxEnergy -= 20
        caster.maxSecondaryResource -= 1
        caster.energyRegen -= 1
    }

}
//------------------------------------------------
class FistoftheWhiteTiger extends Ability {
    constructor() {
        let name = "Fist of the White Tiger"
        let cost = 40
        let gcd = 1
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.8775*2
        this.secCost = -3

    }

    getTooltip() {
        return "Strike with the technique of the White Tiger, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        done = true
                        target = caster.targetObj
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------
class EnergizingElixir extends Ability {
    constructor() {
        let name = "Energizing Elixir"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.effect = [{name:"restoreMana",val:75}]
        this.duration = 5
        this.secCost = -2
        this.noGcd = true

    }

    getTooltip() {
        return "Chug an Energizing Elixir, granting 2 Chi and generating 75 Energy over 5 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Generating 15 extra Energy per sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            applyBuff(caster,caster,this)
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
class GoodKarma extends Ability {
    constructor() {
        super("Good Karma", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "100% of the damage redirected by Touch of Karma also heals you."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
class InnerStrength extends Ability {
    constructor() {
        super("Inner Strength", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 5
        this.maxStacks = 5
        this.effect = [{name:"damageReductionStacks",val:0.02}]
    }

    getTooltip() {
        return "Each Chi you spend reduces damage taken by 2% for 5 sec, stacking up to 5 times."
    }

    applyBuff(caster,chi) {
        if (this.talentSelect) {
            applyBuff(caster,caster,this,chi,true)
        }
    }

}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class HitCombo extends Ability {
    constructor() {
        super("Hit Combo", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.permanentBuff = true
        this.duration = 10
        this.maxStacks = 6
        this.effect = [{name:"increaseDamage",val:0.01}]
    }

    getTooltip() {
        return "Each successive attack that triggers Combo Strikes in a row grants 1% increased damage, stacking up to 6 times."
    }

    applyBuff(caster) {
        if (this.talentSelect) {
            applyBuff(caster,caster,this,1,true)
        }
    }
}
//------------------------------------------------
class RushingJadeWind extends Ability {
    constructor() {
        super("Rushing Jade Wind", 0, 1, 0, 6, false, false, false, "physical", 8, 1)
        this.secCost = 1
        this.hasteCd = true
        this.talent = true
        this.spellPower = 0.9/9
        this.effect = [{name:"RJWDamage",val:this.spellPower,targets:20,timer:0,timer2:0.8}]
        this.durationB = 6
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.duration = this.durationB / (1+(caster.stats.haste/100))
            this.effect[0].timer2 = 0.8 / (1+(caster.stats.haste/100))

            applyBuff(caster,caster,this)
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue()) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    getTooltip() {
        return "Summons a whirling tornado around you, causing "+spellPowerToNumber(this.spellPower*9)+" Physical damage over 6 sec to all enemies within 8 yards."
    }

    getBuffTooltip(caster, target, buff) {
        return "Dealing physical damage to nearby enemies every 0.8 sec."
    }
}
//------------------------------------------------
class DanceofChiJi extends Ability {
    constructor() {
        super("Dance of Chi-Ji", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 15
    }

    getTooltip() {
        return "Spending Chi has a chance to make your next Spinning Crane Kick free and deal an additional 200% damage."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next Spinning Crane Kick is free and deals an additional 200% damage."
    }

    applyBuff(caster) {
        if (getChance(10*(1+(caster.stats.haste/100)))) {
            applyBuff(caster,caster,this)
        }
    }

}
//------------------------------------------------------------------------------------------------ROW7
class SpiritualFocus extends Ability {
    constructor() {
        super("Spiritual Focus", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.chiSpent = 0
    }
        //TODO:
    getTooltip() {
        return "Every 2 Chi you spend reduces the cooldown of Storm, Earth and Fire by 1.0 sec."
    }

    reduceCd(caster,chi) {
        this.chiSpent += chi
        if (this.chiSpent>1) {
            caster.abilities["Storm, Earth, and Fire"] -=1
            this.chiSpent -= 2
        }
    }
}
//------------------------------------------------
class WhirlingDragonPunch extends Ability {
    constructor() {
        let name = "Whirling Dragon Punch"
        let cost = 0
        let gcd = 1
        let castTime = 1
        let cd = 24
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.hasteCd = true
        this.spellPower = 2.487957

    }

    getTooltip() {
        return "Performs a devastating whirling upward strike, dealing "+spellPowerToNumber(this.spellPower)+" damage to all nearby enemies. Only usable while both Fists of Fury and Rising Sun Kick are on cooldown."
    }

    startCast(caster,pet = false) {
        if (this.checkStart(caster) && caster.abilities["Rising Sun Kick"].cd<caster.abilities["Rising Sun Kick"].maxCd && caster.abilities["Fists of Fury"].cd<caster.abilities["Fists of Fury"].maxCd ) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                        doDamage(caster, targets[i], this)
                }
            }

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost,this.secCost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}

//------------------------------------------------