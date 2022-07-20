class ShieldWall extends Ability {
    constructor() {
        let name = "Shield Wall"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 240
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.5}]

        this.duration = 8
        this.noGcd = true
    }

    getTooltip() {
        return "Reduces all damage you take by 50% for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 50%."
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
