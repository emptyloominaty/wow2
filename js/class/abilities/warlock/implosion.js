class Implosion extends Ability {
    constructor() {
        let name = "Implosion"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.264
    }

    getTooltip() {
        return "Demonic forces suck all of your Wild Imps toward the target, and then cause them to violently explode, dealing "+spellPowerToNumber(this.spellPower)+" Shadowflame damage to all enemies within 8 yards."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            for (let i = 0; i<caster.pets.length; i++) {
                if (caster.pets[i].name === "Wild Imp") {
                    for (let j = 0; j<enemies.length ;j++) {
                        if (!enemies[j].isDead && this.checkDistance(caster.pets[i], enemies[j],8,true) ) {
                            doDamage(caster, enemies[j], this)
                        }
                    }
                    caster.pets[i].end()
                }
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
