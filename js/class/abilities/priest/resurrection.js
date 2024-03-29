class Resurrection extends Ability {
    constructor(shadow = false) {
        let name = "Resurrection"
        let cost = 0.8
        let gcd = 1.5
        let castTime = 10
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        if (shadow) {
            this.cost = 0
        }
    }

    getTooltip() {
        return "Brings a dead ally back to life with 35% health and mana. Cannot be cast when in combat."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.targetObj) && !inCombat && caster.targetObj.isDead  && !caster.targetObj.enemy) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.targetObj}
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

        if (target.isDead && this.checkDistance(caster,target) && !target.enemy) {
            resurrect(caster,target,0.35)
        }

        caster.useEnergy(this.cost)
    }
}
