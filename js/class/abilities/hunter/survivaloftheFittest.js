class SurvivaloftheFittestHunter extends Ability {
    constructor() {
        let name = "Survival of the Fittest"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.2}]

        this.duration = 6
        this.noGcd = true
    }

    getTooltip() {
        return "Reduces all damage you take by 20% for 6 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "All damage taken reduced by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
