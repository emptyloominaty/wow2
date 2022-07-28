class TricksoftheTrade extends Ability { //TODO:
    constructor() {
        let name = "Tricks of the Trade"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 30

    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Redirects all threat you cause to the targeted party or raid member, beginning with your next damaging attack within the next 30 sec and lasting 6 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Threat redirected from Rogue."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            //TODO:
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
