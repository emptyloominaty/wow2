class Rapture extends Ability {
    constructor() {
        let name = "Rapture"
        let cost = 3.1
        let gcd = 1.5
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 8
    }

    getTooltip() {
        return "Immediately Power Word: Shield your target, and for the next 8 sec, Power Word: Shield absorbs an additional 200% and may be cast on targets with Weakened Soul."
    }


    getBuffTooltip(caster, target, buff) {
        return "Power Word: Shield absorbs an additional 200% and may be cast on targets with Weakened Soul."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            caster.casting.target = caster.castTarget
            caster.abilities["Power Word: Shield"].endCast(caster)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(0)
            return true
        }
        return false
    }
}
