class EntanglingRoots extends Ability {
    constructor(resto=true) {
        let name = "Entangling Roots"
        let cost = 1.2
        let gcd = 1.5
        let castTime = 1.7
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 35
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"root"}]
        this.duration = 30
        //TODO: Apply Aura: Periodic Damage
        // Interval: 2 seconds (SP mod: 1.5)

        if (!resto) {
            this.cost = 0
        }

        this.canCastForm = "all"
    }

    getTooltip() {
        return "Roots the target in place for 30 sec. Damage may cancel the effect."
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
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                let castTime = this.castTime
                if (checkBuff(caster,caster,"Incarnation: Tree of Life")) {
                    castTime = 0
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
            applyDebuff(caster,caster.castTarget,this)
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
        }
    }

}
