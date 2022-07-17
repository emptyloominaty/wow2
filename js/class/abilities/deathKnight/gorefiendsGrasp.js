class GorefiendsGrasp extends Ability {
    constructor() {
        let name = "Gorefiend's Grasp"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 15
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 2
        this.effect = [{name:"moveToTarget",val:7,target:0}]
    }

    getTooltip() {
        return "Shadowy tendrils coil around all enemies within 15 yards of a hostile or friendly target, pulling them to the target's location."
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
        for (let i = 0; i<enemies.length; i++) {
            if (!target.isDead && this.checkDistance(caster,enemies[i],15,true)) {
                applyBuff(caster,enemies[i],this)
            }
        }

        caster.useEnergy(this.cost)
    }
}
