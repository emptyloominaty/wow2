class AutoAttack extends Ability {
    constructor() {
        let name = "Auto Attack"
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

        this.spellPower = 0.15 //TODO:

        this.effect = ""
        this.effectValue = 0

        this.hasteCd = true

    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkCd(caster)) {
            let done = false
            if (caster.target!=="" && caster.targetObj.enemy && !caster.targetObj.isDead ) {
                if (this.checkDistance(caster,caster.castTarget)) {
                    doDamage(caster, caster.targetObj, this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                caster.targetObj = newTarget
                caster.target = newTarget.name
                if (this.checkDistance(caster,caster.targetObj) && !caster.targetObj.isDead) {
                    doDamage(caster, caster.targetObj, this)
                    done = true
                }
            }
            if (done) {
                this.cd = 0
            }

        }
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
