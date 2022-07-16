class WordofGlory extends Ability {
    constructor() {
        let name = "Word of Glory"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 3.15
        this.secCost = 3
    }

    getTooltip() {
        return "Calls down the Light to heal a friendly target for "+spellPowerToNumber(this.spellPower)+".<br>" +
            "<br>" +
            "If cast on yourself, healing increased by up to 250% based on your missing health"
    }


    startCast(caster) {
        let secCost = this.secCost
        let spellPower = this.spellPower
        if (caster.spec==="holyPaladin" && caster.abilities["Divine Purpose"].talentSelect && checkBuff(caster,caster,"Divine Purpose")) {
            secCost = 0
            spellPower *= 1.2
        }

        if (this.checkStart(caster,undefined,secCost)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || target.isDead || this.isEnemy(caster,target) ) {
                spellPower = spellPower * (((caster.maxHealth-caster.health) / caster.maxHealth) * 2.5 + 1)
                //heal self
                doHeal(caster,caster,this,undefined,spellPower)
            } else {
                //heal target
                doHeal(caster,target,this,undefined,spellPower)
            }
            if (caster.spec==="holyPaladin") {
                if (caster.abilities["Awakening"].talentSelect) {
                    if (getChance(15)) {
                        applyBuff(caster,caster,caster.abilities["Avenging Wrath"],undefined,undefined,undefined,10)
                    }
                }
                if (caster.abilities["Divine Purpose"].talentSelect) {
                    checkBuff(caster,caster,"Divine Purpose",true)
                    if (getChance(15)) {
                        applyBuff(caster,caster,caster.abilities["Divine Purpose"])
                    }
                }
            }
            caster.useEnergy(this.cost,secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
