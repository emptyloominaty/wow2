class ArdentDefender extends Ability {
    constructor() {
        let name = "Ardent Defender"
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

        this.effect = [{name:"damageReduction",val:0.2}]
        this.duration = 8
        this.noGcd = true
    }

    getTooltip() {
        return "Reduces all damage you take by 20% for 8 sec.<br>" +
            "<br>" +
            "While Ardent Defender is active, the next attack that would otherwise kill you will instead bring you to 20% of your maximum health."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 20%.<br>" +
            "The next attack that would otherwise kill you will instead bring you to 20% of your maximum health." //TODO:
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
