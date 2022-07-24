class IncapacitatingRoar extends Ability {
    constructor() {
        let name = "Incapacitating Roar"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"incapacitate"}]
        this.duration = 3
        this.needForm = "Bear Form"
        this.canCastForm = "Cat Form"

    }

    getTooltip() {
        return "Shift into Bear Form and invoke the spirit of Ursol to let loose a deafening roar, incapacitating all enemies within 10 yards for 3 sec. Damage will cancel the effect."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    applyDebuff(caster, enemies[i], this)
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
