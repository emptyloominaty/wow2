class TigersFury extends Ability {
    constructor() {
        let name = "Tiger's Fury"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.canCastForm = "Cat Form"
        this.duration = 10
        this.noGcd = true
        this.effect = [{name:"increaseDamage",val:0.15}]
    }

    getTooltip() {
        return "Instantly restores 20 Energy, and increases the damage of all your attacks by 15% for their full duration. Lasts 10 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Attacks deal 15% additional damage for their full duration."
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
