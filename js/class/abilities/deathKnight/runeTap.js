class RuneTap extends Ability {
    constructor() {
        let name = "Rune Tap"
        let cost = -10
        let gcd = 0
        let castTime = 0
        let cd = 25
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"damageReduction",val:0.2}]
        this.duration = 4
        this.noGcd = true
        this.secCost = 1
    }

    getTooltip() {
        return"Reduces all damage you take by 20% for 4 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }
}
