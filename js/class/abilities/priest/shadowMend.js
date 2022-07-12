class ShadowMend extends Ability {
    constructor() {
        let name = "Shadow Mend"
        let cost = 3.5
        let gcd = 1.5
        let castTime = 1.5
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 3.2
        this.duration = 20
    }

    getTooltip() { //TODO: until they have taken x total damage from all sources, or leave combat.
        return "Wraps an ally in shadows which heal for "+spellPowerToNumber(this.spellPower)+", but at a price.<br>" +
            "<br>" +
            "The ally will take "+spellPowerToNumber(this.spellPower/2)+" damage every 1 sec, until they have taken "+spellPowerToNumber(this.spellPower/2)+" total damage from all sources, or leave combat."
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
            doHeal(caster,caster,this)
            target = caster
        } else {
            //heal target
            doHeal(caster,target,this)
        }
        applyBuff(caster,target,caster.abilities["Atonement"])
        applyDot(caster,target,this,undefined,undefined,this.spellPower/2)
        caster.useEnergy(this.cost)
    }
}
