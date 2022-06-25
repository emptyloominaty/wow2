class SpiritwalkersGrace extends Ability {
    constructor(ele=false) {
        let name = "Spiritwalker's Grace"
        let cost = 2.82
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.noGcd = true

        this.effect = [{name:"canMoveWhileCasting"},{name:"moveSpeed",val:0}]
        this.duration = 15
        if (ele) {
            this.cost = 0
        }
    }

    getTooltip() {
        return "Calls upon the guidance of the spirits for 15 sec, permitting movement while casting Shaman spells. Castable while casting."
    }

    getBuffTooltip(caster, target, buff) {
        return "Able to move while casting all Shaman spells."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            applyBuff(caster,caster,this)


            this.setCd()
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }

    endBuff(caster) {
        caster.canMoveWhileCasting = false
    }
}