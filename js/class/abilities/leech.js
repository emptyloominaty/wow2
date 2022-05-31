class Leech extends Ability {
    constructor() {
        let name = "Leech"
        let cost = 0 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 2.6 // weapon speed
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.15

        this.effect = ""
        this.effectValue = 0

        this.hasteCd = true

    }

    run(caster) {
    }

    startCast(caster,val) {
        if (this.checkDistance(caster,caster.targetObj)) {
            doHeal(caster, caster, this,undefined,undefined,false,undefined,undefined,val * (caster.stats.leech / 100))
        }

    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
