class Recklessness extends Ability {
    constructor() {
        let name = "Recklessness"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"crit",val:20}]
        this.duration = 12

    }

    getTooltip() {
        return "Go berserk, increasing all Rage generation by 100% and granting your abilities 20% increased critical strike chance for 10 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Rage generation increased by 100%.<br>" +
            "Critical strike chance of all abilities increased by 20%."

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
