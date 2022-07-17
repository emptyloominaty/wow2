class DeathStrike extends Ability {
    constructor() {
        let name = "Death Strike"
        let cost = 45
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

        this.spellPower = 0.464256*1.53

        //TODO:frost: spellPower [(46.4256% of Attack power) + (29.835% of Attack power)]
        //TODO:frost/unholy: Death Strike's cost is reduced by 10, and its healing is increased by 60%.

        this.damageLast5Sec = [0,0,0,0,0]
        this.timer1 = 0
        this.timer2 = 1
        this.idx = 0
    }

    getTooltip() {
        return "Focuses dark power into a strike that deals "+spellPowerToNumber(this.spellPower)+" Physical damage and heals you for 25% of all damage taken in the last 5 sec, minimum 7.0% of maximum health."
    }

    run(caster) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            this.damageLast5Sec.shift()
            this.damageLast5Sec.push(0)
            this.idx++
            if (this.idx===5) {
                this.idx = 0
            }
        }
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
                let heal = 0
                for (let i = 0; i<this.damageLast5Sec.length; i++) {
                    heal += this.damageLast5Sec[i]
                }
                heal = heal * 0.25 * 1.53 // 1.53 = blood dk aura

                if (heal<(caster.maxHealth*0.07)) {
                    heal = (caster.maxHealth*0.07)
                }

                let cost = this.cost
                if (caster.spec==="blood") {
                    caster.abilities["Blood Shield"].applyAbsorb(caster,heal)

                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Bone Shield" && caster.buffs[i].stacks>=5) {
                            cost -= 5
                        }
                    }
                }

                doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,heal)

                caster.useEnergy(cost,this.secCost)
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
