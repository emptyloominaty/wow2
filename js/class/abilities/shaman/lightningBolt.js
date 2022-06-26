class LightningBolt extends Ability {
    constructor(ele = false,resto = false) {
        let name = "Lightning Bolt"
        let cost = 0.25 //% mana

        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.95

        if (ele) {
            this.cost = -8
            this.spellPower = this.spellPower*1.05
        } else if (resto) {
            this.spellPower = this.spellPower*1.15
        }
    }

    getTooltip() {
        return "Hurls a bolt of lightning at the target, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Nature damage."
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
                let castTime = this.castTime
                let gcd = this.gcd
                if (caster.spec==="elemental" && caster.abilities["Storm Elemental"].talentSelect && checkBuff(caster,caster,"Storm Elemental")) {
                    let val = caster.abilities["Storm Elemental"].getVal(caster)
                    castTime = castTime * val
                    gcd = gcd*val
                    caster.abilities["Storm Elemental"].incStacks(caster)
                }

                if (caster.spec==="elemental" && checkBuff(caster,caster,"Stormkeeper")) {
                    castTime = 0
                }

                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster,gcd)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {

                let spellPower = this.spellPower
                if (caster.spec==="elemental" && caster.abilities["Master of the Elements"].talentSelect && checkBuff(caster,caster,"Master of the Elements")) {
                    spellPower *= 1.2
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Master of the Elements") {
                            caster.buffs[i].duration = -1
                        }
                    }
                }

                if (caster.spec==="elemental" && caster.abilities["Stormkeeper"].talentSelect) {
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Stormkeeper") {
                            spellPower *= 2.5
                            if (caster.buffs[i].stacks>1) {
                                caster.buffs[i].stacks--
                            } else {
                                caster.buffs[i].duration = -1
                            }
                        }
                    }
                }
                if (caster.spec==="elemental") {
                    caster.abilities["Surge of Power"].enhance(caster,target,this)
                }

                doDamage(caster,target,this,undefined,spellPower)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
