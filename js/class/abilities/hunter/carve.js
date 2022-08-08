class Carve extends Ability {
    constructor() {
        let name = "Carve"
        let cost = 35
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.28
        this.hasteCd = true
    }

    getTooltip() {
        return "A sweeping attack that strikes all enemies in front of you for "+spellPowerToNumber(this.spellPower)+" Physical damage.<br>" +
            "Reduces the remaining cooldown on Wildfire Bomb by 1 sec for each target hit."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                        caster.abilities["Wildfire Bomb"].incCd(caster,1,false)
                    }
                }
            }


            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
