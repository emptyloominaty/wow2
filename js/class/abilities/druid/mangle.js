class Mangle extends Ability {
    constructor(guardian=false) {
        let name = "Mangle"
        let cost = -10
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.505
        this.needForm = "Bear Form"
        this.canCastForm = "Cat Form"
        this.hasteCd = true
        if (guardian) {
            this.spellPower *= 1.28
        }
    }

    getTooltip() {
        return "Mangle the target for "+spellPowerToNumber(this.spellPower)+" Physical damage. Deals 20% additional damage against bleeding targets.<br><br>" +
            "Generates 10 Rage. "
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            let spellPower = this.spellPower

            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    if (checkDebuff(caster,caster.castTarget,"Thrash")) {
                        spellPower *= 1.2
                    }
                    doDamage(caster,caster.castTarget,this,undefined,spellPower)
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
                    target = caster.targetObj
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        if (checkDebuff(caster,caster.targetObj,"Thrash")) {
                            spellPower *= 1.2
                        }
                        doDamage(caster, caster.targetObj, this,undefined,spellPower)
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

}
