class VampiricEmbrace extends Ability {
    constructor() {
        let name = "Vampiric Embrace"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 15
        this.healing = 0
        this.timer = 0
        this.timer2 = 1

    }

    getTooltip() {
        return "Fills you with the embrace of Shadow energy for 15 sec, causing you to heal a nearby ally for 50% of any single-target Shadow spell damage you deal."
    }

    getBuffTooltip(caster, target, buff) {
        return "50% of any single-target Shadow spell damage you deal heals a nearby ally."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.caster = caster
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    runBuff(caster,buff,id) {
        if (this.timer<this.timer2) {
            this.timer += progressInSec
        } else {
            this.timer = 0
            if (this.healing>0) {
                this.heal()
            }
        }
    }
    collectHeal(val) {
        this.healing += val
    }

    endBuff(target) {
        this.heal(this.caster,this.val)
    }

    heal() {
        let val = this.healing
        let caster = this.caster
        let targets = []
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (this.checkDistance(caster,friendlyTargets[i],undefined,true) && !friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                targets.push(friendlyTargets[i])
            }
        }
        targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
        doHeal(caster,targets[0],this,undefined,undefined,undefined,undefined,undefined,val*0.5)
        this.healing = 0
    }

}
