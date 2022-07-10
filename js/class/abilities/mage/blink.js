class Blink extends Ability {
    constructor() {
        let name = "Blink"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 20
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.distance = 20
    }

    getTooltip() {
        return "Teleports you forward 20 yds or until reaching an obstacle, and frees you from all stuns and bonds." //TODO:frees you from all stuns and bonds.
    }


    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.move(this.distance*pxToMeter,undefined,undefined,true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
