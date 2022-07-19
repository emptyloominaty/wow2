class Cleave extends Ability {
    constructor() {
        let name = "Cleave"
        let cost = 20

        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.7*1.13

        this.hasteCd = true


    }

    getTooltip() {
        return "Strikes all enemies in front of you for "+spellPowerToNumber(this.spellPower)+" Physical damage, inflicting Deep Wounds. Cleave will consume your Overpower effect to deal increased damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                    }
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
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
