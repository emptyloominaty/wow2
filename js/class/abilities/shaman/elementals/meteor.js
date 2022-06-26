class MeteorElemental extends Ability {
    constructor(buffed = false) {
        let name = "Meteor"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "fire"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.75
        if (buffed) {
           this.spellPower = this.spellPower * 1.8
        }
    }

    getTooltip() {
        return "Call down a molten meteor on your target, dealing (75% of Spell power) damage to up to 8 enemies within 10 yards of your target."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let target = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    target = caster.castTarget
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        target = caster.targetObj
                    }
                }
            }

            if (target) {
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && this.checkDistance(target, enemies[i]) ) {
                        doDamage(caster, enemies[i], this)
                    }
                }

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }
        }
        return false
    }

    endCast(caster) {
    }
}
