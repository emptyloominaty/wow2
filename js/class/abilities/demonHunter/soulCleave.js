class SoulCleave extends Ability {
    constructor() {
        let name = "Soul Cleave"
        let cost = 30
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.702
        this.spellPowerHeal = 0.5

    }

    getTooltip() {
        return "Viciously strike all enemies in front of you for "+spellPowerToNumber(this.spellPower)+" Physical damage and heal yourself for "+spellPowerToNumber(this.spellPowerHeal)+".<br>" +
            "<br>" +
            "Consumes up to 2 Soul Fragments and heals you for an additional "+spellPowerToNumber(this.spellPowerHeal)+" for each Soul Fragment consumed"
    }

    startCast(caster) {
        if (this.checkStart(caster) && checkBuff(caster,caster,"Soul Fragment")) {
            let done = false

            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                        doHeal(caster,caster,this,undefined,this.spellPowerHeal)
                        done = true
                    }
                }
            }

            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                let consumed = caster.abilities["Consume Soul"].consume(caster,2)
                for (let i = 0; i<consumed; i++) {
                    doHeal(caster,caster,this,undefined,this.spellPowerHeal)
                }
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
