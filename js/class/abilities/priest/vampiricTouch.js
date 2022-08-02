class VampiricTouch extends Ability {
    constructor() {
        let name = "Vampiric Touch"
        let cost = -5
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.29*1.5
        this.duration = 21
        this.timer1 = 0
        this.timer2 = 1

    }

    getTooltip() {
        return "A touch of darkness that causes "+spellPowerHotToNumber(this.spellPower)+" Shadow damage over 21 sec, and heals you for 50% of damage dealt.<br>" +
            "If Vampiric Touch is dispelled, the dispeller flees in Horror for 3 sec<br>" +
            "<br>" +
            "Generates 5 Insanity."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done && Object.keys(caster.castTarget).length !== 0) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                applyDot(caster,target,this,undefined,undefined,this.spellPowerDot)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }


    runBuff(target, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            doHeal(buff.caster,buff.caster,this,undefined,this.spellPower/this.duration*0.5)
        }
    }

}
