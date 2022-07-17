class IceboundFortitude extends Ability {
    constructor() {
        let name = "Icebound Fortitude"
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

        this.effect = [{name:"damageReduction",val:0.3}]
        this.duration = 8
        this.noGcd = true
    }

    getTooltip() { //TODO:imunity to stun
        return "Your blood freezes, granting immunity to Stun effects and reducing all damage you take by 30% for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 30%.<br>" +
            "Immune to Stun effects."
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
