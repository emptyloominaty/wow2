class LightofDawn extends Ability {
    constructor() {
        let name = "Light of Dawn"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 15
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.05
        this.secCost = 3
        this.maxTargets = 5
    }

    getTooltip() {
        return "Unleashes a wave of holy energy, healing up to 5 injured allies within a 15 yd frontal cone for "+spellPowerToNumber(this.spellPower)+"."
    }


    startCast(caster) {
        let secCost = this.secCost
        let spellPower = this.spellPower
        if (caster.abilities["Divine Purpose"].talentSelect && checkBuff(caster,caster,"Divine Purpose")) {
            secCost = 0
            spellPower *= 1.2
        }

        if (this.checkStart(caster,undefined,secCost)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let dir = caster.direction
            let ttt = 0
            let targets = sortFriendlyTargetsByHealth(true)
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],15,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,90)) {
                        doHeal(caster, targets[i], this,undefined,spellPower)
                        ttt++
                        if (ttt>=this.maxTargets) {
                            break
                        }
                    }
                }
            }
            if (caster.abilities["Divine Purpose"].talentSelect) {
                checkBuff(caster,caster,"Divine Purpose",true)
                if (getChance(15)) {
                    applyBuff(caster,caster,caster.abilities["Divine Purpose"])
                }
            }
            caster.useEnergy(this.cost,secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
