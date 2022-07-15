class BlessingofSacrifice extends Ability {
    constructor() {
        let name = "Blessing of Sacrifice"
        let cost = 1.4
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"damageReduction",val:0.3}]
        this.duration = 12
    }

    getTooltip() {
        return "Blesses a party or raid member, reducing their damage taken by 30%, but you suffer 75% of damage prevented.<br>" + //TODO: redirect
            "<br>" +
            "Last 12 sec, or until transferred damage would cause you to fall below 20% health." //TODO:
    }

    getBuffTooltip(caster, target, buff) {
        return "30% of damage taken is redirected to "+caster.name+"."
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
