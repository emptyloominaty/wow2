class ScourgeStrike extends Ability {
    constructor() {
        let name = "Scourge Strike"
        let cost = -10
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.345*1.2
        this.spellPower2 = 0.19*1.2
        this.secCost = 1

    }

    getTooltip() { //TODO:and causes 1 Festering Wound to burst.
        return "An unholy strike that deals "+spellPowerToNumber(this.spellPower)+" Physical damage and "+spellPowerToNumber(this.spellPower2)+" Shadow damage, and causes 1 Festering Wound to burst. "
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
                let target = caster.castTarget
                doDamage(caster, caster.castTarget, this)
                doDamage(caster, caster.castTarget, this,undefined,this.spellPower2,undefined,undefined,undefined,undefined,undefined,undefined,"shadow")
                if (checkDebuffStacks(caster,caster.castTarget,"Festering Wound")) {
                    caster.abilities["Festering Wound"].burst(caster,caster.castTarget)
                }

                let maxTargets = 0
                let deathandDecay = caster.abilities["Death and Decay"]
                if (deathandDecay.areaId!==undefined) {
                    if (areas[deathandDecay.areaId] && areas[deathandDecay.areaId].ability.name === "Death and Decay" && areas[deathandDecay.areaId].caster === caster) {
                        if (getDistance(caster, areas[deathandDecay.areaId]) < 8) {
                            maxTargets += 4
                        }
                    }
                }


                let ttt = 0
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(caster,enemies[i],8,true)) {
                        if (ttt>=maxTargets) {
                            break
                        }
                        doDamage(caster,enemies[i],this)
                        doDamage(caster, enemies[i], this,undefined,this.spellPower2,undefined,undefined,undefined,undefined,undefined,undefined,"shadow")
                        if (checkDebuffStacks(caster,enemies[i],"Festering Wound")) {
                            caster.abilities["Festering Wound"].burst(caster,enemies[i])
                        }
                        ttt ++
                    }
                }


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
