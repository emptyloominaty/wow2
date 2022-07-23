class DeathCoil extends Ability {
    constructor() {
        let name = "Death Coil"
        let cost = 40
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "shadow"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.503
        this.spellPowerHeal = 2.65
    }

    getTooltip() {
        if (player.spec!=="unholy") {
            return "Fires a blast of unholy energy at the target, causing "+spellPowerToNumber(this.spellPower)+" Shadow damage to an enemy or healing an Undead ally for "+spellPowerToNumber(this.spellPowerHeal)+" health."
        } else {
            return "Fires a blast of unholy energy at the target, causing "+spellPowerToNumber(this.spellPower)+" Shadow damage to an enemy or healing an Undead ally" +
                " for "+spellPowerToNumber(this.spellPowerHeal)+" health. Reduces the cooldown of Dark Transformation by 1 sec."
        }
    }

    startCast(caster) {
        let cost = this.cost
        if (caster.spec==="unholy" && checkBuff(caster,caster,"Sudden Doom")) {
            cost = 0
        }
        if (this.checkStart(caster,cost)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            } else if (checkBuff(caster,caster,"Lichborne")){
                doHeal(caster,caster,this,undefined,this.spellPowerHeal)
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="unholy" ) {
                    caster.abilities["Dark Transformation"].incCd(caster,1,false)
                    if (caster.abilities["Army of the Damned"]) {
                        caster.abilities["Army of the Dead"].incCd(caster,5,false)
                        caster.abilities["Apocalypse"].incCd(caster,1,false)
                    }

                    checkBuff(caster,caster,"Sudden Doom",true)
                }

                this.setCd()
                caster.useEnergy(cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
