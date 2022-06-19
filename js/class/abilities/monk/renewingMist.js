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
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
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
        this.setCd()

        let duration = this.duration
        let spellPower = this.spellPower

        //thunder focus tea
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Thunder Focus Tea") {

                duration = duration * 1.5
                spellPower = spellPower *1.5

                if (caster.buffs[i].stacks>1) {
                    caster.buffs[i].stacks--
                } else {
                    caster.buffs[i].duration = -1
                    caster.abilities["Thunder Focus Tea"].cd = 0
                }
            }
        }

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            applyHot(caster,caster,this,duration,undefined,spellPower,duration)
            caster.abilities["Gust of Mists"].heal(caster,caster)
        } else {
            applyHot(caster,target,this,duration,undefined,spellPower,duration)
            caster.abilities["Gust of Mists"].heal(caster,target)
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
                    if (!this.checkDistance(target,friendlyTargets[i],this.jumpRange,true)) {
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
}
