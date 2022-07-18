class DeathGrip extends Ability {
    constructor(blood = false) {
        let name = "Death Grip"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 2
        this.effect = [{name:"moveToTarget",val:7,target:0}]

        if (blood) {
            this.cd = 15
            this.maxCd = 15
        }
    }

    getTooltip() {
        if (player.spec==="blood") {
            return "Harnesses the energy that surrounds and binds all matter, drawing the target toward you and forcing the enemy to attack you."
        } else {
            return "Harnesses the energy that surrounds and binds all matter, drawing the target toward you."
        }

    }

    getBuffTooltip(caster, target, buff) {
        return "Being pulled toward the Death Knight."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        this.effect[0].target = caster.id
        this.setCd()
        if (this.isEnemy(caster,target) && !target.isDead && target!=="" && Object.keys(target).length !== 0) {
            applyBuff(caster,target,this)
            if (caster.spec==="blood") {
                taunt(caster,target)
            }
        }
        caster.useEnergy(this.cost)
    }
}
