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
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //7
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
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
    }

    getTooltip() { //TODO:
        return "Each Chi you spend reduces damage taken by 2% for 5 sec, stacking up to 5 times."
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