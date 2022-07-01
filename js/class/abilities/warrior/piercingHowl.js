class PiercingHowl extends Ability {
    constructor() {
        let name = "Piercing Howl"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 12
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 8
        this.effect = [{name:"moveSpeed",val:0.7}]
    }

    getTooltip() {
        return "Snares all enemies within 12 yards, reducing their movement speed by 70% for 8 sec."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {


            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],undefined,true)) {
                    applyDebuff(caster,enemies[i],this)
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
