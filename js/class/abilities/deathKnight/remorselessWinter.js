class RemorselessWinter extends Ability {
    constructor() {
        let name = "Remorseless Winter"
        let cost = -10
        let gcd = 1.5
        let castTime = 0
        let cd = 20
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.05885*1.125*1.2
        this.secCost = 1
        this.duration = 8

        this.timer1 = 0
        this.timer2 = 1
    }

    getTooltip() { //TODO: movement speed
        return "Drain the warmth of life from all nearby enemies within 8 yards, dealing "+spellPowerToNumber(this.spellPower*8)+" Frost damage over 8 sec and reducing their movement speed by 20%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Dealing "+spellPowerToNumber(this.spellPower)+" Frost damage to enemies within 8 yards each second."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster, caster, this)
            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
        return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(caster, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true)) {
                    doDamage(caster,enemies[i],this)
                }
            }
        }

    }

}
