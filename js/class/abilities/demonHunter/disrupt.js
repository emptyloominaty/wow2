class Disrupt extends Ability {
    constructor() {
        let name = "Disrupt"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "chaos"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"interrupt"}]
        this.duration = 3
        this.noGcd = true

    }

    getTooltip() {
        return "Interrupts the enemy's spellcasting and locks them from that school of magic for 3 sec. Generates 30 Fury on a successful interrupt"
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    if (caster.castTarget.interrupt()) {
                        applyDebuff(caster,caster.castTarget,this)
                        caster.useEnergy(-30)
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
                            caster.useEnergy(-30)
                        }
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost)
                this.setGcd(caster)
                this.setCd()
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }
}
