class Lifebloom extends Ability {
    constructor() {
        let name = "Lifebloom"
        let cost = 1.6
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.25
        this.spellPowerEnd = 1.38
        this.duration = 15
        this.caster = {}
    }

    getTooltip() {
        return "Heals the target for "+spellPowerHotToNumber(this.spellPower)+" over 15 sec. When Lifebloom expires or is dispelled, the target is instantly healed for "+spellPowerToNumber(this.spellPowerEnd)+"." +
            "May be active on one target at a time."
    }

    getBuffTooltip(caster, target, buff) {
        return "Healing "+spellPowerHotToNumber(this.spellPower/15,caster)+" every 1 sec.<br>" +
            "Blooms for additional healing when effect expires or is dispelled."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.caster = caster
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            limitBuff(caster,"Lifebloom")
            applyHot(caster,caster,this)
        } else {
            limitBuff(caster,"Lifebloom")
            applyHot(caster,target,this)
        }
        caster.useEnergy(this.cost)
    }

    endBuff(target) {
        doHeal(this.caster,target,this,undefined,this.spellPowerEnd)
    }
}
