class BladeFlurry extends Ability {
    constructor() {
        let name = "Blade Flurry"
        let cost = 15
        let gcd = 1
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 12
        this.spellPower = 0.4
        this.damage = 0.6
    }

    getTooltip() {
        return "Strikes up to nearby 5 targets for "+spellPowerToNumber(this.spellPower)+" Physical damage, and causes<br>" +
            "<br>" +
            "Causes your single target attacks to also strike up to 4 nearby enemies for 60% of normal damage for 12 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Attacks striking nearby enemies."
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
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
