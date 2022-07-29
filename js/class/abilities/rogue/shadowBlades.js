class ShadowBlades extends Ability {
    constructor() {
        let name = "Shadow Blades"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.noGcd = true
        this.duration = 20
    }

    getTooltip() { //Backstab, Gloomblade, Shadowstrike, ShurikenStorm, ShurikenToss, Shiv,
        return "Draws upon surrounding shadows to empower your weapons, causing your combo point generating abilities to generate 1 additional combo point and deal 50% additional damage as Shadow for 20 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Combo point generating abilities generate 1 additional combo point and deal 50% additional damage as Shadow."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}
