class Swipe extends Ability {
    constructor() {
        let name = "Swipe"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.36
        this.needForm = "Bear Form"
        this.canCastForm = "Cat Form"
    }

    getTooltip() {
        return "Swipe all nearby enemies, inflicting "+spellPowerToNumber(this.spellPower)+" Physical damage."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    doDamage(caster, enemies[i], this)
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.spec==="guardian") {
                if (getChance(15)) {
                    caster.useEnergy(-4,0)
                    caster.abilities["Mangle"].cd = caster.abilities["Mangle"].maxCd
                }
            }
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
