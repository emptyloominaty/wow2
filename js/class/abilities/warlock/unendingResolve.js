class UnendingResolve extends Ability {
    constructor() {
        let name = "Unending Resolve"
        let cost = 2
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.4}]

        this.duration = 8
        this.noGcd = true
    }

    getTooltip() {
        return "Hardens your skin, reducing all damage you take by 40% and granting immunity to interrupt and silence effects for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 40%<br>" +
            "Immune to interrupt and silence effects."
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
