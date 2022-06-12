class AoeTest extends Ability {
    constructor() {
        let name = "Aoe Test"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 7
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "arcane"
        let range = 60 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.8

        this.effect = ""
        this.effectValue = 0
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 &&  this.checkCost(caster) && !caster.isCasting && this.checkCd(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
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

    runBuff() {
    }

    endBuff() {
    }
}
