class ChaosStrike extends Ability {
    constructor() {
        let name = "Chaos Strike"
        let cost = 40

        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "chaos"
        let range = 5 //melee
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.44275+0.69575*1.1*1.08

        this.refundChance = 20
        this.refund = 20

    }

    getTooltip() {
        return "Slice your target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Chaos damage. Annihilation has a 20% chance to refund 20 Fury."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let spellPower = this.spellPower
            if (caster.abilities["Essence Break"].talentSelect) {
                if (checkBuff(caster,caster,"Essence Break")) {
                    spellPower *= 1.4
                }
            }
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this,undefined,spellPower)
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
                        doDamage(caster, caster.targetObj, this,undefined,spellPower)
                        done = true
                    }
                }
            }
            if (done) {
                let cost = this.cost
                if (getChance(this.refundChance)) {
                    cost = cost - this.refund
                    if (caster.abilities["Cycle of Hatred"].talentSelect) {
                        caster.abilities["Eye Beam"].incCd(caster,3,false)
                    }
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(cost,this.secCost)
                this.setGcd(caster)
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
