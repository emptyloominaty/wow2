class DiebytheSword extends Ability {
    constructor() {
        let name = "Die by the Sword"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.3},{name:"increaseStat",stat:"dodge",val:100}]

        this.duration = 8
        this.noGcd = true
    }

    getTooltip() {
        return "Increases your parry chance by 100% and reduces all damage you take by 30% for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Parry chance increased by 100%.<br>" +
            "Damage taken reduced by 30%."
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
