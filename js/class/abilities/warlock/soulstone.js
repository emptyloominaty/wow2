class Soulstone extends Ability {
    constructor() {
        let name = "Soulstone"
        let cost = 1
        let gcd = 1.5
        let castTime = 3
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
    }

    getTooltip() {
        return "Stores the soul of the target party or raid member, allowing resurrection upon death." + //TODO: applyBuff
            "Also castable to resurrect a dead target<br>" +
            "<br>" +
            "Targets resurrect with 60% health and at least 20% mana."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.targetObj) && crCount>1 && caster.targetObj.isDead  && !caster.targetObj.enemy) {
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
            resurrect(caster,target,1)
            crCount --
        }

        caster.useEnergy(this.cost)
    }
}
