class FrenziedRegeneration extends Ability {
    constructor() {
        let name = "Frenzied Regeneration"
        let cost = 10
        let gcd = 1.5
        let castTime = 0
        let cd = 36
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"healingIncrease2",val:0.2}]
        this.duration = 3
        this.hasteCd = true
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Empower your rune weapon, gaining 15% Haste and generating 1 Rune and 5 Runic Power instantly and every 5 sec for 20 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Heals you for 24% health over 3 sec and increases healing received by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            this.spellPower = (caster.maxHealth / caster.stats.primary)*0.24
            applyHot(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }

}
