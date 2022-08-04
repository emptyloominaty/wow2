class Agony extends Ability {
    constructor() {
        let name = "Agony"
        let cost = 1
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.0134*1.14*9*6 //
        this.duration = 18
        this.stacks = 2
        this.maxStacks = 10
        this.timer1 = 0
        this.timer2 = 2
    }

    getTooltip() { //TODO:MULTITARGET STACKS
        return "Inflicts increasing agony on the target, causing up to "+spellPowerHotToNumber(this.spellPower)+" Shadow damage over 18 sec. Damage starts low and increases over the duration." +
            " Refreshing Agony maintains its current damage level." +
            "Agony damage sometimes generates 1 Soul Shard."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                applyDot(caster,target,this,undefined,undefined,this.spellPower*this.stacks)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

    runBuff(target, buff, id) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            this.stacks++
            if (this.maxStacks<this.stacks) {
                this.stacks = this.maxStacks
            }
            buff.spellPower = (this.spellPower * this.stacks) / this.duration
            if (getChance(45)) { //TODO:CHANCE?
                buff.caster.useEnergy(0,-1)
            }
        }
    }

    endBuff(target) {
        this.stacks = 2
    }

}
