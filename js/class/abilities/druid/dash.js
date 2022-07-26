class Dash extends Ability {
    constructor() {
        let name = "Dash"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"moveSpeed",val:0.6}]
        this.duration = 10
        this.needForm = "Cat Form"
    }

    getTooltip() {
        return "Shift into Cat Form and increase your movement speed by 60% while in Cat Form for 10 sec."

    }

    getBuffTooltip(caster, target, buff) {
        return "Increased movement speed by 60% while in Cat Form."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
