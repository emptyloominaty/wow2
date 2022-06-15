class HolyFire extends Ability {
    constructor() {
        let name = "Holy Fire"
        let cost = 1 //% mana

        let gcd = 1.5
        let castTime = 1.5
        let cd = 10
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.5*1.44
        this.spellPowerDot = 0.5775*1.44
        this.duration = 7

        this.effect = ""
        this.effectValue = 0



    }

    getTooltip() {
        return "Consumes the enemy in Holy flames that cause "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Holy damage and an "+((player.stats.primary * this.spellPowerDot) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" Holy damage over 7 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (caster.target!=="" && this.isEnemy(caster) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                this.setGcd(caster)
                return true
            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        if (caster.target!=="" && this.isEnemy(caster)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                doDamage(caster, caster.castTarget, this)
                applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerDot)
                caster.useEnergy(this.cost,this.secCost)
                this.cd = 0
            }
        }
    }

    runBuff() {
    }

    endBuff() {
    }
}
