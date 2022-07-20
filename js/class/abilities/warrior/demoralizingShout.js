class DemoralizingShout extends Ability {
    constructor() {
        let name = "Demoralizing Shout"
        let cost = -5
        let gcd = 1.5
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.462*1.17
        this.duration = 8
        this.effect = [{name:"reduceDamage",val:0.15}]

    }

    getTooltip() {
        return "Demoralizes all enemies within 10 yards, reducing the damage they deal to you by 15% for 8 sec."
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
