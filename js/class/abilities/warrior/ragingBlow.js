class RagingBlow extends Ability {
    constructor() {
        let name = "Raging Blow"
        let cost = -12

        let gcd = 1.5
        let castTime = 0
        let cd = 8
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = (0.611+0.611)*1.29

        this.hasteCd = true

        this.effect = ""
        this.effectValue = 0

    }

    getTooltip() {
        return "A mighty blow with both weapons that deals a total of "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster) ) {
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

                //20% cd reset chance
                if (getChance(80)) {
                    this.setCd(caster)
                }
                this.setGcd(caster)
                caster.useEnergy(this.cost,this.secCost)
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
