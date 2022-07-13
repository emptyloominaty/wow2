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
    abilityCd = 0.4
    abilityMaxCd = 0.4
    canCastWhileRooted = true

    canUse = true
    aoe = false
    requiresStealth = false

    talent = false
    talentSelect = false
    passive = false
    hiddenBuff = false
    permanentBuff = false
    dispellable = false // magic,disease,curse,poison //TODO
    hiddenSB = false
    mastery = false
    threat = 1

    needForm = false
    canCastForm = false

    ignoreArmor = false
    dontBreakStealth = false

    actionBarForm = false
    actionBar = false
    lessthanhealth = false

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
        this.holyPriestCdUsed = false
    }

    getTooltip() {
        return "" //tooltips.getTooltip(this)
    }

    getBuffTooltip(caster,target,buff) {
        return ""
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

    startCast(caster = {}) {
        return false
    }

    endCast(caster = {}) {
        return false
    }

    checkStart(caster,cost = 9999,secCost = 9999,checkForm = true) {
        if (caster.isStunned || caster.isDead || (caster.isInterrupted && this.school!=="physical")) {
            return false
        }
        if (this.canUse && this.checkGcd(caster) && !caster.isInterrupted && this.checkCost(caster,cost,undefined,secCost) && this.checkCasting(caster) && this.checkCd(caster) && this.abilityCd>=this.abilityMaxCd && this.checkRooted(caster) && this.checkShamanForm(caster) && (!checkForm || this.checkDruidForm(caster))) {
            return true
        }
        return false
    }

    checkDruidForm(caster) {
        if (caster.class!=="Druid" || (caster.form==="" && this.needForm===false)) {
            return true
        } else if (this.needForm === caster.form) {
            return true
        } else if (this.canCastForm === caster.form || this.canCastForm === "all") {
            return true
        }

        let actionBarForm = caster.abilities[caster.form].actionBarForm
        let actionBar = caster.abilities[caster.form].actionBar

        if (actionBarForm!==false) {
            for (let i = 0; i<actionBarForm.length; i++) {
                if (actionBars[1].abilities[i])  {
                    actionBarForm[i] = actionBars[1].abilities[i]
                }
            }
            for (let i = 0; i<actionBar.length; i++) {
                if (actionBar[i]) {
                    actions[actionBar[i]] = new Action(actionBar[i], 1, i)
                }
            }
        }
        caster.form = ""
        caster.formEffects = []
    }

    checkShamanForm(caster) {
        if (caster.form==="Ghost Wolf") {
            caster.form = ""
            caster.formEffects = []
        }
        return true
    }

    checkRooted(caster) {
        if (!this.canCastWhileRooted) {
            if (caster.isRooted) {
                return false
            }
        }
        return true
    }

    checkGcd(caster) {
        if (!this.noGcd) {
            if (caster.gcd <= 0) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    checkCasting(caster) {
        if (!this.noGcd) {
            if (caster.isCasting) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
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
        if(caster.spec==="windwalker") {
            if (caster.spellHistory[0]!==this.name) {
                caster.abilities["Hit Combo"].applyBuff(caster)
            } else {
                if (caster.abilities["Hit Combo"].talentSelect) {
                    for (let i = 0; i<caster.buffs.length; i++) {
                        if (caster.buffs[i].name==="Hit Combo") {
                            caster.buffs[i].duration = -1
                        }
                    }
                }
            }
        }
        if (caster.isStealthed && !this.dontBreakStealth) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].type==="stealth") {
                    caster.buffs[i].duration = -1
                }
            }
        }
        caster.abilitiesCasted.push({name:this.name,time:time})
        this.abilityCd = 0
        details.castAbility(caster,this)
        castCombatLog.cast(caster,this)
        caster.spellHistory.unshift(this.name)
        if (caster.spellHistory.length>3) {
            caster.spellHistory.pop()
        }
        if (caster===player) {
            if (actions[this.name]) {
                let bar = actions[this.name].bar
                let ability = actions[this.name].slot
                keyPressed[keybinds["Bar"+bar+" Ability"+ability+""].key] = false
            }
        }
        if (this.gcd>0 || gcd>0) {
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
                bars.playerCast.setMaxVal(caster.gcd)
            }
            if (this.gcd>=0.75) {
                if (caster.gcd<0.75) {
                    caster.gcd = 0.75
                    if (caster===player) {
                        bars.playerCast.setMaxVal(0.75)
                    }
                }
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
                console.log(this.name+"RANGE!")
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

    checkCost(caster,cost = 9999,showMessage = true,secCost = 9999) {
        if (cost===9999) {
            cost = this.cost
        }
        if (secCost===9999) {
            secCost = this.secCost
        }
        if (secCost==="all") {
            secCost = 1
        }
        if (caster.energy>=cost) {
            if (secCost>0 && caster.maxSecondaryResource>0) {
                if (caster.secondaryResource>=secCost) {
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

    incCd(caster, inc = progressInSec,hasteCd = this.hasteCd) {
        if (this.abilityCd<this.abilityMaxCd) {
            this.abilityCd += progressInSec
        }
        if (hasteCd) {
            if (this.maxCharges>1) {
                //charges haste
                if (this.cd<this.maxCd) {
                    this.cd += inc * (1 + (caster.stats.haste / 100))
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
                    this.cd += inc * (1 + (caster.stats.haste / 100))
                }
            }
        } else {
            if (this.maxCharges>1) {
                //charges
                if (this.cd<this.maxCd) {
                    this.cd += inc
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
                    this.cd += inc
                }
            }
        }
        if (caster.spec==="holyPriest" && !this.holyPriestCdUsed) {
            if (caster.abilities["Cosmic Ripple"].talentSelect) {
                if (this.cd>=this.maxCd) {
                    if (this.name==="Holy Word: Serenity" || this.name==="Holy Word: Sanctify") {
                        caster.abilities["Cosmic Ripple"].burst(caster)
                        this.holyPriestCdUsed = true
                    }
                }
            }
        }
    }

    reduceCd(val) {
        this.cd += val
    }

    setTalent() {
    }

    unsetTalent() {
    }

    onDeath(caster,target,buff) {
    }

    killEnemy(caster,target) {
    }
}