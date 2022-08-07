class MultiShot extends Ability {
    constructor() {
        let name = "Multi-Shot"
        let cost = 20
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.412

    }

    getTooltip() {
        return "Fires several missiles, hitting your current target and all enemies within 10 yards for "+spellPowerToNumber(this.spellPower)+" Physical damage."
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
                let spellPower = this.spellPower
                if (checkBuffStacks(caster,caster,"Precise Shots")) {
                    spellPower *= 1.75
                }

                let target = caster.castTarget
                doDamage(caster, target, this, undefined, spellPower)
                let enemiesHit = 0
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(target, enemies[i],10,true) ) {
                        doDamage(caster, enemies[i], this, undefined, spellPower)
                        enemiesHit ++
                    }
                }
                if (enemiesHit>2) {
                    applyBuff(caster,caster,caster.abilities["Trick Shots"])
                }

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}
