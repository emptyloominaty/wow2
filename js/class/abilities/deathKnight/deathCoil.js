class DeathCoil extends Ability {
    constructor() {
        let name = "Death Coil"
        let cost = 40
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "shadow"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.503
        this.spellPowerHeal = 2.65
    }

    getTooltip() {
        return "Fires a blast of unholy energy at the target, causing "+spellPowerToNumber(this.spellPower)+" Shadow damage to an enemy or healing an Undead ally for "+spellPowerToNumber(this.spellPowerHeal)+" health."

        //TODO: UNHOLY: "Reduces the cooldown of Dark Transformation by 1 sec"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            } else if (checkBuff(caster,caster,"Lichborne")){
                doHeal(caster,caster,this,undefined,this.spellPowerHeal)
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
