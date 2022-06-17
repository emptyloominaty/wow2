class Roll extends Ability {
    constructor() {
        let name = "Roll"
        let cost = 0 //% mana
        let gcd = 0.8
        let castTime = 0
        let cd = 20
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "move"
        this.effectValue = 0.318*pxToMeter
        this.duration = 0.8
        this.canCastWhileRooted = false
    }

    getTooltip() {
        return "Roll a short distance."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.isCasting) {
                caster.isCasting = false
            }
            caster.isRolling = true
            this.setGcd(caster)
            this.setCd()
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
    endBuff(target) {
        target.isRolling = false
    }
}
