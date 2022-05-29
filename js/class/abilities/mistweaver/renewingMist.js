class RenewingMist extends Ability {
    constructor() {
        let name = "Renewing Mist"
        let cost = 1.8 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 9
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.25
        this.duration = 20
        this.effect = ""
        this.effectValue = 0
        this.jumpRange = 20
    }

    getTooltip() {
        return "Surrounds the target with healing mists, restoring "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" health over 20 sec. If Renewing Mist heals a target past maximum health, it will travel to another injured ally within 20 yds. "
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting &&  this.checkCd(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
        caster.isCasting = false
        if (this.charges===this.maxCharges) {
            this.cd = 0
        }
        this.charges--
        if (caster.target==="" || this.isEnemy(caster)  || caster.castTarget.isDead) {
            applyHot(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster)
        } else {
            applyHot(caster,caster.castTarget,this)
            caster.abilities["Gust of Mists"].heal(caster)
        }
        caster.useEnergy(this.cost)
    }

    runBuff(target,buff,id) {
        //Jump
        if(target.health>=target.maxHealth) {
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                    let a = 0
                    for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
                        if (friendlyTargets[i].buffs[j].name === buff.name && friendlyTargets[i].buffs[j].caster === buff.caster) {
                            a = 1
                        }
                    }
                    if (!this.checkDistance(target,friendlyTargets[i],this.jumpRange)) {
                        a = 1
                    }
                    if (a===0) {
                        applyHot(buff.caster,friendlyTargets[i],buff.ability,buff.duration,buff.extendedDuration)
                        target.buffs.splice(id,1)
                        return
                    }
                }
            }
        }
    }

    endBuff(target) {
    }
}
