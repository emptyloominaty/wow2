class CrimsonVial extends Ability {
    constructor() {
        let name = "Crimson Vial"
        let cost = 20
        let gcd = 1
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 4
        this.effect = [{name:"healPercent",val:0.05,timer1:0,timer2:0.95}]
    }

    getTooltip() {
        return "Drink an alchemical concoction that heals you for 20% of your maximum health over 4 sec."
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
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
