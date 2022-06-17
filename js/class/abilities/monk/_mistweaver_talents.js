let _mistweaver_talents = function(caster) {
    caster.abilities["Mist Wrap"] = new MistWrap()
    caster.abilities["Chi Wave"] = new ChiWave(caster.spec)
    caster.abilities["Chi Burst"] = new ChiBurst(caster.spec)

    caster.abilities["Chi Torpedo"] = new ChiTorpedo()
    caster.abilities["Celerity"] = new Celerity()
    caster.abilities["Tiger's Lust"] = new TigersLust()

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
        if(spec==="mistweaver") {
            this.gcd = 1.5
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
        if (spec==="windwalker") {
            this.secCost = -1 //per target
            this.gcd = 1
        } else if (spec==="brewmaster") {
            this.gcd = 1
        }
        this.spellPower = 0.46 //dmg
        this.spellPowerHeal = 0.945 //heal
        this.healTargets = 6
    }

    getTooltip() {
        return "Hurls a torrent of Chi energy up to 40 yds forward, dealing "+spellPowerToNumber(this.spellPower)+" Nature damage to all enemies, and "+spellPowerToNumber(this.spellPowerHeal)+" healing to the Monk and all allies in its path. Healing reduced beyond 6 targets."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {

            //TODO

            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue()) {
            spellQueue.add(this,caster.gcd)
        }
        return false
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

        this.effect = [{name:"move",val:0.795*pxToMeter},{name:"moveSpeed",val:0.3}]

        this.duration = 1.1
        this.canCastWhileRooted = false
    }

    getTooltip() {
        return "Torpedoes you forward a long distance and increases your movement speed by 30% for 10 sec, stacking up to 2 times."
    }
    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.isCasting) {
                caster.isCasting = false
            }
            caster.isRolling = true
            this.setGcd(caster)
            this.setCd()
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
    endBuff(target) {
        target.isRolling = false
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
        if (this.checkStart(caster)) {
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
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7