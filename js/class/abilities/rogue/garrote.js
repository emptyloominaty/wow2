class Garrote extends Ability {
    constructor() {
        let name = "Garrote"
        let cost = 45


        let gcd = 1
        let castTime = 0
        let cd = 6
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.08*1.51
        this.duration = 18

        this.secCost = -1

        this.bleed = true



    }

    getTooltip() {
        return "Garrote the enemy, causing (108% of Attack power) "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" Bleed damage over 18 sec. Silences the target for 3 sec when used from Stealth"
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let spellPower = this.spellPower
            let cd = this.cd
            if (caster.abilities["Subterfuge"].talentSelect) {
                if (caster.isStealthed || checkBuff(caster,caster,"Subterfuge")) {
                    spellPower *= 1.8
                    cd = 0
                }
            }

            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDot(caster,caster.castTarget,this,undefined,undefined,spellPower)
                    caster.abilities["GarroteSilence"].silence(caster,caster.castTarget)
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
                        applyDot(caster,caster.targetObj,this,undefined,undefined,spellPower)
                        caster.abilities["GarroteSilence"].silence(caster,caster.targetObj)
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
                if (cd===0) {
                    this.cd = this.maxCd
                }
                return true
            }

        } else if (this.canSpellQueue()) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }
}


class GarroteSilence extends Ability {
    constructor() {
        super("GarroteSilence", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.hiddenSB = true
        this.effect = [{name:"interrupt"}]
        this.duration = 3
    }

    getTooltip() {
        return "Silences an enemy for 3 sec."
    }

    silence(caster,target) {
        this.duration = 3
        this.effect[1] = {name:"no"}

        if (caster.abilities["Iron Wire"].talentSelect) {
            this.duration = 6
            this.effect[1] = {name:"reduceDamage",val:0.15}
        }

        if (caster.abilities["Subterfuge"].talentSelect) {
            if (checkBuff(caster, caster, "Subterfuge")) {
                target.interrupt()
                applyDebuff(caster,target,this)
            }
        }
        if (caster.isStealthed) {
            target.interrupt()
            applyDebuff(caster,target,this)
        }
    }

}