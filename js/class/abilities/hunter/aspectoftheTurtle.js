class AspectoftheTurtle extends Ability {
    constructor() {
        let name = "Aspect of the Turtle"
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

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.3},{name:"immuneToMagic"},{name:"interrupt"}]

        this.duration = 8
        this.noGcd = true
    }

    getTooltip() {
        return "Deflects all attacks and reduces all damage you take by 30% for 8 sec, but you cannot attack."
    }

    getBuffTooltip(caster, target, buff) {
        return "Deflecting all attacks.<br>" +
            "Damage taken reduced by 30%"
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
