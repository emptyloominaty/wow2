class IceLance extends Ability {
    constructor() {
        let name = "Ice Lance"
        let cost = 1
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.378*1.1
    }

    getTooltip() {
        return "Quickly fling a shard of ice at the target, dealing "+spellPowerToNumber(this.spellPower)+" Frost damage. Ice Lance damage is tripled against frozen targets."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
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
                    target = newTarget
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                let spellPower = this.spellPower

                for (let i = 0; i<target.debuffs.length; i++) {
                    if (target.debuffs[i].caster === caster) {
                        if (target.debuffs[i].name==="Winter's Chill") {
                            spellPower *= 3
                            break
                        }
                    }
                }
                if (checkBuffStacks(caster,caster,"Fingers of Frost")) {
                    spellPower *= 3
                }
                doDamage(caster,target,this,undefined,spellPower)
                caster.abilities["Icicles"].launchIcicles(caster,target)
                this.setGcd(caster)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
