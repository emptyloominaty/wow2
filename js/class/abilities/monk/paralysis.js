class Paralysis extends Ability {
    constructor(wwbm = false) {
        let name = "Paralysis"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"incapacitate"}]
        this.duration = 60

        if (wwbm) {
            this.cost = 20
            this.gcd = 1
            this.hasteGcd = false
        }
    }

    getTooltip() {
        return "Incapacitates the target for 1 min. Limit 1. Damage will cancel the effect."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,this)
                    done = true
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
