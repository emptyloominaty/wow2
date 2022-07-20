class ThunderClap extends Ability {
    constructor() {
        let name = "Thunder Clap"
        let cost = -5
        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.462*1.17
        this.hasteCd = true
        this.duration = 10
        this.effect = [{name:"moveSpeed",val:0.2}]

    }

    getTooltip() {
        return "Blasts all enemies within 8 yards for "+spellPowerToNumber(this.spellPower)+" Physical damage and reducing their movement speed by 20% for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let unstoppableForce = false
            let spellPower = this.spellPower
            if (caster.abilities["Unstoppable Force"].talentSelect && checkBuff(caster,caster,"Avatar")) {
                spellPower *= 1.3
            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    doDamage(caster, enemies[i], this,undefined,spellPower)
                    applyDebuff(caster, enemies[i], this)
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()

            if (unstoppableForce) {
                this.cd = this.maxCd/2
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
