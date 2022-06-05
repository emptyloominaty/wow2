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

        this.spellPower = 0.23 //TODO:

        this.effect = ""
        this.effectValue = 0

        this.hasteCd = true

    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkCd(caster,true)) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) && !caster.targetObj.isDead ) {
                if (this.checkDistance(caster,caster.targetObj,undefined,true)) {
                    if (caster.spec==="assassination") {
                        checkAndApplyRoguePoison(caster,caster.targetObj)
                    }
                    doDamage(caster, caster.targetObj, this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj,undefined,true) && !caster.targetObj.isDead) {
                        if (caster.spec==="assassination") {
                            checkAndApplyRoguePoison(caster,caster.targetObj)
                        }
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            if (done) {
                this.cd = 0
                this.maxCd = (2.6/caster.attackSpeed) / (1 + (caster.stats.haste / 100))
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
