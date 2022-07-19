class DivineStorm extends Ability {
    constructor() {
        let name = "Divine Storm"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.474
        this.secCost = 3
    }

    getTooltip() {
        return "Unleashes a whirl of divine energy, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to all nearby enemies."
    }

    startCast(caster) {
        let secCost = this.secCost
        let spellPower = this.spellPower
        if (caster.abilities["Divine Purpose"].talentSelect && checkBuff(caster,caster,"Divine Purpose")) {
            secCost = 0
            spellPower *= 1.2
        }

        if (this.checkStart(caster,undefined,secCost)) {

            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true)) {
                    doDamage(caster, enemies[i], this,undefined,spellPower)
                }
            }

            caster.useEnergy(this.cost,secCost)
            this.setCd()
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setGcd(caster)
            if (caster.abilities["Divine Purpose"].talentSelect) {
                checkBuff(caster,caster,"Divine Purpose",true)
                if (getChance(15)) {
                    applyBuff(caster,caster,caster.abilities["Divine Purpose"])
                }
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
