class EnvelopingMist extends Ability {
    constructor() {
        let name = "Enveloping Mist"
        let cost = 5.6 //% mana
        let gcd = 2
        let castTime = 2
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 3.6
        this.duration = 6
        this.effect = "healingIncrease"
        this.effectValue = 0.3
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkCost(caster) && !caster.isCasting && caster.gcd<=0 && !caster.targetObj.isDead) {
            if (caster.isChanneling) {
                if (caster.channeling.name==="Soothing Mist") {
                    this.endCast(caster)
                    caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
                    return
                } else {
                    this.isChanneling = false
                    this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }

            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
        if (player.talents.MistWrap) {
            this.duration = 7
            this.spellPower = 4.2
            this.effectValue = 0.4
        } else {
            this.duration = 6
            this.spellPower = 3.6
            this.effectValue = 0.3
        }
        caster.isCasting = false
        if (caster.target==="" || caster.castTarget.enemy) {
            applyHot(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster)
        } else {
            applyHot(caster,caster.castTarget,this)
            caster.abilities["Gust of Mists"].heal(caster)
            //TODO:RANGE
        }
        caster.useEnergy(this.cost)
    }

    runBuff(target,buff,id) {
    }

    endBuff(target) {
    }
}
