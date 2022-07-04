class Revitalize extends Ability {
    constructor() {
        let name = "Revitalize"
        let cost = 0.8
        let gcd = 1.5
        let castTime = 10
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 100
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
    }

    getTooltip() {
        return "Returns all dead party members to life with 35% of maximum health and mana. Not castable in combat.\n."
    }

    startCast(caster) {
        if (this.checkStart(caster) && !inCombat) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
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
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (friendlyTargets[i].isDead && this.checkDistance(caster,friendlyTargets[i])) {
                resurrect(caster,friendlyTargets[i],0.35)
            }
        }
        caster.useEnergy(this.cost)
    }
}
