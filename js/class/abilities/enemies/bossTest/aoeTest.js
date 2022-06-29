class AoeTest extends Ability {
    constructor() {
        let name = "Aoe Test"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 7
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "arcane"
        let range = 60 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.aoe = true
        this.spellPower = 2.8
        this.cd = 0
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                doDamage(caster,friendlyTargets[i],this)
            }
            this.cd = 0
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endCast(caster) {
    }
}
