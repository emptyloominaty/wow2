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
        if (caster.gcd<0.75) {
            caster.gcd = 0.75
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