class ShatteringThrow extends Ability {
    constructor() {
        let name = "Shattering Throw"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1
        this.ignoreArmor = true
        //TODO: Removing any magical immunities. Deals up to 500% increased damage to absorb shields.
    }

    getTooltip() {
        return "Hurl your weapon at the enemy, causing "+
            ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+
            "Physical damage, ignoring armor, and removing any magical immunities. Deals up to 500% increased damage to absorb shields."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    done = true
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
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

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {

                doDamage(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
