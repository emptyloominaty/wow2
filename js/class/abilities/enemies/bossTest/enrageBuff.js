class EnrageBuff extends Ability {
    constructor() {
        let name = "Enrage Buff"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.dispellable = "enrage"

        this.effect = [{name:"increaseStat",stat:"haste",val:30}]
        this.duration = 25

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            applyBuff(caster,caster,this)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
