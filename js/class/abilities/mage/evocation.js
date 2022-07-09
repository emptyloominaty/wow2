class Evocation extends Ability {
    constructor() {
        let name = "Evocation"
        let cost = 0
        let gcd = 1.5
        let castTime = 6
        let cd = 90
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
    }

    getTooltip() {
        return "Spin while kicking in the air, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage over 1.5 sec to all enemies within 8 yds."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:(0.2/(1 + (caster.stats.haste / 100))), timer2:(0.2/(1 + (caster.stats.haste / 100)))}

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        caster.energy += caster.maxEnergy*0.0334
    }

}
