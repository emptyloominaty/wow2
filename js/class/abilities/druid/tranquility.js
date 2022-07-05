class Tranquility extends Ability {
    constructor() {
        let name = "Tranquility"
        let cost = 3.68
        let gcd = 1.5
        let castTime = 8
        let cd = 180
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.36875
        this.spellPowerHot = 0.068
        this.maxStacks = 8
        this.duration = 8
        this.effect = [{name:"hot",timer:0}]

    }

    getTooltip() {
        return "Heals all allies within 40 yards for "+spellPowerToNumber(this.spellPower)+" over 8 sec. Each heal heals the target for another "+spellPowerHotToNumber(this.spellPowerHot)+" over 8 sec, stacking.<br>" +
            "<br>" +
            "Healing increased by 100% when not in a raid." //TODO
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(1/(1 + (caster.stats.haste / 100)))-0.1}

            if (caster.abilities["Inner Peace"].talentSelect) {
                applyBuff(caster,caster,caster.abilities["Inner Peace"])
            }

            this.setGcd(caster)
            this.setCd()
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && this.checkDistance(caster, friendlyTargets[i])) {
                doHeal(caster, friendlyTargets[i], this)
                applyBuff(caster,friendlyTargets[i],this,1,true)
            }
        }
    }
}
