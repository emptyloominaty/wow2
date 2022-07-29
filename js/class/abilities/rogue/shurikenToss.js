class ShurikenToss extends Ability {
    constructor() {
        let name = "Shuriken Toss"
        let cost = 40
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.19656*1.21
        this.secCost = -1
    }

    getTooltip() {
        return "Throws a shuriken at an enemy target for "+spellPowerToNumber(this.spellPower)+" Physical damage.<br>" +
            "<br>" +
            "Awards 1 combo point."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
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
