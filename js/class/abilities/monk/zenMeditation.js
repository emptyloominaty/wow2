class ZenMeditation extends Ability {
    constructor() {
        let name = "Zen Meditation"
        let cost = 0
        let gcd = 0
        let castTime = 8
        let cd = 300
        let charges = 1
        let maxCharges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 8
        this.effect = [{name:"damageReduction",val:0.6}]


    }

    getTooltip() {
        return "Reduces all damage taken by 60% for 8 sec. Being hit by a melee attack, or taking another action other than movement will cancel this effect."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.canMoveWhileCasting = this.canMove
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:8}
            applyBuff(caster,caster,this)
            this.setGcd(caster)
            this.setCd()
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name===this.name && caster.buffs[i].caster === caster) {
                caster.buffs[i].duration = -1
            }
        }
    }

    cast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
