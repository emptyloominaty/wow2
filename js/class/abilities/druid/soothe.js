class Soothe extends Ability {
    constructor(resto = true) {
        let name = "Soothe"
        let cost = 1.12
        let gcd = 1.5
        let castTime = 0
        let cd = 10
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        if (!resto) {
            this.cost = 0
        }
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Soothes the target, dispelling all enrage effects.\n"
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                if (this.isEnemy(caster,target) || !target.isDead || target!=="" || Object.keys(target).length !== 0) {
                    if (caster.isChanneling) {
                        caster.isChanneling = false
                    }
                    dispelEnemyEnrage(caster,target)
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
