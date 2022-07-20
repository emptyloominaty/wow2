class LastStand extends Ability {
    constructor() {
        let name = "Last Stand"
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

        this.effect = [{name:"increaseHealth",val:0.3}]

        this.duration = 15
        this.noGcd = true
    }

    getTooltip() {
        return "Increases maximum health by 30% for 15 sec, and instantly heals you for that amount."
    }

    getBuffTooltip(caster, target, buff) {
        return "Maximum health increased by 30%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            if (caster.abilities["Bolster"].talentSelect) {
                applyBuff(caster,caster,caster.abilities["Shield Block"],undefined,undefined,undefined,15)
            }
            caster.health += (caster.stats.stamina*20) * 0.3
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
