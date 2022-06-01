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

    getTooltip() {
        return "Causes a surge of invigorating mists, healing the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" and all allies with your Renewing Mist active for "+((player.stats.primary * this.spellPowerSec) * (1 + (player.stats.vers / 100))).toFixed(0)+""
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkCost(caster) && !caster.isCasting && caster.gcd<=0 && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                if (caster.channeling.name==="Soothing Mist") {
                    this.endCast(caster)
                    this.setGcd(caster)
                    bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
                    return
                } else {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
        caster.isCasting = false
        if (caster.target==="" || this.isEnemy(caster) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
            //heal self
            doHeal(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster,caster)
        } else {
            //heal target
            doHeal(caster,caster.castTarget,this)
            caster.abilities["Gust of Mists"].heal(caster,caster.castTarget)
        }
        //renewingMist
        let _y = 30
        for (let i = 0; i<friendlyTargets.length; i++) {
            Object.keys(friendlyTargets[i].buffs).forEach((key)=> {
                if (friendlyTargets[i].buffs[key].name === "Renewing Mist" && friendlyTargets[i].buffs[key].caster === caster) {
                    doHeal(caster,friendlyTargets[i],this,_y,this.spellPowerSec)
                    _y+=15
                }
            })
        }
        caster.useEnergy(this.cost)
    }
}
