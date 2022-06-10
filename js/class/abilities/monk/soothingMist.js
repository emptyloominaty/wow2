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

    getTooltip() {
        return "Heals the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+"  over 8 sec.  While channeling, Enveloping Mist and Vivify may be cast instantly on the target"
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting  && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0, timer2:1/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        if (caster.target==="" || this.isEnemy(caster)  || caster.castTarget.isDead || !this.checkDistance(caster,caster.castTarget)) {
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
        }
        caster.useEnergy(this.cost)
    }
}
