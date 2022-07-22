class Epidemic extends Ability {
    constructor() {
        let name = "Epidemic"
        let cost = 30
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.2
        this.spellPower2 = 0.2
    }

    getTooltip() {
        return "Causes each of your Virulent Plagues to flare up, dealing "+spellPowerToNumber(this.spellPower)+" Shadow damage to the infected enemy," +
            " and an additional "+spellPowerToNumber(this.spellPower2)+" Shadow damage to all other enemies near them."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 30%.<br>" +
            "Immune to Stun effects."
    }

    startCast(caster) {
        let cost = this.cost
        if (caster.spec==="unholy" && checkBuff(caster,caster,"Sudden Doom")) {
            cost = 0
        }
        if (this.checkStart(caster,cost)) {
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && checkDebuff(caster,enemies[i],"Virulent Plague")) {
                    doDamage(caster, enemies[i], this)
                    for (let j = 0; j<enemies.length ;j++) {
                        if (!enemies[j].isDead && this.checkDistance(enemies[i], enemies[j],8,true) ) {
                            doDamage(caster, enemies[j], this,undefined,this.spellPower2)
                        }
                    }

                }
            }
            checkBuff(caster,caster,"Sudden Doom",true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(cost,this.secCost)
            return true
        }
        return false
    }
}
