class CounterShot extends Ability {
    constructor() {
        let name = "Counter Shot"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 24
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"interrupt"}]
        this.duration = 3
        this.noGcd = true

    }

    getTooltip() {
        return "Interrupts spellcasting, preventing any spell in that school from being cast for 3 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    if (caster.castTarget.interrupt()) {
                        applyDebuff(caster,caster.castTarget,this)
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
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        if (caster.targetObj.interrupt()) {
                            applyDebuff(caster,caster.targetObj,this)
                        }
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
                this.setCd()
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
