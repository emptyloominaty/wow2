class BloodBoil extends Ability {
    constructor() {
        let name = "Blood Boil"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 7.5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.hasteCd = true
        this.spellPower = 0.4257
        this.secCost = 1
    }

    getTooltip() {
        return "Deals "+spellPowerToNumber(this.spellPower)+" Shadow damage and infects all enemies within 10 yds with Blood Plague."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],10,true)) {
                    doDamage(caster,enemies[i],this)
                    applyDot(caster,enemies[i], caster.abilities["Blood Plague"])
                }
            }

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
}

//----------------------------------------
class BloodPlague extends Ability {
    constructor() {
        let name = "Blood Plague"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.hiddenSB = true
        this.spellPower = 0.6416
        this.duration = 24

        this.timer1 = 0
        this.timer2 = 1

    }

    getTooltip() {
        return "A shadowy disease that drains "+spellPowerToNumber(this.spellPower)+" health from the target over 24 sec."
    }

    runBuff(target, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            doHeal(buff.caster,buff.caster,this,undefined,this.spellPower/24)
        }

    }


}
