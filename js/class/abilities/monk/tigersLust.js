class TigersLust extends Ability {
    constructor() {
        let name = "Tiger's Lust"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "moveSpeed"
        this.effectValue = 0.7
        this.duration = 6
        //TODO: REMOVE ROOTS AND SNARES
    }

    getTooltip() {
        return "Increases a friendly target's movement speed by 70% for 6 sec and removes all roots and snares."
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (this.isEnemy(caster,caster.castTarget) || (this.checkDistance(caster,caster.castTarget))>this.range || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
                //heal self
                applyBuff(caster,caster,this)
            } else {
                //heal target
                applyBuff(caster,caster.castTarget,this)
            }
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }
}
