class Fade extends Ability {
    constructor() {
        let name = "Fade"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 10
        this.effect = []
    }

    getTooltip() {
        return "Fade out, removing all your threat and reducing enemies' attack range against you for 10 sec." //TODO:reducing enemies' attack range against you for 10 sec.
    }

    getBuffTooltip(caster, target, buff) {
        return "Reduced threat level."
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
        applyBuff(caster,caster,this)
        for (let i = 0; i<enemies.length; i++) {
            if (enemies[i].aggro[caster.id2]) {
                enemies[i].aggro[caster.id2] = 0
            }
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
