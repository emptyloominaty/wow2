class Charge extends Ability {
    constructor() {
        let name = "Charge"
        let cost = -20
        let gcd = 0.5
        let castTime = 0
        let cd = 20
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 25
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.1147
        this.effect = [{name:"moveToTarget",val:7,target:{}}]
        this.duration = 2.5
        this.minRange = 8
        this.caster = {}
    }

    getTooltip() {
        return "Charge to an enemy, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage, rooting it for 1 sec"
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.energy>this.cost && caster.gcd<=0  && this.checkCd(caster)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead && this.checkDistance(caster,caster.castTarget) && !this.checkDistance(caster,caster.castTarget,this.minRange)) {
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
                this.setCd()
                this.caster = caster
                this.effect[0].target = caster.castTarget
                applyBuff(caster,caster,this)
                caster.useEnergy(this.cost)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(target,buff) {
    }

    endBuff(target) {

        doDamage(this.caster, this.effect[0].target, this)

        target.isRolling = false
    }
}
