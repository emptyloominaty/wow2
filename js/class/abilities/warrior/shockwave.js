class Shockwave extends Ability {
    constructor() {
        let name = "Shockwave"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 40
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.082*1.17
        this.hasteCd = true
        this.duration = 2
        this.effect = [{name:"stun"}]

    }

    getTooltip() {
        return "Sends a wave of force in a frontal cone, causing "+spellPowerToNumber(this.spellPower)+" damage and stunning all enemies within 10 yards for 2 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length; i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                        applyDebuff(caster, targets[i], this)
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
