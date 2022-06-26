class EyeoftheStormElemental extends Ability {
    constructor(buffed = false) {
        let name = "Eye of the Storm"
        let cost = 0
        let gcd = 8
        let castTime = 8
        let cd = 40
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 40 //TODO:8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 8
        this.spellPower = 0.3
        if (buffed) {
           this.spellPower = this.spellPower * 1.8
        }
        this.spellPowerB = this.spellPower
    }

    getTooltip() {
        return "Channel the energy of the storms at your target, causing (10% of Spell power) Nature damage to all enemies within 8 yards every 1 sec. The damage of this ability increases by 5% every time it deals damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:1/(1 + (caster.stats.haste / 100)), timer2:1/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            this.spellPower = this.spellPowerB * 1.05
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        }
        return false
    }

    cast(caster) {
    for (let i = 0; i<enemies.length ;i++) {
        if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
            doDamage(caster, enemies[i], this)
            this.spellPower *= 1.05
        }
    }
    }
}
