class ChaosNova extends Ability {
    constructor() {
        let name = "Chaos Nova"
        let cost = 30
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "chaos"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"stun"}]
        this.duration = 2
        this.spellPower = 0.22525

    }

    getTooltip() {
        return "Unleash an eruption of fel energy, dealing "+spellPowerToNumber(this.spellPower)+" Chaos damage and stunning all nearby enemies for 2 sec."
        //TODO: HAVOC: Each enemy stunned by Chaos Nova has a 30% chance to generate a Lesser Soul Fragment
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.cd = 0
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                    applyDebuff(caster, enemies[i], this,"stun")
                    doDamage(caster,enemies[i],this)
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
