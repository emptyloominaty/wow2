class CrusaderStrike extends Ability {
    constructor(holy = false) {
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

        if (!holy) {
            this.cost = 0
        }

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
            if (done) {
                doDamage(caster, caster.castTarget, this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                if (caster.spec==="holyPaladin" && caster.abilities["Crusader's Might"].talentSelect) {
                    caster.abilities["Holy Shock"].incCd(caster,1.5,false)
                } else if (caster.spec==="retribution" && caster.abilities["Fires of Justice"].talentSelect && getChance(15)) {
                    caster.useEnergy(0,-1)
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
