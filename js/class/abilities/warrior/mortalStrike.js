class MortalStrike extends Ability {
    constructor() {
        let name = "Mortal Strike"
        let cost = 30
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.743*1.2*1.13
        this.hasteCd = true
    }

    getTooltip() { //TODO:healing
        return "A vicious strike that deals "+spellPowerToNumber(this.spellPower)+" Physical damage and reduces the effectiveness of healing on the target by 50% for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let spellPower = this.spellPower
            if (checkBuffStacks(caster,caster,"Overpower")) {
                spellPower *= 1.2
            }

            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,spellPower)
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
                    target = caster.targetObj
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this,undefined,spellPower)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="arms" && checkBuff(caster,caster,"Sweeping Strikes")) {
                    caster.abilities["Sweeping Strikes"].cleave(caster,target,this)
                }
                applyDot(caster,target,caster.abilities["Deep Wounds"])
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

}
