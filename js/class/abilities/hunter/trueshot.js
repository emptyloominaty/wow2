class Trueshot extends Ability {
    constructor() {
        let name = "Trueshot"
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
        this.duration = 15
        this.noGcd = true
    }

    getTooltip() {
        return "Reduces the cooldown of your Aimed Shot and Rapid Fire by 60%, and causes Aimed Shot to cast 50% faster for 15 sec.<br>" +
            "<br>" +
            "While Trueshot is active, you generate 50% additional Focus."
    }

    getBuffTooltip(caster, target, buff) {
        return "The cooldown of Aimed Shot and Rapid Fire is reduced by 60%, and Aimed Shot casts 50% faster.<br>" +
            "<br>" +
            "All Focus generation is increased by 50%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.abilities["Aimed Shot"].cd *= 0.4
            caster.abilities["Aimed Shot"].maxCd *= 0.4
            caster.abilities["Rapid Fire"].cd *= 0.4
            caster.abilities["Rapid Fire"].maxCd *= 0.4
            caster.abilities["Aimed Shot"].castTime *= 0.5
            caster.energyRegen += 2.5
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Aimed Shot"].cd /= 0.4
        caster.abilities["Aimed Shot"].maxCd /= 0.4
        caster.abilities["Rapid Fire"].cd /= 0.4
        caster.abilities["Rapid Fire"].maxCd /= 0.4
        caster.abilities["Aimed Shot"].castTime /= 0.5
        caster.energyRegen -= 2.5
    }
}
