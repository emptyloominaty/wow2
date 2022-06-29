class Evasion extends Ability {
    constructor() {
        let name = "Evasion"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 10
        this.effect = [{name:"increaseStat",stat:"dodge",val:100}]
    }

    getTooltip() {
        return "Increases your dodge chance by 100% for 10 sec."
        //TODO: Outlaw (Level 58)
        // Dodging an attack while Evasion is active will trigger Mastery: Main Gauche
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
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
