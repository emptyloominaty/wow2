class KidneyShot extends Ability {
    constructor() {
        let name = "Kidney Shot"
        let cost = 25
        let gcd = 1
        let castTime = 0
        let cd = 5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 2
        this.secCost = "all"
        this.effect = [{name:"stun"}]

    }

    getTooltip() {
        return "Finishing move that stuns the target. Lasts longer per combo point: " +
            "<br> 1 point: 2 seconds" +
            "<br> 2 points: 3 seconds" +
            "<br> 3 points: 4 seconds" +
            "<br> 4 points: 5 seconds" +
            "<br> 5 points: 6 seconds"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.duration = 1 + caster.secondaryResource
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,this)
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
                        applyDebuff(caster,caster.targetObj,this)
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

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}