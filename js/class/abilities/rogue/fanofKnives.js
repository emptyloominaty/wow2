class FanofKnives extends Ability {
    constructor() {
        let name = "Fan of Knives"
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

        this.spellPower = 0.32*1.51
        this.secCost = -1

    }

    getTooltip() {
        return  "Sprays knives at all enemies within 10 yards, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage and applying your active poisons at their normal rate."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let spellPower = this.spellPower
            if (caster.abilities["Hidden Blades"].talentSelect) {
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Hidden Blades") {
                        spellPower = spellPower * (1+(caster.buffs[i].stacks*0.2))
                        caster.buffs[i].duration = -1
                    }
                }

            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                    doDamage(caster, enemies[i], this,undefined,spellPower)
                    checkAndApplyRoguePoison(caster,enemies[i])
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
