class FistsofFury extends Ability {
    constructor() {
        let name = "Fists of Fury"
        let cost = 0
        let gcd = 1
        let castTime = 1
        let cd = 24
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true

        this.secCost = 3
        this.spellPower = 1.2075*1.2
        this.spellPowerSec = this.spellPower * 0.59

        this.duration = 4
    }

    getTooltip() {
        return "Pummels all targets in front of you, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage over 4 sec to your primary target and "+spellPowerToNumber(this.spellPowerSec)+" damage over 4 sec to all other enemies. Can be channeled while moving."
    }

    startCast(caster,pet = false) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:1/(1 + (caster.stats.haste / 100)), timer2:1/(1 + (caster.stats.haste / 100)),target:caster.castTarget,pet:pet}

            caster.canMoveWhileCasting = true
            this.setCd()
            this.setGcd(caster)
            if (caster.abilities["Inner Strength"].talentSelect) {
                caster.abilities["Inner Strength"].applyBuff(caster,this.secCost)
            }
            if (caster.abilities["Dance of Chi-Ji"].talentSelect) {
                caster.abilities["Dance of Chi-Ji"].applyBuff(caster)
            }
            let secCost = this.secCost
            if (caster.abilities["Serenity"].talentSelect && checkBuff(caster,caster,"Serenity")) {
                secCost = 0
                this.cd = this.maxCd/2
            }
            if (caster.abilities["Spiritual Focus"].talentSelect) {
                caster.abilities["Spiritual Focus"].reduceCd(caster,secCost)
            }
            caster.useEnergy(this.cost,secCost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target) && !target.isDead && this.checkDistance(caster,target)) {
            doDamage(caster,target,this)
        }
        let dir = caster.direction
        let targets = enemies
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                let dirToTarget = getDirection(caster,targets[i])
                if (directionHit(dir,dirToTarget,75)) {
                    doDamage(caster, targets[i], this,undefined,this.spellPowerSec)
                }
            }
        }

    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }

}
