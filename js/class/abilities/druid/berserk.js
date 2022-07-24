class Berserk extends Ability {
    constructor() {
        let name = "Berserk"
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

        this.needForm = "Bear Form"
        this.duration = 15
        this.noGcd = true
    }

    getTooltip() {
        return "Go berserk for 15 sec, reducing the cooldowns of Mangle, Thrash, Growl, and Frenzied Regeneration by 50% and the cost of Ironfur by 50%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Cooldowns of Mangle, Thrash, Growl, and Frenzied Regeneration are reduced by 50%. Ironfur cost reduced by 50%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.abilities["Mangle"].maxCd /= 2
            caster.abilities["Thrash"].maxCd /= 2
            caster.abilities["Growl"].maxCd /= 2
            caster.abilities["Frenzied Regeneration"].maxCd /= 2
            caster.abilities["Ironfur"].cost /= 2

            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Mangle"].maxCd *= 2
        caster.abilities["Trash"].maxCd *= 2
        caster.abilities["Growl"].maxCd *= 2
        caster.abilities["Frenzied Regeneration"].maxCd *= 2
        caster.abilities["Ironfur"].cost *= 2
    }


}
