class RisingSunKick extends Ability {
    constructor(ww = false) {
        let name = "Rising Sun Kick"
        let cost = 1.5 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 12
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = (1.438/1.12)*1.7  //-12% mw aura    rank2:+70%
        this.spellPowerRisingMist = 0.28
        this.extendRisingMist = 4 //sec
        this.maxExtendRisingMist = 1 //100%

        this.effect = ""
        this.effectValue = 0
        this.hasteCd = true


        if (ww) {
            this.secCost = 2 //chi
            this.spellPower = ((0.959 * 2)*1.7)*1.67
            this.gcd = 1
            this.hasteGcd = false

        }


    }

    getTooltip() {
        return "Kick upwards, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage"
    }

    run(caster) {

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                if (this.checkDistance(caster,caster.castTarget)) {
                    doDamage(caster, caster.castTarget, this)
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
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            if (done) {
                this.cd = 0
                caster.useEnergy(this.cost,this.secCost)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)

                //rising mist
                if (caster.spec === "mistweaver" && caster.abilities["Rising Mist"].talentSelect) {
                    for (let i = 0; i<friendlyTargets.length; i++) {
                        Object.keys(friendlyTargets[i].buffs).forEach((key)=> {
                            if ((friendlyTargets[i].buffs[key].name === "Enveloping Mist" || friendlyTargets[i].buffs[key].name === "Renewing Mist" || friendlyTargets[i].buffs[key].name === "Essence Font") && friendlyTargets[i].buffs[key].caster === caster) {
                                if (friendlyTargets[i].buffs[key].extendedDuration+this.extendRisingMist < friendlyTargets[i].buffs[key].maxDuration * this.maxExtendRisingMist) {
                                    friendlyTargets[i].buffs[key].duration += this.extendRisingMist
                                    friendlyTargets[i].buffs[key].extendedDuration += this.extendRisingMist
                                } else if (friendlyTargets[i].buffs[key].extendedDuration < friendlyTargets[i].buffs[key].maxDuration * this.maxExtendRisingMist) {
                                    let extend = (friendlyTargets[i].buffs[key].maxDuration*this.maxExtendRisingMist ) - friendlyTargets[i].buffs[key].extendedDuration
                                    friendlyTargets[i].buffs[key].duration += extend
                                    friendlyTargets[i].buffs[key].extendedDuration += extend
                                }
                                doHeal(caster,friendlyTargets[i],this,0,this.spellPowerRisingMist,undefined,undefined,"Rising Mist")
                            }
                        })
                    }
                    //thunder focus tea
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Thunder Focus Tea") {

                            this.cd = 9

                            if (caster.buffs[i].stacks>1) {
                                caster.buffs[i].stacks--
                            } else {
                                caster.buffs[i].duration = -1
                                caster.abilities["Thunder Focus Tea"].cd = 0
                            }
                        }
                    }
                }
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }
}
