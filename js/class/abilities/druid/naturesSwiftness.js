class NaturesSwiftness extends Ability {
    constructor() {
        let name = "Nature's Swiftness"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 20
    }

    getTooltip() { //TODO:Entangling Roots
        return "Your next Regrowth, Rebirth, or Entangling Roots is instant, free, castable in all forms, and heals for an additional 100%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next Regrowth, Rebirth, or Entangling Roots is instant, free, castable in all forms, and heals for an additional 100%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
