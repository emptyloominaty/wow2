class Spellsteal extends Ability {
    constructor(arcane=false) {
        let name = "Spellsteal"
        let cost = 21
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)

        if (arcane) {
            this.cost *= 0.33
        }
    }

    getTooltip() {
        return "Steals a beneficial magic effect from the target. This effect lasts a maximum of 2 min."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                if (this.isEnemy(caster,target) || !target.isDead || target!=="" || Object.keys(target).length !== 0) {
                    if (caster.isChanneling) {
                        caster.isChanneling = false
                    }
                    for (let i = 0; i<target.buffs.length; i++) {
                        if (target.buffs[i].ability.dispellable!==false && (target.buffs[i].ability.dispellable==="magic")) {
                            let duration = target.buffs[i].duration
                            if (duration>120) {
                                duration = 120
                            }
                            applyBuff(caster,caster,target.buffs[i].ability,undefined,undefined,undefined,duration)
                            target.buffs[i].duration = -1
                            break
                        }
                    }
                    caster.useEnergy(this.cost)
                    this.setCd()
                    this.setGcd(caster)
                    return true
                }
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
