class Stormstrike extends Ability {
    constructor() {
        let name = "Stormstrike"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 7.5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 2.148
        this.hasteCd = true
    }

    getTooltip() {
        return "Energizes both your weapons with lightning and delivers a massive blow to your target, dealing a total of "+spellPowerToNumber(this.spellPower)+" Physical damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            let spellPower = this.spellPower
            if (checkBuff(caster,caster,"Stormbringer")) {
                spellPower *= 1.25
            }
            if (caster.abilities["Stormflurry"].talentSelect && getChance(25)) {
                spellPower *= 1.4
            }
            if (caster.abilities["Elemental Assault"].talentSelect) {
                spellPower *= 1.15
            }

            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,spellPower)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    target = caster.targetObj
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this,undefined,spellPower)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.abilities["Elemental Assault"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Maelstrom Weapon"],1,true)
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
