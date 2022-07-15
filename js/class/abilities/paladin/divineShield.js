class DivineShield extends Ability {
    constructor() {
        let name = "Divine Shield"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 300
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"damageReduction",val:1}]
        this.duration = 8
    }

    getTooltip() {
        return"Grants immunity to all damage and harmful effects for 8 sec.<br>" + //TODO:Harmful effects
            "<br>" +
            "Cannot be used if you have Forbearance. Causes Forbearance for 30 sec." //TODO
    }

    getBuffTooltip(caster, target, buff) {
        return "Immune to all attacks and harmful effects."
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
