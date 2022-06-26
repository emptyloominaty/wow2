class CallLightningElemental extends Ability {
    constructor(buffed = false) {
        let name = "Call Lightning"
        let cost = 0
        let gcd = 3
        let castTime = 3
        let cd = 10
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.3

        if (buffed) {
            this.spellPower = 0.3*1.8
        }

    }

    getTooltip() {
        return "Call down a lightning strike on an enemy, dealing (30% of Spell power) Nature damage, and leaving the Storm Elemental charged with energy for 15 sec. While charged, the Storm Elemental's damage is increased by 300%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
