class ManaTea extends Ability {
    constructor() {
        let name = "Mana Tea"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "reduceEnergyCost"
        this.effectValue = 0.5
        this.duration = 10
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.energy>this.cost && this.checkCd(caster)) {
            this.cd = 0
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
        }
    }

    runBuff(target,buff) {
    }

    endBuff(target) {
    }
}
