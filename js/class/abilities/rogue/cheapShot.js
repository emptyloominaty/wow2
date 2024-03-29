class CheapShot extends Ability {
    constructor() {
        let name = "Cheap Shot"
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

        this.duration = 4
        this.secCost = -1
        this.effect = [{name:"stun"}]
        this.requiresStealth = true

    }

    getTooltip() {
        return "Stuns the target for 4 sec. "
    }

    startCast(caster) {
        if (this.checkStart(caster) && caster.isStealthed) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,this)
                    if (caster.abilities["Prey on the Weak"] && caster.abilities["Prey on the Weak"].talentSelect) {
                        caster.abilities["Prey on the Weak"].applyDebuff(caster,caster.castTarget)
                    }
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
                        applyDebuff(caster,caster.targetObj,this)
                        if (caster.abilities["Prey on the Weak"] && caster.abilities["Prey on the Weak"].talentSelect) {
                            caster.abilities["Prey on the Weak"].applyDebuff(caster,caster.targetObj)
                        }
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="subtlety") {
                    applyDebuff(caster,target,caster.abilities["Find Weakness"])
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
