class DivineStorm extends Ability {
    constructor() {
        let name = "Divine Storm"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.474
        this.secCost = 3
    }

    getTooltip() {
        return "Unleashes a whirl of divine energy, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to all nearby enemies."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true)) {
                    doDamage(caster, enemies[i], this)
                }
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
