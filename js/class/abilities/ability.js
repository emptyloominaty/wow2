class Ability {
    hasteCd = false
    hasteGcd = true
    range = 5
    secCost = 0
    poison = false
    bleed = false
    spellPower = 0
    duration = 0
    effect = []
    effectValue = 0

    talent = false
    passive = false
    hiddenBuff = false
    permanentBuff = false
    constructor(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges,effects = [],values = {},
                noGcd = false,hasteCd = false,hasteGcd = true,secCost = 0,
                poison = false, bleed = false,) {
        this.name = name
        this.cost = cost
        this.gcd = gcd
        this.castTime = castTime
        this.cd = cd
        this.maxCd = cd
        this.channeling = channeling
        this.casting = casting
        this.canMove = canMove
        this.school = school
        this.range = range
        this.charges = charges
        this.maxCharges = charges
        this.effects = effects
        this.noGcd = noGcd

        this.hasteCd = hasteCd
        this.hasteGcd = hasteGcd
        this.secCost = secCost
        this.poison = poison
        this.bleed = bleed
    }

    getTooltip() {
        return tooltips.getTooltip(this)
    }

    doEffect = {
        "heal": (caster,_i) => {
            if (caster.target==="" || this.isEnemy(caster) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0 || !this.checkDistance(caster,caster.castTarget)) {
                doHeal(caster,caster,this,undefined,this.effects[_i].val)
            } else {
                doHeal(caster,caster.castTarget,this,undefined,this.effects[_i].val)
            }
        },
        "cleaveHeal": (caster,_i)=> {
            for (let i = 0; i<friendlyTargets.length; i++) {
                Object.keys(friendlyTargets[i].buffs).forEach((key)=> {
                    if (friendlyTargets[i].buffs[key].name === this.effects[_i].condition && friendlyTargets[i].buffs[key].caster === caster) {
                        doHeal(caster,friendlyTargets[i],this,undefined,this.effects[_i].val)
                    }
                })
            }
        },
        "damage": (caster,_i)=> {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.targetObj.isDead) {
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
                    if (this.checkDistance(caster,caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            return done
        },
        "taunt": (caster,_i)=> {
            if (caster.target!=="" && this.isEnemy(caster) && Object.keys(caster.castTarget).length !== 0) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    taunt(caster,caster.castTarget)
                    return true
                }
            } else { //TODO:IDK?
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        taunt(caster,caster.targetObj)
                        return true
                    }
                }
            }
            return false
        },
        "tauntAndBuff": (caster,_i)=> {
            if (caster.target!=="" && this.isEnemy(caster) && Object.keys(caster.castTarget).length !== 0) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyBuff(caster,caster.castTarget,this)
                    taunt(caster,caster.castTarget)
                    return true
                }
            } else { //TODO:IDK?
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        applyBuff(caster,caster.targetObj,this)
                        taunt(caster,caster.targetObj)
                        return true
                    }
                }
            }
            return false
        },
        "interrupt": (caster,_i)=> {
            return true
        },
        "dispel": (caster,_i)=> {
            return true
        },
        "applyHot": (caster,_i)=> {
            if (caster.target==="" || this.isEnemy(caster) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0 || !this.checkDistance(caster,caster.castTarget)) {
                applyHot(caster,caster,this)
            } else {
                applyHot(caster,caster.castTarget,this)
            }
            return true
        },
        "applyDot": (caster,_i)=> {
            return true
        },
        "aoeDamage": (caster,_i)=> {
            return true
        },
        "cleaveDamage": (caster,_i)=> {
            return true
        },
        "aoeHeal": (caster,_i)=> {
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i])) {
                    doHeal(caster,friendlyTargets[i],this)
                }
            }
            return true
        },
        "createHealingArea": (caster,_i)=> {
            return true
        },
        "createDanageArea": (caster,_i)=> {
            return true
        },
        "move": (caster,_i)=> {
            return true
        },
        "applyBuff": (caster,_i)=> {
            let stackable = false
            let stacks = 1
            let name = this.name
            if (this.effects[_i].stacks!==undefined) {
                stackable = true
                stacks = this.effects[_i].stacks
            }
            if (this.effects[_i].name!==undefined) {
                name = this.effects[_i].name
            }
            if (this.effects[_i].maxStacks!==undefined) {
                this.maxStacks = this.effects[_i].maxStacks
            }
            if (caster.target==="" || this.isEnemy(caster) || !(this.checkDistance(caster,caster.castTarget)) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
                applyBuff(caster,caster,this,stacks,stackable, name)
            } else {
                applyBuff(caster,caster.castTarget,this,stacks,stackable, name)
            }
            return true
        },
        "applyBuffSelf": (caster,_i,done)=> {
            if (done) {
                let stackable = false
                let stacks = 1
                let name = this.name
                if (this.effects[_i].stacks !== undefined) {
                    stackable = true
                    stacks = this.effects[_i].stacks
                }
                if (this.effects[_i].name !== undefined) {
                    name = this.effects[_i].name
                }
                if (this.effects[_i].maxStacks !== undefined) {
                    this.maxStacks = this.effects[_i].maxStacks
                }
                applyBuff(caster, caster, this, stacks, stackable, name)

                return true
            }
            return false
        },
        "applyDebuff": (caster,_i)=> {
            return true
        },
        "increaseDuration": (caster,_i)=> {
            return true
        },
        "increaseHealing": (caster,_i)=> {
            return true
        },
        "increaseHealthSelf": (caster,_i)=> {
            caster.healthIncreased += this.effects[_i].val
            let a = caster.maxHealth
            caster.maxHealth *= 1+this.effects[_i].val
            let b = caster.maxHealth
            caster.health += b-a
            return true
        },
        "chanceBuffSelf": (caster,_i,done)=> {
            if (done) {
                if (getChance(this.effects[_i].chance)) {
                    this.duration = 20
                    applyBuff(caster, caster, this, 1, false, this.effects[_i].buffName)
                }
                return true
            }
            return false
        },
        //--------------------------------------------------------------------------------------------------------------------------------------SPECS
        //--------------------------------------MAGE
        "arcaneBlast":(caster,_i)=> {
            if (caster.target!=="" && this.isEnemy(caster)) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    let spellPower = this.spellPower
                    for (let i = 0; i<caster.secondaryResource; i++) {
                        spellPower = spellPower * (1.6)
                    }

                    let cost = this.cost * (1 + (caster.secondaryResource))

                    doDamage(caster,caster.targetObj,this,undefined,spellPower)
                    caster.useEnergy(cost,this.secCost)
                    this.cd = 0
                    return true
                }
            }
            return false
        },
        "arcaneBarrage":(caster,_i)=> {
            if (caster.target!=="" && this.isEnemy(caster)) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    let spellPower = this.spellPower * (1 + (caster.secondaryResource*0.3))
                    doDamage(caster,caster.targetObj,this,undefined,spellPower)
                    //TODO ADDITIONAL TARGETS  (1 per charge 40%)
                    let cost = this.values.cost * caster.secondaryResource
                    caster.useEnergy(cost,this.secCost)
                    this.cd = 0
                }
            }
        },
        //--------------------------------------MONK
        "roll":(caster,_i)=> {
            applyBuff(caster,caster,this)
            caster.isRolling = true
            return true
        },
        "gustOfMistMainTarget": (caster,_i)=> {
            if (caster.spec==="mistweaver") {
                let spellPower = caster.stats.mastery/100
                if (caster.target==="" || caster.castTarget.enemy) {
                    Object.keys(caster.buffs).forEach((key)=> {
                        if (caster.buffs[key].name === "Essence Font" && caster.buffs[key].caster === caster) {
                            doHeal(caster,caster,caster.abilities["Gust of Mists"],undefined,spellPower)
                        }
                    })
                    //heal self
                    doHeal(caster,caster,this,undefined,spellPower)
                } else {
                    Object.keys(caster.castTarget.buffs).forEach((key)=> {
                        if (caster.castTarget.buffs[key].name === "Essence Font" && caster.castTarget.buffs[key].caster === caster) {
                            doHeal(caster,caster.castTarget,caster.abilities["Gust of Mists"],undefined,spellPower)
                        }
                    })
                    //heal target
                    doHeal(caster,caster.castTarget,caster.abilities["Gust of Mists"],undefined,spellPower)
                }
            }
            return true
        },
        "gustOfMistAoe": (caster,_i)=> {
            let spellPower = caster.stats.mastery/100
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i])) {
                    Object.keys(friendlyTargets[i].buffs).forEach((key)=> {
                        if (friendlyTargets[i].buffs[key].name === "Essence Font" && friendlyTargets[i].buffs[key].caster === caster) {
                            doHeal(caster,friendlyTargets[i],caster.abilities["Gust of Mists"],undefined,spellPower)
                        }
                    })
                    doHeal(caster,friendlyTargets[i],caster.abilities["Gust of Mists"],undefined,spellPower)
                }
            }
            return true
        },
        "essenceFont": (caster,_i)=> {
            this.cd = 0
            this.values.last6bolts = []
            caster.useEnergy(this.cost,this.secCost)
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(1/(1 + (caster.stats.haste / 100)))/6}
            caster.canMoveWhileCasting = this.canMove
            return true
        },
        "blackoutKick": (caster,_i,done)=> {
            if (done) {
                if (caster.spec === "mistweaver") {
                    for (let i = 0; i < caster.buffs.length; i++) {
                        if (caster.buffs[i].name === "Teachings of the Monastery" && caster.buffs[i].caster === caster) {
                            for (let j = 0; j < caster.buffs[i].stacks; j++) {
                                doDamage(caster, caster.targetObj, this)
                            }
                            //Rising Sun Kick Reset
                            let stacks = caster.buffs[i].stacks
                            let resetChance = (Math.random()) * 100
                            if (resetChance < this.values.resetChance + (stacks * this.values.resetChance)) {
                                caster.abilities["Rising Sun Kick"].cd = caster.abilities["Rising Sun Kick"].maxCd
                            }
                            caster.buffs.splice(i, 1)
                            break
                        }
                    }
                } else if (caster.spec === "windwalker") {
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Blackout Kick") {
                            caster.secondaryResource++
                            caster.buffs.splice(i, 1)
                        }
                    }
                    caster.abilities["Rising Sun Kick"].cd -= 1
                    //TODO:caster.abilities["Fists of Fury"].cd -= 1
                }
                return true
            }
            return false
        },
        "risingMist":(caster,_i,done)=> {
            //extend:4,spellPower:0.28,maxExtendRisingMist:1
            if (done) {
                let maxExtendRisingMist = this.values.maxExtendRisingMist
                let extendRisingMist = this.values.extendRM
                let spellPowerRisingMist = this.values.spellPower

                if (caster.spec === "mistweaver" && caster.talents.RisingMist) {
                    for (let i = 0; i<friendlyTargets.length; i++) {
                        Object.keys(friendlyTargets[i].buffs).forEach((key)=> {
                            if ((friendlyTargets[i].buffs[key].name === "Enveloping Mist" || friendlyTargets[i].buffs[key].name === "Renewing Mist" || friendlyTargets[i].buffs[key].name === "Essence Font") && friendlyTargets[i].buffs[key].caster === caster) {
                                if (friendlyTargets[i].buffs[key].extendedDuration+extendRisingMist < friendlyTargets[i].buffs[key].maxDuration * maxExtendRisingMist) {
                                    friendlyTargets[i].buffs[key].duration += extendRisingMist
                                    friendlyTargets[i].buffs[key].extendedDuration += extendRisingMist
                                } else if (friendlyTargets[i].buffs[key].extendedDuration < friendlyTargets[i].buffs[key].maxDuration * maxExtendRisingMist) {
                                    let extend = (friendlyTargets[i].buffs[key].maxDuration*maxExtendRisingMist ) - friendlyTargets[i].buffs[key].extendedDuration
                                    friendlyTargets[i].buffs[key].duration += extend
                                    friendlyTargets[i].buffs[key].extendedDuration += extend
                                }
                                doHeal(caster,friendlyTargets[i],this,0,spellPowerRisingMist,undefined,undefined,"Rising Mist")
                            }
                        })
                    }
                }


                return true
            }
            return false
        },
    }

    cast(caster) {
    }

    runBuff(target,buff,id = 0) {
    }

    endBuff(target) {
    }

    endChanneling(caster) {
    }

    run(caster) {
    }


    setCd() {
        //cd
        if (this.maxCharges>1) {
            if (this.charges===this.maxCharges) {
                this.cd = 0
            }
            this.charges--
        } else {
            this.cd = 0
        }
    }

    setGcd(caster,gcd = 0) {
        details.castAbility(caster,this)
        castCombatLog.cast(caster,this)
        caster.spellHistory.unshift(this.name)
        if (caster.spellHistory.length>3) {
            caster.spellHistory.pop()
        }
        if (this.hasteGcd) {
            if (gcd===0) {
                caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
            } else {
                caster.gcd = gcd / (1 + (caster.stats.haste / 100))
            }
        } else {
            if (gcd===0) {
                caster.gcd = this.gcd
            } else {
                caster.gcd = gcd
            }
        }

        if (caster===player) {
            if (gcd===0) {
                bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
            } else {
                bars.playerCast.setMaxVal(gcd / (1 + (caster.stats.haste / 100)))
            }
        }
        if (caster.gcd<0.75) {
            caster.gcd = 0.75
            if (caster===player) {
                bars.playerCast.setMaxVal(0.75)
            }
        }
    }

    isEnemy(caster,target = caster.targetObj) {
        if (caster.enemy) {
            if (!target.enemy) {
                return true
            }
        } else {
            if (target.enemy) {
                return true
            }
        }
        return false
    }

    checkDistance(caster,target,range = 0,dontShow = false) {
        if (range===0) {
            range = this.range
        }
        if (getDistance(caster,target)>range) {
            if (caster===player && !dontShow) {
                _message.update("Out of range", 2, colors.error)
            }
            return false
        } else {
            return true
        }
    }

    canSpellQueue(caster) {
        return (caster===player && caster.gcd<spellQueueWindow && (caster.gcd>0 || caster.isCasting))
    }

    checkCost(caster,cost = 9999,showMessage = true) {
        if (caster.isStunned || caster.isDead) {
            return false
        }
        if (cost===9999) {
            cost = this.cost
        }
        if (caster.energy>=cost) {
            if (this.secCost>0 && caster.maxSecondaryResource>0) {
                if (caster.secondaryResource>=this.secCost) {
                    return true
                } else {
                    if (caster===player && showMessage) {
                        _message.update("Not enough "+caster.secondaryResourceName, 2, colors.error)
                    }
                    return false
                }
            } else {
                return true
            }
        } else {
            if (caster===player && showMessage) {
                _message.update("Not enough "+caster.resourceName, 2, colors.error)
            }
            return false
        }
    }

    checkCd(caster,dontShow = false) {
        if (caster.isStunned || caster.isDead) {
            return false
        }
        if (this.maxCharges>1) {
            if (this.charges>0) {
                return true
            } else {
                if (caster===player && !dontShow) {
                    _message.update("Ability is not ready yet",2,colors.error)
                }
                return false
            }
        } else {
            if (this.cd>=this.maxCd) {
                return true
            } else {
                if (caster===player && !dontShow) {
                    _message.update("Ability is not ready yet",2,colors.error)
                }
                return false
            }
        }
    }

    incCd(caster) {
        if (this.hasteCd) {
            if (this.maxCharges>1) {
                //charges haste
                if (this.cd<this.maxCd) {
                    this.cd += progressInSec * (1 + (caster.stats.haste / 100))
                    if (this.cd>=this.maxCd) {
                        this.charges++
                        if (this.charges!==this.maxCharges) {
                            this.cd=0
                        }
                    }
                }
            } else {
                //cd haste
                if (this.cd<this.maxCd) {
                    this.cd += progressInSec * (1 + (caster.stats.haste / 100))
                }
            }

        } else {
            if (this.maxCharges>1) {
                //charges
                if (this.cd<this.maxCd) {
                    this.cd += progressInSec
                    if (this.cd>=this.maxCd) {
                        this.charges++
                        if (this.charges!==this.maxCharges) {
                            this.cd=0
                        }
                    }
                }
            } else {
                //cd
                if (this.cd<this.maxCd) {
                    this.cd += progressInSec
                }
            }
        }
    }

    reduceCd(val) {
        this.cd += val
    }

}