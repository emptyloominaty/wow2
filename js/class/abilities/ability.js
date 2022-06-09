class Ability {
    hasteCd = false
    hasteGcd = true
    range = 5
    secCost = 0

    poison = false
    bleed = false
    tooltip = ""
    constructor(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges,effects = [],values = {}) {
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

        if (effects.length>0) {
            this.spellPower = effects[0].val
            if (effects[0].type==="applyDot" || effects[0].type==="applyHot") {
                this.duration = effects[0].duration
            }
        }

        this.values = values
        if (values.duration) {
            this.duration = values.duration
        }
        if (values.spellPower) {
            this.spellPower = values.spellPower
        }

    }

    getTooltip() {
        return this.tooltip
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
        },
        "taunt": (caster,_i)=> {
        },
        "interrupt": (caster,_i)=> {
        },
        "dispel": (caster,_i)=> {
        },
        "applyHot": (caster,_i)=> {
            if (caster.target==="" || this.isEnemy(caster) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0 || !this.checkDistance(caster,caster.castTarget)) {
                applyHot(caster,caster,this)
            } else {
                applyHot(caster,caster.castTarget,this)
            }
        },
        "applyDot": (caster,_i)=> {
        },
        "aoeDamage": (caster,_i)=> {
        },
        "cleaveDamage": (caster,_i)=> {
        },
        "aoeHeal": (caster,_i)=> {
        },
        "createHealingArea": (caster,_i)=> {
        },
        "createDanageArea": (caster,_i)=> {
        },
        "move": (caster,_i)=> { //roll
        },
        "applyBuff": (caster,_i)=> {
        },
        "applyDebuff": (caster,_i)=> {
        },
        "increaseDuration": (caster,_i)=> {
        },
        "increaseHealing": (caster,_i)=> {
        },
        //SPEC-------------------------------------------------------------------------------------------------------------
        "gustOfMistMainTarget": (caster,_i)=> {
            if (caster.spec==="mistweaver") {
                let spellPower = caster.stats.mastery/100
                if (caster.target==="" || caster.castTarget.enemy) {
                    Object.keys(caster.buffs).forEach((key)=> {
                        if (caster.buffs[key].name === "Essence Font") {
                            doHeal(caster,caster,caster.abilities["Gust of Mists"],undefined,spellPower)
                        }
                    })
                    //heal self
                    doHeal(caster,caster,this,undefined,spellPower)
                } else {
                    Object.keys(caster.castTarget.buffs).forEach((key)=> {
                        if (caster.castTarget.buffs[key].name === "Essence Font") {
                            doHeal(caster,caster.castTarget,caster.abilities["Gust of Mists"],undefined,spellPower)
                        }
                    })
                    //heal target
                    doHeal(caster,caster.castTarget,caster.abilities["Gust of Mists"],undefined,spellPower)
                }
            }
        },
    }
//----------------------------------------------------------------------------------------------------------RunBuff
    runBuffFunctions = {
        "Renewing Mist": (target,buff,id)=> {
            if(target.health>=target.maxHealth) {
                for (let i = 0; i<friendlyTargets.length; i++) {
                    if (friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                        let a = 0
                        for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
                            if (friendlyTargets[i].buffs[j].name === buff.name && friendlyTargets[i].buffs[j].caster === buff.caster) {
                                a = 1
                            }
                        }
                        if (!this.checkDistance(target,friendlyTargets[i],this.values.jumpRange)) {
                            a = 1
                        }
                        if (a===0) {
                            applyHot(buff.caster,friendlyTargets[i],buff.ability,buff.duration,buff.extendedDuration)
                            target.buffs.splice(id,1)
                            return
                        }
                    }
                }
            }
        }
    }
//----------------------------------------------------------------------------------------------------------Channeling
    channelFunctions = {
        "Soothing Mist": (caster)=> {
            if (caster.target==="" || this.isEnemy(caster)  || caster.castTarget.isDead || !this.checkDistance(caster,caster.castTarget)) {
                //heal self
                doHeal(caster,caster,this,undefined,this.values.spellPower)
                let masteryRng = Math.floor(Math.random()*7)
                if (masteryRng===0) {
                    this.doEffect["gustOfMistMainTarget"](caster,0)
                }
            } else {
                //heal target
                doHeal(caster,caster.castTarget,this,undefined,this.values.spellPower)
                let masteryRng = Math.floor(Math.random()*7)
                if (masteryRng===0) {
                    this.doEffect["gustOfMistMainTarget"](caster,0)
                }
            }
        }
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting &&  this.checkCd(caster) && this.checkDistance(caster,caster.castTarget)) {

            if (this.stopChanneling(caster)) {
                return true
            }

            if (this.channeling) {
                this.setChanneling(caster)
            } else {
                this.setCasting(caster)
            }

            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false

        for (let i = 0; i<this.effects.length; i++ ) {
                this.doEffect[this.effects[i].type](caster,i)
        }

        //cd
        if (this.maxCharges>1) {
            if (this.charges===this.maxCharges) {
                this.cd = 0
            }
            this.charges--
        } else {
            this.cd = 0
        }

        caster.useEnergy(this.cost,this.secCost)
    }

    cast(caster) {
        this.channelFunctions[this.name](caster)
    }

    runBuff(target,buff,id = 0) {
        if (this.runBuffFunctions[buff.name]!==undefined) {
            this.runBuffFunctions[buff.name](target,buff,id)
        }
    }

    endBuff(target) {

    }


    run(caster) {

    }

    stopChanneling(caster) {
        if ((this.name ==="Vivify" || this.name ==="Enveloping Mist") && caster.channeling.name==="Soothing Mist") {
            this.endCast(caster)
            this.setGcd(caster)
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
            return true
        } else {
            caster.isChanneling = false
            caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            return false
        }
    }

    setChanneling(caster) {
        caster.isChanneling = true
        caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0, timer2:1/(1 + (caster.stats.haste / 100))}
    }

    setCasting(caster) {
        caster.isCasting = true
        caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
    }


    setGcd(caster,gcd = 0) {
        details.castAbility(caster,this)
        castCombatLog.cast(caster,this)
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

    isEnemy(caster) {
        if (caster.enemy) {
            if (!caster.targetObj.enemy) {
                return true
            }
        } else {
            if (caster.targetObj.enemy) {
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

    checkCost(caster,cost = 9999) {
        if (cost===9999) {
            cost = this.cost
        }
        if (caster.energy>cost) {
            if (this.secCost>0 && caster.maxSecondaryResource>0) {
                if (caster.secondaryResource>this.secCost) {
                    return true
                } else {
                    if (caster===player) {
                        _message.update("Not enough "+caster.secondaryResourceName, 2, colors.error)
                    }
                    return false
                }
            } else {
                return true
            }
        } else {
            if (caster===player) {
                _message.update("Not enough "+caster.resourceName, 2, colors.error)
            }
            return false
        }
    }

    checkCd(caster,dontShow = false) {
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
            //cd haste
            if (this.cd<this.maxCd) {
                this.cd += progressInSec * (1 + (caster.stats.haste / 100))
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

}