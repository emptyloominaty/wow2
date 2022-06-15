class CircleofHealing extends Ability {
    constructor() {
        let name = "Circle of Healing"
        let cost = 3.3 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 15
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.05*1.16
        this.cleaveRange = 30
        this.targetsHeal = 4

    }

    getTooltip() {
        return "Heals the target and 4 injured allies within 30 yards of the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+""
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster
        if (this.isEnemy(caster,caster.castTarget) || caster.castTarget.isDead || Object.keys(caster.castTarget).length === 0 || !this.checkDistance(caster, caster.castTarget)) {
            //heal self
            doHeal(caster,caster,this)
            caster.abilities["Echo of Light"].startCast(caster,caster,this)
        } else {
            //heal target
            target = caster.castTarget
            doHeal(caster,caster.castTarget,this)
            caster.abilities["Echo of Light"].startCast(caster,caster.castTarget,this)
        }
        //cleave 4 targets
        //healing
        let tth = 0
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth && this.checkDistance(target, friendlyTargets[i])) {
                doHeal(caster, friendlyTargets[i], this)
                caster.abilities["Echo of Light"].startCast(caster,friendlyTargets[i],this)
                tth++
            }
            if (tth>this.targetsHeal) {
                break
            }
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
