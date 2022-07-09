class TimeWarp extends Ability {
    constructor() {
        let name = "Time Warp"
        let cost = 4
        let gcd = 1.5
        let castTime = 0
        let cd = 300
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 999
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"increaseStat",stat:"haste",val:30}]
        this.duration = 40

    }

    getTooltip() {
        return "Warp the flow of time, increasing haste by 30% for all party and raid members for 40 sec. Allies will be unable to benefit from Bloodlust, Heroism, or Time Warp again for 10 min."
    }

    getBuffTooltip(caster, target, buff) {
        return "Haste increased by 30%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i])) {
                    if (!checkDebuff(caster,friendlyTargets[i],"Exhaustion")) {
                        applyBuff(caster,friendlyTargets[i],this)
                        applyDebuff(caster,friendlyTargets[i],caster.abilities["Exhaustion"])
                    }
                }
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
