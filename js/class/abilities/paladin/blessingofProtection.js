class BlessingofProtection extends Ability {
    constructor() {
        let name = "Blessing of Protection"
        let cost = 3
        let gcd = 1.5
        let castTime = 0
        let cd = 300
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"physicalDamageReduction",val:1},{name:"immuneToMagic"}]
        this.duration = 10
    }

    getTooltip() {
        return "Blesses a party or raid member, granting immunity to Physical damage and harmful effects for 10 sec.<br>" +
            "<br>" +
            "Cannot be used if you have Forbearance. Causes Forbearance for 30 sec." //TODO
    }

    getBuffTooltip(caster, target, buff) {
        return "Immune to Physical damage and harmful effects."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            this.setCd()
            this.setGcd(caster)
            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || this.isEnemy(caster,target) || target.isDead) {
                applyBuff(caster,caster,this)
            } else {
                applyBuff(caster,target,this)
            }
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
