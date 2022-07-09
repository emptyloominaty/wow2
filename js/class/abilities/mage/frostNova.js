class FrostNova extends Ability {
    constructor() {
        let name = "Frost Nova"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 12
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 10
        this.effect = [{name:"root"}]
        this.spellPower = 0.044775

    }

    getTooltip() {
        return "Blasts enemies within 12 yds of you for "+spellPowerToNumber(this.spellPower)+" Frost damage and freezes them in place for 10 sec. Damage may interrupt the freeze effect."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    doDamage(caster, targets[i], this)
                    applyDebuff(caster, targets[i], this)
                    done = true
                }
            }
            let secCost = 0
            if (done) {
                secCost = -1
            }
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            caster.useEnergy(this.cost,secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
