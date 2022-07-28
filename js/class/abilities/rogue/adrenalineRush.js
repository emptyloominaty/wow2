class AdrenalineRush extends Ability {
    constructor() {
        let name = "Adrenaline Rush"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.noGcd = true
        this.duration = 20
        this.effect = [{name:"incAttackSpeed",val:0.2}]
    }

    getTooltip() {
        return "Increases your Energy regeneration rate by 60%, your maximum Energy by 50, and your attack speed by 20% for 20 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Energy regeneration increased by 60%.<br>" +
            "Maximum Energy increased by 50.<br>" +
            "Attack speed increased by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            applyBuff(caster,caster,this)
            caster.energy += 50
            caster.maxEnergy += 50
            caster.energyRegen += 8.1
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster) {
        caster.energy -= 50
        caster.maxEnergy -= 50
        caster.energyRegen -= 8.1
    }

}
