class SoothingMist extends Ability {
    constructor() {
        let name = "Soothing Mist"
        let cost = 0.4 //% mana every sec
        let gcd = 1
        let castTime = 1
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.55 //440% over 8sec
        this.duration = 8
        this.effect = ""
        this.effectValue = 0
    }

    run() {
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && !caster.isChanneling && caster.gcd<=0 && !caster.targetObj.isDead) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0, timer2:1}
            caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
        } else if (caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    cast(caster) {
        if (caster.target==="" || caster.castTarget.enemy) {
            //heal self
            doHeal(caster,caster,this)
            let masteryRng = Math.floor(Math.random()*7)
            if (masteryRng===0) {
                caster.abilities["Gust of Mists"].heal(caster)
            }
        } else {
            //heal target
            doHeal(caster,caster.castTarget,this)
            let masteryRng = Math.floor(Math.random()*7)
            if (masteryRng===0) {
                caster.abilities["Gust of Mists"].heal(caster)
            }
            //TODO:RANGE
        }
        caster.useEnergy(this.cost)
    }
}
