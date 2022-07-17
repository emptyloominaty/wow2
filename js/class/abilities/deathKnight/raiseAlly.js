class RaiseAlly extends Ability {
    constructor() {
        let name = "Raise Ally"
        let cost = 30
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
    }

    getTooltip() {
        return "Pours dark energy into a dead target, reuniting spirit and body to allow the target to reenter battle with 60% health and at least 20% mana."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.targetObj) && crCount>1 && caster.targetObj.isDead  && !caster.targetObj.enemy) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let target = caster.targetObj
            if (target.isDead && this.checkDistance(caster,target) && !target.enemy) {
                resurrect(caster,target,1)
                crCount --
            }

            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
