class LifeTap extends Ability {
    constructor() {
        let name = "Life Tap"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 3
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.secCost = -1
    }

    getTooltip() {
        return "Grants 1 Soul Shard at the cost of 10% of your maximum health."
    }


    startCast(caster) {
        if (this.checkStart(caster) && caster.health/caster.maxHealth>0.1) {
            caster.health -= caster.maxHealth*0.1
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }
}
