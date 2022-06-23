class AstralShift extends Ability {
    constructor() {
        let name = "Astral Shift"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.4}]

        this.duration = 12
        this.noGcd = true
    }

    getTooltip() {
        return "Shift partially into the elemental planes, taking 40% less damage for 8 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.cd = 0
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
