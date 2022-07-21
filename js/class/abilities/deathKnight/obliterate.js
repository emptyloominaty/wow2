class Obliterate extends Ability {
    constructor() {
        let name = "Obliterate"
        let cost = -20
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.89*1.2*1.05
        this.secCost = 2

    }

    getTooltip() {
        return "A brutal attack that deals "+spellPowerToNumber(this.spellPower)+" Physical damage."
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
                //let target = caster.castTarget
                let crit = false
                let spellPower = this.spellPower
                if (checkBuff(caster,caster,"Killing Machine",true)) {
                    crit = true
                    spellPower = spellPower * (1+(caster.stats.mastery/100)) //FROST
                }
                if (getChance(45)) {
                    applyBuff(caster,caster,caster.abilities["Rime"])
                }

                doDamage(caster, caster.castTarget, this,undefined,spellPower,undefined,crit)

                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                this.setGcd(caster)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
