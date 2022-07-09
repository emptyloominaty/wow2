class GreaterInvisibility extends Ability {
    constructor() {
        let name = "Greater Invisibility"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 20
        this.effect = [{name:"stealth"},{name:"damageReduction",val:0.6}] //TODO 3sec
        this.dontBreakStealth = true
    }

    getTooltip() {
        return  "Makes you invisible and untargetable for 20 sec, removing all threat. Any action taken cancels this effect.<br>" +
            "<br>" +
            "You take 60% reduced damage while invisible and for 3 sec after reappearing."
    }

    getBuffTooltip(caster, target, buff) {
        return "Invisible."
    }

    startCast(caster) {
            if (this.checkStart(caster) && !caster.inCombat) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                applyBuff(caster, caster, this,undefined,undefined,undefined,undefined,undefined,undefined,"stealth")

                caster.useEnergy(this.cost, this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            } else if (this.canSpellQueue(caster)) {
                spellQueue.add(this, caster.gcd)
            }
        return false
    }
}

