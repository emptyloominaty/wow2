class WindfuryWeapon extends Ability {
    constructor() {
        let name = "Windfury Weapon"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 3600
        this.spellPower = 0.24
    }

    getTooltip() {
        return "Imbue your main-hand weapon with the element of Wind for 1 hour. Each main-hand attack has a 25% chance to trigger two extra attacks, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage each."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
