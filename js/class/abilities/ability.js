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

    talent = false
    talentSelect = false
    passive = false
    hiddenBuff = false
    permanentBuff = false
    dispellable = false // magic,disease,curse,poison //TODO

    ignoreArmor = false
    dontBreakStealth = false

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

    checkStart(caster,cost = 9999) {
        if (caster.isStunned || caster.isDead || (caster.isInterrupted && this.school!=="physical")) {
            return false
        }
        if (this.canUse && this.checkGcd(caster) && this.checkCost(caster,cost) && this.checkCasting(caster) && this.checkCd(caster) && this.abilityCd>=this.abilityMaxCd && this.checkRooted(caster) && this.checkShamanForm(caster)) {
            return true
        }
        return false
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

    checkCost(caster,cost = 9999,showMessage = true) {
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
    }

    reduceCd(val) {
        this.cd += val
    }

    setTalent() {
    }

    unsetTalent() {
    }

}