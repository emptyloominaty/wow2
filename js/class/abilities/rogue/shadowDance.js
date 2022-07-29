class ShadowDance extends Ability {
    constructor() {
        let name = "Shadow Dance"
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
        this.noGcd = true
        this.duration = 8
        this.effect = [{name:"increaseDamage",val:0.15}]
    }

    getTooltip() {
        return "Allows use of all Stealth abilities and grants all the combat benefits of Stealth for 8 sec, and increases damage by 15%. Effect not broken from taking damage or attacking."
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

    runBuff(caster, buff, id) {
        caster.isStealthed = true
    }

}
