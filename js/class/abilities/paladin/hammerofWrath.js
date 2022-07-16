class HammerofWrath extends Ability {
    constructor() {
        let name = "Hammer of Wrath"
        let cost = 1.5
        let gcd = 1.5
        let castTime = 0
        let cd = 7.5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true
        this.spellPower = 1.2
        this.secCost = -1
        this.lessthanhealth = 0.2

    }

    getTooltip() {
        return "Hurls a divine hammer that strikes an enemy for (120% of Attack power) Holy damage. Only usable on enemies that have less than 20% health or during Avenging Wrath<br>" +
            "<br>" +
            "Generates 1 Holy Power."
    }

    startCast(caster) {
        if (this.checkStart(caster) && (caster.castTarget.health/caster.castTarget.maxHealth<this.lessthanhealth || checkBuff(caster,caster,"Avenging Wrath"))) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            }
            if (done && Object.keys(caster.castTarget).length !== 0) {
                if (this.isEnemy(caster,caster.castTarget)) {
                    if (this.checkDistance(caster,caster.castTarget) && !caster.castTarget.isDead) {
                        doDamage(caster, caster.castTarget, this)
                        caster.useEnergy(this.cost,this.secCost)
                        this.setCd()
                    }
                }
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
