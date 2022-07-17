class VampiricBlood extends Ability {
    constructor() {
        let name = "Vampiric Blood"
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

        this.effect = [{name:"increaseHealth",val:0.3},{name:"healingIncrease2",val:0.3}]
        this.duration = 10
        this.noGcd = true
    }

    getTooltip() {  //TODO:increase all absorbs by 30%
        return "Embrace your undeath, increasing your maximum health by 30% and increasing all healing and absorbs received by 30% for 10 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Maximum health increased by 30%. Healing and absorbs received increased by 30%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)

            applyBuff(caster,caster,this)
            caster.health += (caster.stats.stamina*20) * 0.3

            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }
}
