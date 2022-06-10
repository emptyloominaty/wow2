class Bloodthirst extends Ability {
    constructor() {
        let name = "Bloodthirst"
        let cost = -8

        let gcd = 1
        let castTime = 0
        let cd = 4.5
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = ((0.65)*1.29)*1.3

        this.heal = 0.03

        this.hasteCd = true

        this.effect = ""
        this.effectValue = 0

    }

    getTooltip() {
        return "A mighty blow with both weapons that deals a total of "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage."
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && this.checkCd(caster) && !caster.isCasting) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.targetObj,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                doHeal(caster,caster,this,undefined,undefined,undefined,undefined,undefined,caster.maxHealth*this.heal)

                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
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
