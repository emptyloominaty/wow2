class RisingSunKick extends Ability {
    constructor() {
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


    }

    getTooltip() {
        return "Kick upwards, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage"
    }

    run(caster) {

    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting &&  this.checkCd(caster)) {
            let done = false
            if (caster.target!=="" && caster.castTarget.enemy && !caster.castTarget.isDead) {
                if (this.checkDistance(caster,caster.castTarget)) {
                    doDamage(caster, caster.targetObj, this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
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
                caster.useEnergy(this.cost)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                this.setGcd(caster)

                //rising mist
                if (caster.talents.RisingMist) {
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
                                doHeal(caster,friendlyTargets[i],this,0,this.spellPowerRisingMist)
                            }
                        })
                    }
                }


            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
