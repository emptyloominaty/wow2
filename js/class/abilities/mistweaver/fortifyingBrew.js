class FortifyingBrew extends Ability {
    constructor() {
        let name = "Fortifying Brew"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "damageReduction"
        this.effectValue = 0.2 //20%

        this.effect2 = "healthIncreased"
        this.effect2Value = 0.2 //20%

        this.duration = 15
    }

    getTooltip() {
        return "Turns your skin to stone for 15 sec, increasing your current and maximum health by 20% and reducing all damage you take by 20%."
    }


    run(caster) {
    }

    startCast(caster) {
        if (caster.energy>this.cost && this.checkCd(caster)) {
            this.cd = 0
            applyBuff(caster,caster,this)
            caster.damageReduction += this.effectValue
            caster.healthIncreased += this.effect2Value
            let a = caster.maxHealth
            caster.maxHealth *= 1+this.effect2Value
            let b = caster.maxHealth
            caster.health += b-a

            caster.useEnergy(this.cost)
        }
    }

    runBuff(target,buff) {
    }

    endBuff(target) {
        target.damageReduction -= this.effectValue
        target.healthIncreased -= this.effect2Value
        target.maxHealth /= 1+this.effect2Value
        if (target.health>target.maxHealth) {
            target.health = target.maxHealth
        }
    }
}
