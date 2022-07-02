class Purify extends Ability {
    constructor() {
        let name = "Purify"
        let cost = 1.3 //% mana
        let gcd = 1.5
        let castTime = 0
        let cd = 8
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        this.dispelTypes = ["magic", "disease", false]

    }

    getTooltip() {
        return "Dispels harmful effects on the target, removing all Magic and Disease effects."
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
