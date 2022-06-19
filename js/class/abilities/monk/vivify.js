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
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                if (caster.channeling.name==="Soothing Mist") {
                    caster.casting = {name:this.name, time:0, time2:0,target:caster.channeling.target}
                    this.endCast(caster)
                    this.setGcd(caster)
                    bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
                    return true
                } else {
                    caster.isChanneling = false
                }
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            //heal self
            doHeal(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster,caster)
        } else {
            //heal target
            doHeal(caster,target,this)
            caster.abilities["Gust of Mists"].heal(caster,target)
        }
        //renewingMist
        for (let i = 0; i<friendlyTargets.length; i++) {
            Object.keys(friendlyTargets[i].buffs).forEach((key)=> {
                if (friendlyTargets[i].buffs[key].name === "Renewing Mist" && friendlyTargets[i].buffs[key].caster === caster) {
                    doHeal(caster,friendlyTargets[i],this,undefined,this.spellPowerSec)
                }
            })
        }
        let cost = this.cost

        //Lifecycles
        if (caster.spec==="mistweaver") {
            cost =  cost * (1-caster.abilities["Lifecycles"].check(caster,this))
        }

        //thunder focus tea
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Thunder Focus Tea") {

                cost = 0

                caster.abilities["Thunder Focus Tea"].cd = 0
                caster.buffs[i].duration = -1
            }
        }

        caster.useEnergy(cost)
    }
}
