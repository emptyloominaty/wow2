class Purge extends Ability {
    constructor() {
        let name = "Purge"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 30
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
    }

    getTooltip() {
        return "Purges the enemy target, removing 1 beneficial Magic effect."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                if (this.isEnemy(caster,target) || !target.isDead || target!=="" || Object.keys(target).length !== 0) {
                    if (caster.isChanneling) {
                        caster.isChanneling = false
                    }
                    dispelEnemy(caster,target,1)
                    caster.useEnergy(this.cost)
                    this.setCd()
                    this.setGcd(caster)
                    return true
                }
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
