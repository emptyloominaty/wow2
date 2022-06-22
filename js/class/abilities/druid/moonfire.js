class Moonfire extends Ability {
    constructor(balance = false) {
        let name = "Moonfire"
        let cost = 1.2 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.2
        this.spellPowerDot = 1.392
        this.duration = 16

        if (balance) {
            this.cost = -2
        }


    }

    getTooltip() {
        return "A quick beam of lunar light burns the enemy for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage and then an additional  "+((player.stats.primary * this.spellPowerDot) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" Arcane damage over 16 sec."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget)) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerDot)
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

    endCast(caster) {
    }
}
