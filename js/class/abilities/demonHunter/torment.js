class Torment extends Ability {
    constructor() {
        let name = "Torment"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 8
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 8

    }

    getTooltip() {
        return "Taunts the target to attack you."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (this.isEnemy(caster,caster.castTarget) && Object.keys(caster.castTarget).length !== 0) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    taunt(caster,caster.castTarget)
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
                        taunt(caster,caster.targetObj)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.cd = 0
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
