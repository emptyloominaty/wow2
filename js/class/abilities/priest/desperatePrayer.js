class DesperatePrayer extends Ability {
    constructor() {
        let name = "Desperate Prayer"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseHealth",val:0.25}]
        this.duration = 10

    }

    getTooltip() {
        return "Increases maximum health by 25% for 10 sec, and instantly heals you for that amount."
    }

    getBuffTooltip(caster, target, buff) {
        return "Maximum health increased by 25%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            applyBuff(caster,caster,this)
            caster.health += (caster.stats.stamina*20) * 0.25

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
