class BattleShout extends Ability {
    constructor() {
        let name = "Battle Shout"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 100
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"battleShout"}]
        this.duration = 3600

    }

    getTooltip() {
        return "Increases the attack power of all raid and party members within 100 yards by 5% for 1 hour.\n"
    }

    getBuffTooltip(caster, target, buff) {
        return "Attack power increased by 5%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i]) && !friendlyTargets[i].isDead) {
                    applyBuff(caster,friendlyTargets[i],this)
                }
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
