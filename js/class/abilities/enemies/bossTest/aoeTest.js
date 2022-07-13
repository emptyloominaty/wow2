class AoeTest extends Ability {
    constructor() {
        let name = "Aoe Dmg"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 2
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = true
        let school = "arcane"
        let range = 60 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.aoe = true
        this.spellPower = 4
        this.cd = 0
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        for (let i = 0; i<friendlyTargets.length; i++) {
            doDamage(caster,friendlyTargets[i],this)
        }

        this.setCd()
        caster.useEnergy(this.cost)
    }
}
