class SpiritWalk extends Ability {
    constructor() {
        let name = "Spirit Walk"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.noGcd = true
        this.effect = [{name:"moveSpeed",val:0.6}]
        this.duration = 15
    }

    getTooltip() {//TODO:Removes all movement impairing effects
        return "Removes all movement impairing effects and increases your movement speed by 60% for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Increases movement speed by 60%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }

}