class SeedofCorruption extends Ability {
    constructor() {
        let name = "Seed of Corruption"
        let cost = 0
        let gcd = 1.5
        let castTime = 2.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.5*1.14
        this.secCost = 1

    }

    getTooltip() { //TODO: explode after 12 sec
        return "Embeds a demon seed in the enemy target that will explode after 12 sec, dealing "+spellPowerToNumber(this.spellPower)+" Shadow damage to all enemies within 10 yards and applying Corruption to them." +
            "The seed will detonate early if the target is hit by other detonations, or takes "+spellPowerToNumber(this.spellPower)+" damage from your spells." //TODO:
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
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

        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {

                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && this.checkDistance(target, enemies[i],8,true) ) {
                        doDamage(caster, enemies[i], this)
                        applyDot(caster, enemies[i], caster.abilities["Corruption"])
                    }
                }

                applyDot(caster,target,this,undefined,undefined,this.spellPowerDot)

                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }
}
