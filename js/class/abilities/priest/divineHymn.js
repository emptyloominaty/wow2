class DivineHymn extends Ability {
    constructor() {
        let name = "Divine Hymn"
        let cost = 4.4
        let gcd = 1.5
        let castTime = 8
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.375 // every sec
        this.hotSpellPower = 0.168


        this.maxStacks = 8
        this.duration = 15

        //TODO:STACKING BUFF HEALING INC
    }

    getTooltip() {
        return "Heals all party or raid members within 40 yards for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" plus an additional "+((player.stats.primary * this.hotSpellPower) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100))).toFixed(0)+" over 8 sec. Each heal increases all targets' healing taken by 4% for 15 sec, stacking."
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting  && this.checkCd(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.canMoveWhileCasting = this.canMove
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:(1/(1 + (caster.stats.haste / 100)))}
            this.setGcd(caster)
            this.cd = 0
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }

    cast(caster) {
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && this.checkDistance(caster, friendlyTargets[i])) {
                doHeal(caster, friendlyTargets[i], this)
                caster.abilities["Echo of Light"].startCast(caster,friendlyTargets[i],this)
            }
        }
    }

    runBuff() {
    }

    endBuff() {
    }
}
