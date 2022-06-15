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
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "reduceEnergyCost"
        this.effectValue = 0.5
        this.duration = 10

        this.noGcd = true
    }

    getTooltip() {
        return "Reduces the mana cost of your spells by 50% for 10 sec."
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.cd = 0
            applyBuff(caster,caster,this)
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    runBuff(target,buff) {
    }

    endBuff(target) {
    }
}
