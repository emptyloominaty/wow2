class WildGrowth extends Ability {
    constructor(resto = true) {
        let name = "Wild Growth"
        let cost = 4.4 //% mana
        let gcd = 1.5
        let castTime = 1.5
        let cd = 10
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.98*1.10
        this.healTargets = 6
        this.duration = 7

        if (!resto) {
            this.cost = 0
        }
    }

    getTooltip() {
        return "Heals up to 6 injured allies within 30 yards of the target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 7 sec. "
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
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
        this.setCd()

        let spellPower = this.spellPower
        if (caster.spec==="restorationDruid" && caster.abilities["Soul of the Forest"].talentSelect && checkBuff(caster,caster,"Soul of the Forest",true)) {
            spellPower *= 1.75
        }

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            applyHot(caster,caster,this,undefined,undefined,spellPower)
        } else {
            applyHot(caster,target,this,undefined,undefined,spellPower)
        }
        let targets = []
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead && getDistance(caster,friendlyTargets[i])<this.range) {
                targets.push(friendlyTargets[i])
            }
        }

        let maxTargets = this.healTargets
        if (checkBuff(caster,caster,"Incarnation: Tree of Life")) {
            maxTargets += 2
        }

        targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
        for (let i = 0; i<maxTargets-1; i++) {
            if (targets[i]!==undefined) {
                applyHot(caster,targets[i],this)
            }
        }
        caster.useEnergy(this.cost)
    }

}
