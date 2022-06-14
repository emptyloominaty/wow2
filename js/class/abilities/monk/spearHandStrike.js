class SpearHandStrike extends Ability {
    constructor() {
        let name = "Spear Hand Strike"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"interrupt"}]
        this.duration = 4

    }

    getTooltip() {
        return "Jabs the target in the throat, interrupting spellcasting and preventing any spell from that school of magic from being cast for 4 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCd(caster)  && this.checkCost(caster) && !caster.isCasting) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster,caster.castTarget) ) {
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
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
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

    endCast(caster) {
    }
}
