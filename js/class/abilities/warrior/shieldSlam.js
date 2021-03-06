class ShieldSlam extends Ability {
    constructor() {
        let name = "Shield Slam"
        let cost = -15
        let gcd = 1.5
        let castTime = 0
        let cd = 9
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.851*1.17*1.2
        this.hasteCd = true
    }

    getTooltip() {
        return "Slams the target with your shield, causing "+spellPowerToNumber(this.spellPower)+" Physical damage.<br><br>" +
            "Devastate, Thunder Clap, Revenge, and Execute have a 30% chance to reset the cooldown of Shield Slam." //TODO:
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            let spellPower = this.spellPower
            if (checkBuff(caster,caster,"Shield Block")) {
                spellPower *= 1.3
            }
            if (caster.abilities["Punish"].talentSelect) {
                spellPower *= 1.2
            }

            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined, spellPower)
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
                        doDamage(caster, caster.targetObj, this,undefined, spellPower)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.abilities["Punish"].talentSelect) {
                    applyDebuff(caster,target,caster.abilities["Punish"])
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
