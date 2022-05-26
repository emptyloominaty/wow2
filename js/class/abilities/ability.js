class Ability {
    hasteCd = false
    constructor(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges) {
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
    }

    setGcd(caster) {
       caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
        bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
        if (caster.gcd<0.75) {
            caster.gcd = 0.75
            bars.playerCast.setMaxVal(0.75)
        }
    }

    checkDistance(caster,target) {
        if (getDistance(caster,target)>this.range) {
            if (caster===player) {
                _message.update("Out of range", 2, colors.error)
            }
            return false
        } else {
            return true
        }
    }

    checkCost(caster) {
        if (caster.energy>this.cost) {
            return true
        } else {
            if (caster===player) {
                _message.update("Not enough mana", 2, colors.error)
            }
            return false
        }
    }

    checkCd(caster) {
        if (this.maxCharges>1) {
            if (this.charges>0) {
                return true
            } else {
                if (caster===player) {
                    _message.update("Ability is not ready yet",2,colors.error)
                }
                return false
            }
        } else {
            if (this.cd>=this.maxCd) {
                return true
            } else {
                if (caster===player) {
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