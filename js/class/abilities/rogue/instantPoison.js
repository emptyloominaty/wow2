class InstantPoison extends Ability {
    constructor() {
        let name = "Instant Poison"
        let cost = 0
        let gcd = 1
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.063
        this.duration = 3600
        this.poison = true

        this.effect = "roguePoison"
        this.effectValue = {spellPower:0.0063, spellPowerDot:0.37, durationDot:12, chance:50, name:"Instant Poison"}

    }

    getTooltip() {
        return "Coats your weapons with a Lethal Poison that lasts for 1 hour. Each strike has a 30% chance of poisoning the enemy which instantly inflicts (6.3% of Attack power) Nature damage."
    }

    getBuffTooltip(caster, target, buff) {
        return "Each strike has a chance of poisoning the enemy, inflicting "+spellPowerToNumber(this.spellPower)+" Nature damage."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setGcd(caster)
            return true
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        this.setCd()
        applyBuff(caster,caster,this)

        caster.useEnergy(this.cost,this.secCost)
        caster.isCasting = false
    }
}
