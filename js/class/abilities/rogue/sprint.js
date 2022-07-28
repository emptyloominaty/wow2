class Sprint extends Ability {
    constructor() {
        let name = "Sprint"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 8
        this.effect = [{name:"moveSpeed",val:0.7}]
        this.dontBreakStealth = true
    }

    getTooltip() {
        return "Increases your movement speed by 70% for 8 sec. Usable while stealthed."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            applyBuff(caster,caster,this)

            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true


        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
