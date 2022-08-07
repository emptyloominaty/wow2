class Exhilaration extends Ability {
    constructor() {
        let name = "Exhilaration"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

    }

    getTooltip() {
        return "Heals you for 30% of maximum health."
    } //TODO:and your pet for 100% ?

    startCast(caster) {
        if (this.checkStart(caster)) {
            doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,caster.maxHealth*0.3)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
