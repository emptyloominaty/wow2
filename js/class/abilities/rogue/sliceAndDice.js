class SliceAndDice extends Ability {
    constructor() {
        let name = "Slice And Dice"
        let cost = 25

        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0

        this.duration = 12


        this.effect = "incAttackSpeed"
        this.effectValue = 0.5

        this.secCost = "all"

    }

    getTooltip() {
        return "Finishing move that consumes combo points to increase attack speed by 50%. Lasts longer per combo point.   1 point  : 12 seconds " +
            "2 points: 18 seconds" +
            "3 points: 24 seconds" +
            "4 points: 30 seconds" +
            "5 points: 36 seconds"
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && caster.secondaryResource>0 && caster.energy>this.cost && this.checkCd(caster) && !caster.isCasting) {
            this.duration = 12 + (6*caster.secondaryResource)
            this.cd = 0
            applyBuff(caster,caster,this)
            this.setGcd(caster)
            caster.useEnergy(this.cost,this.secCost)
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
                spellQueue.add(this,caster.gcd)
            }
            return true
        }
        return false
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}