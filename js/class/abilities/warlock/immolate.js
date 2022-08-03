class Immolate extends Ability {
    constructor() {
        let name = "Immolate"
        let cost = 0
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.48*1.1
        this.spellPowerDot = 1.80*1.1
        this.duration = 18

    }

    getTooltip() {
        return "Burns the enemy, causing "+spellPowerToNumber(this.spellPower)+" Fire damage immediately and an additional "+spellPowerHotToNumber(this.spellPowerDot)+" Fire damage over 18 sec.<br>" +
            "<br>" +
            "Periodic damage generates 1 Soul Shard Fragment and has a 50% chance to generate an additional 1 on critical strikes."
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
                applyDot(caster,target,this)
                doDamage(caster,target,this,undefined,this.spellPowerDot)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
