class Feint extends Ability {
    constructor() {
        let name = "Feint"
        let cost = 35
        let gcd = 1
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 6
        this.effect = [{name:"increaseStat",stat:"avoidance",val:40}]
    }

    getTooltip() {
        return "Performs an evasive maneuver, reducing damage taken from area-of-effect attacks by 40% for 6 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            applyBuff(caster,caster,this)

            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
