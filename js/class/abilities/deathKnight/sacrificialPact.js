class SacrificialPact extends Ability {
    constructor() {
        let name = "Sacrificial Pact"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.75

    }

    getTooltip() {
        return "Sacrifice your ghoul to deal (75% of Attack power) Shadow damage to all nearby enemies and heal for 25% of your maximum health."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let canUse = false


            if (caster.pets[caster.abilities["Raise Dead"].petId]!==undefined) {
                if (caster.pets[caster.abilities["Raise Dead"].petId] && caster.pets[caster.abilities["Raise Dead"].petId].name==="Raise Dead") {
                    caster.pets[caster.abilities["Raise Dead"].petId] = undefined
                    canUse  = true
                }
            }


            if (canUse) {
                for (let i = 0; i < enemies.length; i++) {
                    if (!enemies[i].isDead && this.checkDistance(caster, enemies[i], 8, true)) {
                        doDamage(caster, enemies[i], this)
                    }
                }

                doHeal(caster, caster, this, undefined, undefined, false, undefined, undefined, caster.maxHealth * 0.25)
                this.setCd()
                this.setGcd(caster)
                caster.useEnergy(this.cost, this.secCost)
                return true
            }
        }
        return false
    }
}
