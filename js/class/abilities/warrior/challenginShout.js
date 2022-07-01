class ChallengingShout extends Ability {
    constructor() {
        let name = "Challenging Shout"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 240
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 6


    }

    getTooltip() {
        return "Taunts all enemies within 10 yds to attack you for 6 sec."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {


            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],undefined,true)) {
                    taunt(caster,caster.castTarget)
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
