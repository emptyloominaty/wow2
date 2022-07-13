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
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || target.isDead || this.isEnemy(caster,target) ) {
                //heal self
                doHeal(caster,caster,this) // TODO If cast on yourself, healing increased by up to 250% based on your missing health
            } else {
                //heal target
                doHeal(caster,target,this)
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
