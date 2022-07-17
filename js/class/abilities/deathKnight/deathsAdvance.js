class DeathsAdvance extends Ability {
    constructor() {
        let name = "Death's Advance"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"moveSpeed",val:0.35}]
        this.duration = 10
        this.noGcd = true
    }

    getTooltip() { //TODO:Passive: You cannot be slowed below 70% of normal speed.
        //TODO: immune to forced movement effects and knockbacks.
        return "For 8 sec, your movement speed is increased by 35%, you cannot be slowed below 100% of normal speed, and you are immune to forced movement effects and knockbacks."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your movement speed is increased by 35%, you cannot be slowed below 100% of normal speed, and you are immune to forced movement effects and knockbacks."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }
}
