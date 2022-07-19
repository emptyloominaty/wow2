class ColossusSmash extends Ability {
    constructor() {
        let name = "Colossus Smash"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = []
        this.duration = 10
        this.spellPower = 1.815

    }

    getTooltip() {
        return "Smashes the enemy's armor, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage, and increasing damage you deal to them by 30% for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,this)
                    doDamage(caster,caster.castTarget,this)
                    applyDot(caster,caster.castTarget,caster.abilities["Deep Wounds"])
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="arms" && checkBuff(caster,caster,"Sweeping Strikes")) {
                    caster.abilities["Sweeping Strikes"].cleave(caster,caster.castTarget,this)
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
