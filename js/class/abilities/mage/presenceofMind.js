class PresenceofMind extends Ability {
    constructor() {
        let name = "Presence of Mind"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.maxStacks = 3
        this.duration = 30

    }

    getTooltip() {
        return "Causes your next 3 Arcane Blasts to be instant cast."
    }

    getBuffTooltip(caster, target, buff) {
        return "Arcane Blast is instant cast."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this,3,true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
