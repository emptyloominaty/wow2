class SerpentStingSurvival extends Ability {
    constructor() {
        let name = "Serpent Sting"
        let cost = 20
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.2234
        this.spellPowerDot = 1.0452
        this.duration = 12

    }

    getTooltip() {
        return  "Fire a poison-tipped arrow at an enemy, dealing "+spellPowerToNumber(this.spellPower)+" Nature damage instantly and an additional "+spellPowerHotToNumber(this.spellPowerDot)+" damage over 12 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    applyDot(caster,caster.castTarget,this,undefined,undefined,this.spellPowerDot)
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
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
