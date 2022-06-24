class ChainHeal extends Ability {
    constructor() {
        let name = "Chain Heal"
        let cost = 6
        let gcd = 1.5
        let castTime = 2.5
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.1
        this.jumptargets = 3
        this.jumpRange = 15
    }

    getTooltip() {
        return "Heals the friendly target for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+", then jumps to heal the 2 most injured nearby allies. Healing is reduced by 30% with each jump."
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

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            //heal self
            doHeal(caster,caster,this,0)
            target = caster
        } else {
            //heal target
            doHeal(caster,target,this,0)
        }

        let spellPower = this.spellPower * (1+caster.abilities["Unleash Life"].checkBuff(caster))
        spellPower = spellPower * (1+caster.abilities["Deluge"].checkBuff(caster,target))

        //jump
        let ttt = 0
        let lastTarget = target
        let targets = sortFriendlyTargetsByHealth(true)
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(lastTarget, targets[i],this.jumpRange)) {
                lastTarget = targets[i]
                spellPower = spellPower * 0.7 //-30%
                doHeal(caster, targets[i], this,undefined,spellPower)
                caster.abilities["Ancestral Vigor"].applyBuff(caster,targets[i])
                ttt++
                if (ttt>=this.jumptargets) {
                    break
                }
            }
        }
        caster.abilities["Ancestral Vigor"].applyBuff(caster,target)
        caster.abilities["Tidal Waves"].applyBuff(caster)
        this.setCd()
        caster.useEnergy(this.cost)
    }
}
