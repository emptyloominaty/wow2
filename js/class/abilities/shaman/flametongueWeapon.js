class FlametongueWeapon extends Ability {
    constructor() {
        let name = "Flametongue Weapon"
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
        this.spellPower = 0.264
    }

    getTooltip() {
        return "Imbue your off-hand weapon with the element of Fire for 1 hour, causing each of your attacks to deal "+spellPowerToNumber(this.spellPower)+" additional Fire damage."
    }

    getBuffTooltip(caster, target, buff) {
        return "Each of your weapon attacks causes up to "+spellPowerToNumber(this.spellPower)+" additional Fire damage."
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
