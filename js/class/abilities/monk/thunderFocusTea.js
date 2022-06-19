class ThunderFocusTea extends Ability {
    constructor() {
        let name = "Thunder Focus Tea"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 30
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = []
        this.duration = 30
        this.maxStacks = 2

        this.noGcd = true
    }

    getTooltip() {
        return "Receive a jolt of energy, empowering your next spell cast:" +
            "<br>Enveloping Mist: Immediately heals for (280% of Spell power)." +
            "<br>Renewing Mist: Duration increased by 10 sec." +
            "<br>Vivify: No mana cost." +
            "<br>Rising Sun Kick: Cooldown reduced by 0 sec"
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            let stacks = 1
            if (caster.abilities["Focused Thunder"].talentSelect) {
                stacks = 2
            }
            applyBuff(caster,caster,this,stacks,true)
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
