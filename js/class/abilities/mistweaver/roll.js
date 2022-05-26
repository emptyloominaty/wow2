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

    run(caster) {
        if (this.rollCd>0) {
            this.rollCd += progressInSec
        }
    }

    startCast(caster) {
        if (caster.energy>this.cost && caster.gcd<=0  && this.checkCd(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }

            if (caster.isCasting) {
                caster.isCasting = false
                caster.casting = {name:"", time:0, timeleft:0}
            }
            caster.isRolling = true
            this.setGcd(caster)
            if (this.charges===this.maxCharges) {
                this.cd = 0
            }
            this.charges--
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
