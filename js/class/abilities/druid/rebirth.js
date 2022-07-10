class Rebirth extends Ability {
    constructor(resto = true) {
        let name = "Rebirth"
        let cost = 0.8
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        if (!resto) {
            this.cost = 0
        }
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Returns the spirit to the body, restoring a dead target to life with 60% health and at least 20% mana. Castable in combat."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.targetObj) && crCount>1 && caster.targetObj.isDead  && !caster.targetObj.enemy) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let castTime = this.castTime
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Nature's Swiftness") {
                    castTime = 0
                    caster.buffs[i].duration = -1
                }
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.targetObj}
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

        if (target.isDead && this.checkDistance(caster,target) && !target.enemy) {
            resurrect(caster,target,1)
            crCount --
        }

        caster.useEnergy(this.cost)
    }
}
