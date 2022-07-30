class Backstab extends Ability {
    constructor() {
        let name = "Backstab"
        let cost = 35
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.493272*1.21*1.2
        this.secCost = -1
    }

    getTooltip() {
        return "Stab the target, causing "+spellPowerToNumber(this.spellPower)+" Physical damage. Damage increased by 20% when you are behind your target" + //TODO:BEHIND
            "and critical strikes apply Find Weakness for 6 sec.<br>" +
            "<br>" +
            "Awards 1 combo point."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,caster.abilities["Find Weakness"],undefined,undefined,undefined,undefined,6) //TODO:ONLY CRITS
                    doDamage(caster,caster.castTarget,this)
                    if (caster.abilities["Weaponmaster"].talentSelect && getChance(15)) {
                        doDamage(caster,caster.castTarget,this)
                    }
                    done = true
                }
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
