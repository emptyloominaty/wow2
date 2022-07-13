class BeaconofLight extends Ability {
    constructor() {
        let name = "Beacon of Light"
        let cost = 0.5
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 60
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 10
        this.currentTarget = false
        this.permanentBuff = true

    }

    getTooltip() {
        return  "Wrap a single ally in holy energy, causing your heals on other party or raid members to also heal that ally for 50% of the amount healed.<br><br>" +
            "Healing this ally directly with Flash of Light or Holy Light grants 1 Holy Power"
    }

    getBuffTooltip(caster, target, buff) {
        return "Healed whenever the "+caster.name+" heals a nearby ally."
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
        for (let i = 0; i<friendlyTargets.length; i++) {
            for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
                if (friendlyTargets[i].buffs[j].name===this.name && friendlyTargets[i].buffs[j].caster === caster) {
                    friendlyTargets[i].buffs[j].duration = -1
                }
            }
        }

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            applyBuff(caster,caster,this)
            this.currentTarget = caster
        } else {
            applyBuff(caster,target,this)
            this.currentTarget = target
        }
        caster.useEnergy(this.cost)
    }
}
