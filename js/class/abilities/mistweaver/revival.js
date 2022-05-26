class Revival extends Ability {
    constructor() {
        let name = "Revival"
        let cost = 4.374 //% mana
        let gcd = 1.5
        let castTime = 1.5
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

    run(caster) {
    }

    startCast(caster) {
        if (caster.energy>this.cost && !caster.isCasting && caster.gcd<=0 && this.cd>=this.maxCd  && !caster.isChanneling) {

            for (let i = 0; i<friendlyTargets.length; i++) {
                doHeal(caster,friendlyTargets[i],this)
                caster.abilities["Gust of Mists"].heal(caster,friendlyTargets[i])
            }
            //TODO DISPEL
            this.cd = 0
            this.setGcd(caster)
            bars.playerCast.setMaxVal(this.gcd / (1 + (caster.stats.haste / 100)))
            caster.useEnergy(this.cost)
        } else if (caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endCast() {

    }
}
