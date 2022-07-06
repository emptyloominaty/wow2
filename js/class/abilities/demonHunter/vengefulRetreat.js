class VengefulRetreat extends Ability {
    constructor() {
        let name = "Vengeful Retreat"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "chaos"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = "move"
        this.effectValue = -0.8175*pxToMeter
        this.duration = 0.65
        this.canCastWhileRooted = false
        this.spellPower = 0.131274
    }

    getTooltip() {
        return  " Remove all snares and vault away. Nearby enemies take "+spellPowerToNumber(this.spellPower)+" Physical damage and have their movement speed reduced by 70% for 3 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.isCasting) {
                caster.isCasting = false
            }
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],5,true))  {
                    doDamage(caster,enemies[i],this)
                    applyDebuff(caster,enemies[i],caster.abilities["VengefulRetreatDebuff"])
                }
            }

            caster.isRolling = true
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

    endBuff(caster) {
        caster.isRolling = false
        if (caster.abilities["Momentum"].talentSelect) {
            applyBuff(caster,caster,caster.abilities["VengefulRetreatMomentum"])
        }
    }
}

//--------------------------
class VengefulRetreatDebuff extends Ability {
    constructor() {
        super("Vengeful Retreat", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.hiddenSB = true
        this.duration = 3
        this.effect = [{name:"moveSpeed",val:0.7}]
    }
}
//--------------------------
class VengefulRetreatMomentum extends Ability {
    constructor() {
        super("Vengeful Retreat ", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.hiddenSB = true
        //this.hiddenBuff = true
        this.duration = 10
        this.effect = [{name:"restoreMana",val:80/2}]
    }
}