class MagicBuff extends Ability {
    constructor() {
        let name = "Magic Buff"
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
        this.dispellable = "magic"

        this.effect = [{name:"increaseStat",stat:"primary",val:400}]
        this.duration = 25

    }

    getBuffTooltip(caster, target, buff) {
        return "Increase primary stat by 400."
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
