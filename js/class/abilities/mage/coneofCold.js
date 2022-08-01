class ConeofCold extends Ability {
    constructor() {
        let name = "Cone of Cold"
        let cost = 4
        let gcd = 1.5
        let castTime = 0
        let cd = 12
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 12
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.375
        this.duration = 5
        this.effect = [{name:"moveSpeed",val:0.5}]

    }

    getTooltip() {
        return "Targets in a cone in front of you take (37.5% of Spell power) Frost damage and have movement slowed by 50% for 5 sec."
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
                        applyDebuff(caster, targets[i], this)
                    }
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
