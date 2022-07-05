class FelRush extends Ability {
    constructor() {
        let name = "Fel Rush"
        let cost = 0
        let gcd = 0.5
        let castTime = 0
        let cd = 10
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "chaos"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "move"
        this.effectValue = 2.1*pxToMeter
        this.duration = 0.25
        this.canCastWhileRooted = false

        this.spellPower = 0.253*1.25 //rank3
        this.targetsDamaged = []
    }

    getTooltip() {
        return  "Rush forward, incinerating anything in your path for "+spellPowerToNumber(this.spellPower)+" Chaos damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.isCasting) {
                caster.isCasting = false
            }
            caster.isRolling = true
            this.targetsDamaged = []
            this.setGcd(caster)
            this.setCd()
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(caster, buff, id = 0) {
        for (let i = 0; i<enemies.length; i++) {
            if (!enemies[i].isDead && this.targetsDamaged.indexOf(i)===-1 && this.checkDistance(caster,enemies[i],5,true))  {
                doDamage(caster,enemies[i],this)
                this.targetsDamaged.push(i)
            }
        }
    }

    endBuff(target) {
        target.isRolling = false
    }
}
