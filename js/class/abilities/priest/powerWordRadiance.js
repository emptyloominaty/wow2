class PowerWordRadiance extends Ability {
    constructor() {
        let name = "Power Word: Radiance"
        let cost = 6.5
        let gcd = 1.5
        let castTime = 2
        let cd = 20
        let charges = 2
        let channeling = false
        let casting = true
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.05
        this.cleaveRange = 30
        this.targetsHeal = 4
    }

    getTooltip() {
        return "A burst of light heals the target and 4 injured allies within 30 yards for "+spellPowerToNumber(this.spellPower)+", and applies Atonement for 60% of its normal duration."
    }


    startCast(caster) {
        if (this.checkStart(caster)) {
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
        if (this.isEnemy(caster,target) || target.isDead || Object.keys(target).length === 0 || !this.checkDistance(caster, target)) {
            //heal self
            doHeal(caster,caster,this)
            applyBuff(caster,caster,caster.abilities["Atonement"],undefined,undefined,undefined,9)
            target = caster
        } else {
            //heal target
            doHeal(caster,target,this)
            applyBuff(caster,target,caster.abilities["Atonement"],undefined,undefined,undefined,9)
        }
        let tth = 0
        let targets = sortFriendlyTargetsByHealth(true)
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(target, targets[i]) && !checkBuff(caster,targets[i],"Atonement")) { //TODO: buff fix
                doHeal(caster, targets[i], this)
                applyBuff(caster,targets[i],caster.abilities["Atonement"],undefined,undefined,undefined,9)
                tth++
            }
            if (tth>=this.targetsHeal) {
                break
            }
        }

        this.setCd()
        caster.useEnergy(this.cost)
    }
}
