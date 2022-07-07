class ThrowGlaive extends Ability {
    constructor(vengeance = false) {
        let name = "Throw Glaive"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 9
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.366795*1.08
        this.jumptargets = 2

        if (vengeance) {
            this.cd = 6
            this.maxCd = 6
            this.spellPower = 0.15795
            this.threat = 10
        }

    }

    getTooltip() {
        return   "Throw a demonic glaive at the target, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage. The glaive can ricochet to 2 additional enemies within 10 yards."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)

                    if (caster.spec==="havoc" && caster.abilities["Master of the Glaive"].talentSelect) {
                        applyDebuff(caster,caster.castTarget,caster.abilities["Master of the Glaive"])
                    }

                    let ttt = 0
                    let lastTarget = caster.castTarget
                    let targets = enemies
                    for (let i = 0; i<targets.length ;i++) {
                        if (!targets[i].isDead && this.checkDistance(lastTarget, targets[i],10,true)) {
                            lastTarget = targets[i]
                            doDamage(caster, targets[i], this)
                            if (caster.spec==="havoc" && caster.abilities["Master of the Glaive"].talentSelect) {
                                applyDebuff(caster,targets[i],caster.abilities["Master of the Glaive"])
                            }
                            ttt++
                            if (ttt>=this.jumptargets) {
                                break
                            }
                        }
                    }
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
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
