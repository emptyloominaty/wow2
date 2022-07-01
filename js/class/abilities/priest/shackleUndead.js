class ShackleUndead extends Ability {
    constructor() {
        let name = "Shackle Undead"
        let cost = 1.2
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"incapacitate"}]
        this.duration = 50
    }

    getTooltip() { //TODO:LIMIT 1, UNDEAD ONLY
        return "Shackles the target undead enemy for 50 sec, preventing all actions and movement. Damage will cancel the effect. Limit 1."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                applyDebuff(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()

            }
        }
    }

}
