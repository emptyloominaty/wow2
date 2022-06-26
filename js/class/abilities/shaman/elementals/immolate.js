class ImmolateElemental extends Ability {
    constructor(buffed = false) {
        let name = "Immolate"
        let cost = 0
        let gcd = 2
        let castTime = 1.9
        let cd = 2
        let charges = 2
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.2
        this.spellPowerDot = 0.525
        this.duration = 21

        if (buffed) {
            this.spellPower = 0.675*1.8
            this.spellPowerDot = 0.525*1.8
        }

    }

    getTooltip() {
        return "Burns an enemy, then inflicts additional Fire damage every 3 sec. for 21 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                if (!checkDebuff(caster.caster,caster.castTarget,"Immolate")) {
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        if (!checkDebuff(caster.caster,caster.castTarget,"Immolate")) {
                            done = true
                        }
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
                applyDot(caster.caster,target,this)
                doDamage(caster,target,this,undefined,this.spellPowerDot)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
