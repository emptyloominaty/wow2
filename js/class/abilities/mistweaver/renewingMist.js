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

    run() {
        if (this.cd<this.maxCd) {
            this.cd+=progress/1000
            if (this.cd>=this.maxCd) {
                this.charges++
                if (this.charges!==this.maxCharges) {
                    this.cd=0
                }
            }
        }
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && caster.gcd<=0 && this.charges>0) {
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            caster.gcd = this.gcd / (1 + (caster.stats.haste / 100))
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
        }
    }

    endCast(caster) {
        caster.isCasting = false
        this.charges--
        this.cd = 0
        if (caster.target==="") {
            applyHot(caster,caster,this)
            caster.abilities["Gust of Mists"].heal(caster)
        } else {
            applyHot(caster,caster.targetObj,this)
            caster.abilities["Gust of Mists"].heal(caster)
            //TODO:RANGE
        }
        caster.useEnergy(this.cost)
    }

    runBuff(target,buff,id) {
        //Jump
        if(target.health>=target.maxHealth) {
            for (let i = 0; i<friendlyTargets.length; i++) {
                //TODO:RANGE
                if (friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                    let a = 0
                    for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
                        if (friendlyTargets[i].buffs[j].name === buff.name && friendlyTargets[i].buffs[j].caster === buff.caster) {
                            a = 1
                        }
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
