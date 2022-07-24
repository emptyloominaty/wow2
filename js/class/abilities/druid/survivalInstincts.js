class SurvivalInstincts extends Ability {
    constructor() {
        let name = "Survival Instincts"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"damageReduction",val:0.5}]
        this.duration = 6
        this.noGcd = true
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Reduces all damage you take by 50% for 6 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "All damage taken reduced by 50%."
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
