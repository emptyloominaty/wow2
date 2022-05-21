class Roll extends Ability {
    constructor() {
        let name = "Roll"
        let cost = 0 //% mana
        let gcd = 0.8
        let castTime = 0
        let cd = 20
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "move"
        this.effectValue = 7
        this.duration = 0.8

        this.rollCd = 0
    }

    run() {
        if (this.rollCd>0) {
            this.rollCd += progressInSec
        }

        if (this.cd<this.maxCd) {
            this.cd += progressInSec
            if (this.cd>=this.maxCd) {
                this.charges++
                if (this.charges !== this.maxCharges) {
                    this.cd=0
                }
            }
        }
    }

    startCast(caster) {
        if (caster.energy>this.cost && caster.gcd<=0  && this.charges>0) {
            if (caster.isChanneling) {
                this.isChanneling = false
                this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }

            if (caster.isCasting) {
                this.isCasting = false
                this.casting = {name:"", time:0, timeleft:0}
            }
            this.charges--
            caster.isRolling = true
            caster.gcd = this.gcd
            this.cd = 0
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
        } else if (caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    runBuff(target,buff) {
    }

    endBuff(target) {
        target.isRolling = false
    }
}
