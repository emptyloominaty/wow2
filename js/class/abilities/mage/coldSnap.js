class ColdSnap extends Ability {
    constructor() {
        let name = "Cold Snap"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 270
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

    }

    getTooltip() {
        return "Resets the cooldown of your Ice Barrier, Frost Nova, Cone of Cold, and Ice Block."
}

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.abilities["Ice Barrier"].cd = caster.abilities["Ice Barrier"].maxCd
            caster.abilities["Frost Nova"].cd = caster.abilities["Frost Nova"].maxCd
            caster.abilities["Cone of Cold"].cd = caster.abilities["Cone of Cold"].maxCd
            caster.abilities["Ice Block"].cd = caster.abilities["Ice Block"].maxCd
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
