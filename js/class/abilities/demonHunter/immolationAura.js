class ImmolationAura extends Ability {
    constructor(vengeance=false) {
        let name = "Immolation Aura"
        let cost = -20
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.100901
        this.spellPowerInstant = 0.27027
        this.duration = 12
        this.hasteCd = true

        if (vengeance) {
            this.cd = 15
            this.duration = 6
        }

        this.timer1 = 1
        this.timer2 = 1
    }

    getTooltip() {
        return "Engulf yourself in flames, instantly causing "+spellPowerToNumber(this.spellPowerInstant)+" Fire damage to enemies within 8 yards and radiating "+spellPowerToNumber(this.spellPower*6)+" Fire damage over 6 sec. Generates 20 Fury."

    }

    getBuffTooltip(caster, target, buff) {
        return "Burning nearby enemies for (10.0901% of Attack power) Fire damage every 1 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true))  {
                    doDamage(caster,enemies[i],this,undefined,this.spellPowerInstant)
                }
            }
            if (caster.spec==="havoc" && caster.abilities["Unbound Chaos"].talentSelect) {
                applyBuff(caster,caster,caster.abilities["Unbound Chaos"])
            }
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    runBuff(caster, buff, id = 0) {
        if (this.timer1<=this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            if (caster.spec==="havoc" && caster.abilities["Burning Hatred"].talentSelect) {
                caster.useEnergy(-5)
            }
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true))  {
                    doDamage(caster,enemies[i],this)
                }
            }
        }

    }

}
