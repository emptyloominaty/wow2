class ArcaneIntellect extends Ability {
    constructor() {
        let name = "Arcane Intellect"
        let cost = 4
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 100
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"arcaneIntellect"}]
        this.duration = 3600

    }

    getTooltip() {
        return "Infuses the target with brilliance, increasing their Intellect by 5% for 1 hour.  <br>" +
            "<br>" +
            "If the target is in your party or raid, all party and raid members will be affected." //TODO:?
    }

    getBuffTooltip(caster, target, buff) {
        return "Intellect increased by 5%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i]) && !friendlyTargets[i].isDead) {
                    applyBuff(caster,friendlyTargets[i],this)
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
