class RallyingCry extends Ability {
    constructor() {
        let name = "Rallying Cry"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseHealth",val:0.2}]
        this.duration = 10

    }

    getTooltip() {
        return "Lets loose a rallying cry, granting all party or raid members within 40 yards 20% temporary and maximum health for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i]) && !friendlyTargets[i].isDead) {
                    applyBuff(caster,friendlyTargets[i],this)
                    friendlyTargets[i].health += (friendlyTargets[i].stats.stamina*20) * 0.2
                }
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
