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
                let frozen = false
                for (let i = 0; i<target.debuffs.length; i++) {
                    if (target.debuffs[i].caster === caster) {
                        if (target.debuffs[i].name==="Winter's Chill" && target.debuffs[i].caster===caster) {
                            if (target.debuffs[i].stacks>1) {
                                target.debuffs[i].stacks--
                            } else {
                                target.debuffs[i].duration = -1
                            }
                            frozen = true
                            break
                        }
                    }
                }
                if (checkBuffStacks(caster,caster,"Fingers of Frost")) {
                    frozen = true
                }

                if (frozen) {
                    spellPower *= 3
                    if (caster.abilities["Chain Reaction"].talentSelect) {
                        for (let i = 0; i<caster.buffs.length; i++) {
                            if (caster.buffs[i].name==="Chain Reaction") {
                                spellPower *= 1+(caster.buffs[i].stacks*0.03)
                            }
                        }
                        applyBuff(caster,caster,caster.abilities["Chain Reaction"],1,true)
                    }
                    if (caster.abilities["Thermal Void"].talentSelect) {
                        for (let i = 0; i<caster.buffs.length; i++) {
                            if (caster.buffs[i].name==="Icy Veins") {
                                caster.buffs[i].duration ++
                            }
                        }
                    }
                }
                doDamage(caster,target,this,undefined,spellPower)

                if (caster.abilities["Splitting Ice"].talentSelect) {
                    //jump
                    let targets = enemies
                    for (let i = 0; i<targets.length ;i++) {
                        if (!targets[i].isDead && this.checkDistance(target, targets[i],8,true)) {
                            doDamage(caster, targets[i], this,undefined,spellPower*0.65)
                            break
                        }
                    }
                }

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
