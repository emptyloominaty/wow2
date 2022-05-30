class FlameShock extends Ability {
    constructor() {
        let name = "Flame Shock"
        let cost = 0.3 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "fire"
        let range = 40 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.195
        this.spellPowerDot = 1.044
        this.duration = 18

        this.effect = ""
        this.effectValue = 0



    }

    getTooltip() {
        return "Sears the target with fire, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Fire damage and then an additional "+((player.stats.primary * this.spellPowerDot) * (1 + (player.stats.vers / 100))).toFixed(0)+" Fire damage over 18 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCd(caster) &&this.checkCost(caster) && !caster.isCasting) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.targetObj,this)
                    applyDot(caster,caster.targetObj,this,undefined,undefined,this.spellPowerDot)
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
                        applyDot(caster,caster.targetObj,this,undefined,undefined,this.spellPowerDot)
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
                this.cd = 0
            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
