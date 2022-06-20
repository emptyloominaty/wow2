class Revival extends Ability {
    constructor() {
        let name = "Revival"
        let cost = 4.374 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 2.83
        this.effect = ""
        this.effectValue = 0
    }

    getTooltip() {
        return "Heals all party and raid members within 40 yards for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" and clears them of all harmful Magical, Poison, and Disease effects. Causes a Gust of Mists on all targets."
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i])) {
                    doHeal(caster,friendlyTargets[i],this)
                    caster.abilities["Gust of Mists"].heal(caster,friendlyTargets[i])
                }
            }
            //TODO DISPEL
            this.cd = 0
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast() {

    }
}
