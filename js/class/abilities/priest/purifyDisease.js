class PurifyDisease extends Ability {
    constructor() {
        let name = "Purify Disease"
        let cost = -6
        let gcd = 1.5
        let castTime = 0
        let cd = 8
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        this.dispelTypes = ["disease", false, false]

    }

    getTooltip() {
        return "Removes all Disease effects from a friendly target."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let cd
            let target = caster.castTarget
            if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                cd = dispel(caster,caster,this.dispelTypes[0],this.dispelTypes[1],this.dispelTypes[2])
            } else {
                cd = dispel(caster,target,this.dispelTypes[0],this.dispelTypes[1],this.dispelTypes[2])
            }


            caster.useEnergy(this.cost)
            if (cd) {
                this.setCd()
            }
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
