class PurifySpirit extends Ability {
    constructor() {
        let name = "Purify Spirit"
        let cost = 1.3
        let gcd = 1.5
        let castTime = 0
        let cd = 8
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.dispelTypes = ["magic","curse",false]
    }

    getTooltip() {
        return "Removes all Curse and Magic effects from a friendly target."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let target = caster.castTarget
            if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                dispel(caster,caster,this.dispelTypes[0],this.dispelTypes[1],this.dispelTypes[2])
            } else {
                dispel(caster,target,this.dispelTypes[0],this.dispelTypes[1],this.dispelTypes[2])
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
