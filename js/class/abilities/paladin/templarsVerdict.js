class TemplarsVerdict extends Ability {
    constructor() {
        let name = "Templar's Verdict"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.94
        this.secCost = 3
    }

    getTooltip() {
        return "Unleashes a powerful weapon strike that deals "+spellPowerToNumber(this.spellPower)+" Holy damage to an enemy target."
    }

    startCast(caster) {
        let secCost = this.secCost
        let spellPower = this.spellPower
        if (caster.abilities["Divine Purpose"].talentSelect && checkBuff(caster,caster,"Divine Purpose")) {
            secCost = 0
            spellPower *= 1.2
        }

        if (this.checkStart(caster,undefined,secCost)) {
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
                doDamage(caster, caster.castTarget, this,undefined,spellPower)
                caster.useEnergy(this.cost,secCost)
                this.setCd()
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                if (caster.abilities["Divine Purpose"].talentSelect) {
                    checkBuff(caster,caster,"Divine Purpose",true)
                    if (getChance(15)) {
                        applyBuff(caster,caster,caster.abilities["Divine Purpose"])
                    }
                }

                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
