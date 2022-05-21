class Vivify extends Ability {
    constructor() {
        let name = "Vivify"
        let cost = 3.8 //% mana
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.41 //141%
        this.spellPowerSec = 1.04 //104% renewing
        this.effect = ""
        this.effectValue = 0
    }

    run() {
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && caster.gcd<=0) {
            if (caster.isChanneling) {
                if (caster.channeling.name==="Soothing Mist") {
                    this.endCast(caster)
                    caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
                    bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
                    return
                } else {
                    this.isChanneling = false
                    this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
        }
    }

    endCast(caster) {
        caster.isCasting = false
        if (caster.target==="" || caster.castTarget.enemy) {
            //heal self
            doHeal(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster)
        } else {
            //heal target
            doHeal(caster,caster.castTarget,this)
            caster.abilities["Gust of Mists"].heal(caster)
            //TODO:RANGE
        }
        //renewingMist
        let _y = 30
        for (let i = 0; i<friendlyTargets.length; i++) {
            Object.keys(friendlyTargets[i].buffs).forEach((key)=> {
                if (friendlyTargets[i].buffs[key].name === "Renewing Mist") {
                    doHeal(caster,friendlyTargets[i],this,_y,this.spellPowerSec)
                    _y+=15
                }
            })
        }
        caster.useEnergy(this.cost)
    }
}
