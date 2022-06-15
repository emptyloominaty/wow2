class WildGrowth extends Ability {
    constructor() {
        let name = "Wild Growth"
        let cost = 4.4 //% mana
        let gcd = 1.5
        let castTime = 1.5
        let cd = 10
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.98
        this.healTargets = 6
        this.duration = 7
        this.effect = ""
        this.effectValue = 0
    }

    getTooltip() {
        return "Heals up to 6 injured allies within 30 yards of the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 7 sec. "
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
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
        this.cd = 0
        if (caster.target==="" || this.isEnemy(caster) || caster.castTarget.isDead || caster.castTarget==="" || Object.keys(caster.castTarget).length === 0) {
            applyHot(caster,caster,this)
        } else {
            applyHot(caster,caster.castTarget,this)
        }
        let targets = []
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead && getDistance(caster,friendlyTargets[i])<this.range) {
                targets.push(friendlyTargets[i])
            }
        }
        targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
        for (let i = 0; i<this.healTargets-1; i++) {
            if (targets[i]!==undefined) {
                applyHot(caster,targets[i],this)
            }
        }
        caster.useEnergy(this.cost)
    }

    runBuff(target,buff,id) {
    }

    endBuff(target) {
    }
}
