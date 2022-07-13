class HolyShock extends Ability {
    constructor() {
        let name = "Holy Shock"
        let cost = 3.2
        let gcd = 1.5
        let castTime = 0
        let cd = 7.5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.68
        this.spellPowerHeal = 1.55
        this.secCost = -1
    }

    getTooltip() {
        return   "Triggers a burst of Light on the target, dealing (68% of Spell power) Holy damage to an enemy, or (155% of Spell power) healing to an ally.<br> Has an additional 30% critical effect chance<br>" +
            "<br>" +
            "Generates 1 Holy Power."
    }


    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || target.isDead ) {
                //heal self
                doHeal(caster,caster,this,undefined,this.spellPowerHeal,undefined,undefined,undefined,undefined,30)
            } else {
                //heal target
                if (this.isEnemy(caster,target)) {
                    doDamage(caster,target,this,undefined,undefined,undefined,undefined,undefined,30)
                } else {
                    doHeal(caster,target,this,undefined,this.spellPowerHeal,undefined,undefined,undefined,undefined,30)
                }

            }
            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
