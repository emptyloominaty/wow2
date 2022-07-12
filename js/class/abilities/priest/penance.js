class Penance extends Ability {
    constructor() {
        let name = "Penance"
        let cost = 1.6
        let gcd = 1.5
        let castTime = 1
        let cd = 9
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.4
        this.spellPowerHeal = 1.25
        this.duration = 2

    }

    getTooltip() {
        return "Launches a volley of holy light at the target, causing " +
            spellPowerToNumber(this.spellPower*3)+" Holy damage to an enemy or " +
            spellPowerToNumber(this.spellPowerHeal*3)+" healing to an ally over 2 sec. Castable while moving."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            caster.isChanneling = true
            //TODO:Castigation timer = 0.66
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0.97/(1 + (caster.stats.haste / 100)), timer2:0.97/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            caster.canMoveWhileCasting = this.canMove

            if (checkBuff(caster,caster,"Power of the Dark Side",true)) {
                this.spellPower = 0.6
                this.spellPowerHeal = 1.875
            } else {
                this.spellPower = 0.4
                this.spellPowerHeal = 1.25
            }


            this.setGcd(caster)
            caster.useEnergy(this.cost)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0) {
            if (this.isEnemy(caster, target)) {
                if (this.checkDistance(caster, target) && !target.isDead) {
                    doDamage(caster, target, this)
                }
            } else {
                if (this.checkDistance(caster, target) && !target.isDead) {
                    doHeal(caster, target, this,undefined,this.spellPowerHeal)
                }
            }
        }
    }
    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }
}
