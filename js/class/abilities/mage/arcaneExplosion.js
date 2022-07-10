class ArcaneExplosion extends Ability {
    constructor() {
        let name = "Arcane Explosion"
        let cost = 10
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.50232*1.1

    }

    getTooltip() {
        return "Causes an explosion of magic around the caster, dealing "+spellPowerToNumber(this.spellPower)+" Arcane damage to all enemies within 10 yards.<br><br>" +
            "Generates 1 Arcane Charge if any targets are hit."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let a = 0
            let done = false
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    doDamage(caster, targets[i], this)
                    done = true
                    a++
                }
            }
            let secCost = 0
            if (done) {
                secCost = -1
            }
            if (caster.abilities["Reverberate"].talentSelect) {
                if (a>2) {
                    if (getChance(50)) {
                        secCost -= 1
                    }
                }
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.useEnergy(this.cost,secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
