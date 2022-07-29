class ShurikenStorm extends Ability {
    constructor() {
        let name = "Shuriken Storm"
        let cost = 35
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.243*1.21
        this.secCost = -1

    }

    getTooltip() {
        return  "Sprays shurikens at all enemies within 10 yards, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage.<br>" +
            "Shuriken Storm has an additional 15% chance to crit and its critical strikes with Shuriken Storm apply Find Weakness for 6 sec<br>" +
            "<br>" +
            "Awards 1 combo points per target hit plus an additional 1"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    doDamage(caster, enemies[i], this,undefined,undefined,undefined,undefined,undefined,15)
                    applyDebuff(caster,enemies[i],caster.abilities["Find Weakness"],undefined,undefined,undefined,undefined,6) //TODO:ONLY CRITS
                    caster.useEnergy(0,-1)
                }
            }

            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
