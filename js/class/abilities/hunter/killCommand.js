class KillCommand extends Ability {
    constructor(bm = false) {
        let name = "Kill Command"
        let cost = -15
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 50
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.79
        if (bm) {
            this.cost = 30
            this.cd = 7.5
            this.spellPower = 1.29
        }
    }

    getTooltip() { //TODO:your pet
        return "Give the command to kill, causing your pet to savagely deal "+spellPowerToNumber(this.spellPower)+" Physical damage to the enemy.<br>" +
            "Has a 25% chance to immediately reset its cooldown"
        if (player.spec==="beastMastery") {
            return "Give the command to kill, causing your pet to savagely deal "+spellPowerToNumber(this.spellPower)+" Physical damage to the enemy."
        }
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                if (caster.spec==="survival") {
                    let chance = 25
                    if (checkBuff(caster,caster,"Coordinated Assault")) {
                        chance += 25
                    }
                    if (getChance(chance)) {
                        this.cd = this.maxCd
                    }
                }
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
