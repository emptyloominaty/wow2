class BigDmg extends Ability {
    constructor() {
        let name = "Big Dmg"
        let cost = 0 //% mana
        let gcd = 1
        let castTime = 0
        let cd = 3
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 30.5

        this.effect = ""
        this.effectValue = 0


    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget)) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.targetObj.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                caster.targetObj = newTarget
                caster.target = newTarget.name
                if (this.checkDistance(caster,caster.targetObj)  && !caster.targetObj.isDead) {
                    doDamage(caster, caster.targetObj, this)
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.cd = 0
                this.setGcd(caster)
                return true
            }
        }
        return false
    }

    endCast(caster) {
    }
}
