class EnragedRegeneration extends Ability {
    constructor() {
        let name = "Enraged Regeneration"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        //TODO:Can be used while stunned
        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.3}]

        this.duration = 8
        this.noGcd = true
    }

    getTooltip() {
        return "Reduces damage taken by 30%, and Bloodthirst restores an additional 20% health. Usable while stunned. Lasts 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 30%. Bloodthirst restores an additional 20% health."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.cd = 0
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
