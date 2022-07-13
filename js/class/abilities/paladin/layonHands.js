class LayonHands extends Ability {
    constructor() {
        let name = "Lay on Hands"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 600
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 0.68
        this.spellPowerHeal = 1.55
        this.noGcd = true
    }

    getTooltip() {
        return "Heals a friendly target for an amount equal to your maximum health.<br>" +
            "<br>" +
            "Cannot be used on a target with Forbearance. Causes Forbearance for 30 sec." //TODO
    }


    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || target.isDead || this.isEnemy(caster,target) || !this.checkDistance(caster,caster.castTarget)) {
                //heal self
                doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,caster.maxHealth)
            } else {
                doHeal(caster,target,this,undefined,undefined,false,undefined,undefined,caster.maxHealth)
            }
            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
