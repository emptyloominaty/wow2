class CrusaderStrike extends Ability {
    constructor() {
        let name = "Crusader Strike"
        let cost = 0.44
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.765
        this.hasteCd = true
        this.secCost = -1

    }

    getTooltip() {
        return "Strike the target for "+spellPowerToNumber(this.spellPower)+" Physical damage.<br>" +
            "<br>" +
            "Generates 1 Holy Power."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done && Object.keys(caster.castTarget).length !== 0) {
                if (this.isEnemy(caster,caster.castTarget)) {
                    if (this.checkDistance(caster,caster.castTarget) && !caster.castTarget.isDead) {
                        doDamage(caster, caster.castTarget, this)
                        caster.useEnergy(this.cost,this.secCost)
                        this.setCd()
                    }
                }
                if (caster.abilities["Crusader's Might"].talentSelect) {
                    caster.abilities["Holy Shock"].incCd(caster,1.5,false)
                }

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
