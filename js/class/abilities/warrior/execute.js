class Execute extends Ability {
    constructor() {
        let name = "Execute"
        let cost = -20

        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = ((1.128+1.27)*1.15)*1.29
        this.health = 0.2

        this.hasteCd = true

        this.effect = ""
        this.effectValue = 0

    }

    getTooltip() {
        return "Attempt to finish off a wounded foe, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage. Only usable on enemies that have less than 20% health."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && caster.castTarget.health/caster.castTarget.maxHealth<this.health) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    caster.abilities["WhirlwindBuff"].startCast(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        caster.abilities["WhirlwindBuff"].startCast(caster,caster.targetObj,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }
}
