class AspectoftheEagle extends Ability {
    constructor() {
        let name = "Aspect of the Eagle"
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
        this.duration = 15
        this.noGcd = true
    }

    getTooltip() { //Mongoose Bite
        return "Increases the range of your Raptor Strike to 40 yds for 15 sec.\n"
    }

    getBuffTooltip(caster, target, buff) {
        return "The range of Raptor Strike is increased to 40 yds."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.abilities["Raptor Strike"].range = 40
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Raptor Strike"].range = 5
    }
}
