class Revenge extends Ability {
    constructor() {
        let name = "Revenge"
        let cost = 20
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
        this.spellPower = 0.63*1.17
        this.hasteCd = true

    }

    getTooltip() {
        return "Swing in a wide arc, dealing (63% of Attack power) Physical damage to all enemies in front of you. Deals reduced damage beyond 5 targets.<br><br>" +
            "Your successful dodges and parries have a chance to make your next Revenge cost no Rage." //TODO:
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
