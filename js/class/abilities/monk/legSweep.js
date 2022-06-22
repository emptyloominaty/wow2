class LegSweep extends Ability {
    constructor(ww = false,bm = false) {
        let name = "Leg Sweep"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let maxCharges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 6
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"stun"}]
        this.duration = 3

        if (ww) {
            this.gcd = 1
            this.hasteGcd = false
        }
        if (bm) {
            this.gcd = 1
            this.hasteGcd = false
        }

    }

    getTooltip() {
        return "Knocks down all enemies within 6 yards, stunning them for 3 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.cd = 0
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                    applyDebuff(caster, enemies[i], this,"stun")
                }
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }

    endCast(caster) {
    }
}
