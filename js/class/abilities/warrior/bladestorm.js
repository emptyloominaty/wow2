class BladestormArms extends Ability {
    constructor() {
        let name = "Bladestorm "
        let cost = 0
        let gcd = 1.5
        let castTime = 4
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1*1.21
        this.duration = 6
    }

    getTooltip() {
        return "Become an unstoppable storm of destructive force, striking all nearby enemies for "+spellPowerToNumber(this.spellPower*5)+"Physical damage over 6 sec." +
            "You are immune to movement impairing and loss of control effects, but can use defensive abilities and avoid attacks." //TODO:IMMUNE TO snare,CC
    }

    getBuffTooltip(caster, target, buff) {
        return  "Dealing damage to all nearby enemies every 1 sec.<br>" +
            "Immune to crowd control."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0.8/(1 + (caster.stats.haste / 100)), timer2:0.8/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            caster.canMoveWhileCasting = true


            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        for (let i = 0; i<enemies.length; i++) {
            if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],undefined,true)) {
                doDamage(caster, enemies[i], this)
                applyDot(caster,enemies[i],caster.abilities["Deep Wounds"])
            }
        }
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }

}