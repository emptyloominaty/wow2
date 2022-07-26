class CloakofShadows extends Ability {
    constructor() {
        let name = "Cloak of Shadows"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.dispelTypes = ["magic",false,false]
        this.duration = 5
        this.effect = [{name:"magicDamageReduction",val:100},{name:"immuneToMagic"}]
        this.dontBreakStealth = true
    }

    getTooltip() {
        return  "Provides a moment of magic immunity, instantly removing all harmful spell effects. The cloak lingers, causing you to resist harmful spells for 5 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Resisting all harmful spells."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            applyBuff(caster,caster,this)
            dispel(caster,caster,this.dispelTypes[0],this.dispelTypes[1],this.dispelTypes[2])
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            this.setCd()
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(caster) {
        dispel(caster,caster,this.dispelTypes[0],this.dispelTypes[1],this.dispelTypes[2])
    }
}
