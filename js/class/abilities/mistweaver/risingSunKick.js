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

        this.effect = ""
        this.effectValue = 0

    }

    run() {
        if (this.cd<this.maxCd) {
            this.cd += progressInSec
        }
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && caster.gcd<=0 && !caster.targetObj.isDead) {
            let done = false
            if (caster.target!=="" && caster.castTarget.enemy) {
                //TODO:RANGE
                doDamage(caster,caster.targetObj,this)
                done = true
            } else {
                //TODO:FIND NEAREST ENEMY TARGET
                //done = true
            }
            if (done) {
                this.cd = 0
                caster.useEnergy(this.cost)
                if (caster.isChanneling) {
                    this.isChanneling = false
                    this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
                bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
            }

        } else if (caster.gcd<spellQueueWindow && caster.gcd>0) {
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
