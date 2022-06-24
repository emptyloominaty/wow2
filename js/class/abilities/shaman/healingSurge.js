class HealingSurge extends Ability {
    constructor() {
        let name = "Healing Surge"
        let cost = 4.8 //% mana
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

        this.spellPower = 2.48
    }

    getTooltip() {
        return "A quick surge of healing energy that restores "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" of a friendly target's health."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let castTime = this.castTime
            if (caster.abilities["Flash Flood"].checkBuff(caster)) {
                castTime = castTime * (1-caster.abilities["Flash Flood"].reduceCastTime)
            }

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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

        let critInc = 0
        for (let i = 0; i<caster.buffs.length;i++) {
            if (caster.buffs[i].name==="Tidal Waves") {
                critInc = 30
                caster.abilities["Flash Flood"].applyBuff(caster)
                if (caster.buffs[i].stacks>1) {
                    caster.buffs[i].stacks--
                    caster.buffs[i].duration = 15
                } else {
                    caster.buffs[i].duration = -1
                }
            }
        }

        let spellPower = this.spellPower * (1+caster.abilities["Undulation"].checkBuff(caster))
        spellPower = spellPower * (1+caster.abilities["Unleash Life"].checkBuff(caster))
        spellPower = spellPower * (1+caster.abilities["Deluge"].checkBuff(caster,target))

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            //heal self
            doHeal(caster,caster,this,undefined,spellPower,undefined,undefined,undefined,undefined,critInc)
            target = caster
        } else {
            //heal target
            doHeal(caster,target,this,undefined,spellPower,undefined,undefined,undefined,undefined,critInc)
        }

        caster.abilities["Ancestral Vigor"].applyBuff(caster,target)

        this.setCd()
        caster.useEnergy(this.cost)
    }
}
