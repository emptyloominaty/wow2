class SweepingStrikes extends Ability {
    constructor() {
        let name = "Sweeping Strikes"
        let cost = 0
        let gcd = 0.75
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 12
    }

    getTooltip() {
        return "For 12 sec your single-target damaging abilities hit 1 additional target within 8 yds for 75% damage."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your single-target damaging abilities hit 1 additional target within 8 yds for 75% damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    cleave(caster,target,ability) {
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Sweeping Strikes") {
                let tt = 0
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && enemies[i]!==target && this.checkDistance(caster,target,8,true)) {
                        doDamage(caster,enemies[i],ability,undefined,ability.spellPower*0.75)
                        tt++
                        if (tt>=1) {
                            break
                        }
                    }
                }
                return true
            }
        }
    }
}
