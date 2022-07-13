class ShadowWordDeath extends Ability {
    constructor() {
        let name = "Shadow Word: Death"
        let cost = 0.5 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 20
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.85*1.17
    }

    getTooltip() { //TODO Discipline - Does not trigger Atonement
        return "A word of dark binding that inflicts "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+
            " Shadow damage to the target. If the target is not killed by Shadow Word: Death, the caster takes damage equal to the damage inflicted upon the target.<br>" +
            "<br>" +
            "Damage increased by 150% to targets below 20% health."
    }

    run(caster) {
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
                        let spellPower = this.spellPower
                        if (caster.castTarget.health/caster.castTarget.maxHealth<0.2) {
                            spellPower *= 2.5
                        }
                        doDamage(caster, caster.castTarget, this,undefined, spellPower)
                        if (!caster.castTarget.isDead) {
                            doDamage(caster.castTarget, caster, this,undefined, spellPower)
                        }
                        caster.useEnergy(this.cost,this.secCost)
                        this.setCd()
                    }
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
