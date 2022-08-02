class MindSear extends Ability {
    constructor() {
        let name = "Mind Sear"
        let cost = -1
        let gcd = 1
        let castTime = 4.5
        let cd = 0
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.126
        this.duration = 4.5
    }

    getTooltip() {
        return "Corrosive shadow energy radiates from the target, dealing "+spellPowerToNumber(this.spellPower*6)+" Shadow damage over 4.5 sec to all enemies within 10 yards of the target.<br><br>" +
            "Generates 6 Insanity over the duration per target hit."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget) && this.isEnemy(caster,caster.castTarget)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0.8/(1 + (caster.stats.haste / 100)), timer2:0.8/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && this.checkDistance(target, enemies[i],10,true) ) {
                        doDamage(caster, enemies[i], this)
                        caster.useEnergy(this.cost)
                    }
                }
            } else {
                caster.isChanneling = false
            }
        }
    }
}
