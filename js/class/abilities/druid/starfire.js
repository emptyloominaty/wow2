class Starfire extends Ability {
    constructor() {
        let name = "Starfire"
        let cost = -8

        let gcd = 1.5
        let castTime = 2.25
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.765
        this.spellPowerCleave = 0.765*0.33

        this.cleaveRange = 8
    }

    getTooltip() {
        return "Call down a burst of energy, causing  "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage to the target, and "+((player.stats.primary * this.spellPowerCleave) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage to all other enemies within 8 yards."
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
                let castTime = this.castTime
                if (caster.spec==="balance") {
                    castTime = castTime*caster.abilities["Eclipse"].getCastTime(caster,this)
                }
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100))}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                    caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        if (caster.target!=="" && this.isEnemy(caster,caster.castTarget)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && this.checkDistance(caster.castTarget, enemies[i],this.cleaveRange) ) {
                        doDamage(caster, enemies[i], this,undefined,this.spellPowerCleave)
                    }
                }
                let critInc = 0
                if (caster.spec==="balance") {
                    caster.abilities["Eclipse"].startCast(caster,this)
                    critInc = caster.abilities["Eclipse"].getCrit(caster,this)
                }

                doDamage(caster,caster.castTarget,this,undefined,this.spellPower,undefined,undefined,undefined,critInc)
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
