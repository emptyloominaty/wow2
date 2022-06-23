class WaterShield extends Ability {
    constructor() {
        let name = "Water Shield"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"restoreMana",val:0.1}]
        this.maxStacks = 3
        this.duration = 3600
    }

    getTooltip() {
        return "The caster is surrounded by globes of water, granting 50 mana per 5 sec. When a melee attack hits the caster, the caster regains 2% of their mana. This effect can only occur once every few seconds."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            applyBuff(caster,caster,this,3,true)

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }
}