class Execute extends Ability {
    constructor(fury = true) {
        let name = "Execute"
        let cost = -20
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

        this.spellPower = ((2*1.7+1.27)*1.15)*1.29
        this.lessthanhealth = 0.2
        this.hasteCd = true

        if (!fury) {
            this.cd = 0
            this.maxCd = 0
            this.cost = 30
            this.spellPower = 2*1.7*1.13
        }

    }

    getTooltip() {
        return "Attempt to finish off a wounded foe, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage. Only usable on enemies that have less than 20% health."
    }

    startCast(caster) {
        if (this.checkStart(caster) && (caster.castTarget.health/caster.castTarget.maxHealth<this.lessthanhealth || checkBuff(caster,caster,"Sudden Death"))) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    if (caster.spec==="fury") {
                        caster.abilities["WhirlwindBuff"].startCast(caster,caster.castTarget,this)
                    }

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
                    target= caster.targetObj
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        if (caster.spec==="fury") {
                            caster.abilities["WhirlwindBuff"].startCast(caster, caster.targetObj, this)
                        }
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                if (caster.spec==="fury") {
                    for (let i = 0; i < caster.buffs.length; i++) {
                        if (caster.buffs[i].name === "Sudden Death") {
                            caster.buffs[i].duration = -1
                        }
                    }
                } else if (caster.spec==="arms" && checkBuff(caster,caster,"Sweeping Strikes")) {
                    caster.abilities["Sweeping Strikes"].cleave(caster,target,this)
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
