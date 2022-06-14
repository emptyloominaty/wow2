class BigDmg extends Ability {
    constructor() {
        let name = "Big Dmg"
        let cost = 0 //% mana
        let gcd = 1
        let castTime = 0
        let cd = 5
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 25.5

        this.effect = ""
        this.effectValue = 0


    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting && this.checkCd(caster)) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster)) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.targetObj.isDead) {
                    doDamage(caster,caster.targetObj,this)
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
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
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

    runBuff() {
    }

    endBuff() {
    }
}
