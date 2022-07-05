class BladeDance extends Ability {
    constructor() {
        let name = "Blade Dance"
        let cost = 35
        let gcd = 1
        let castTime = 0
        let cd = 9
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.66

    }

    getTooltip() {
        return  "Strike all nearby enemies for "+spellPowerToNumber(this.spellPower)+" Physical damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                    doDamage(caster, enemies[i], this)
                }
            }

            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
