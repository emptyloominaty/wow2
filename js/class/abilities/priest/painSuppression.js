class PainSuppression extends Ability {
    constructor() {
        let name = "Pain Suppression"
        let cost = 1.6
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"damageReduction",val:0.4}]
        this.duration = 8
        this.noGcd = true
    }

    getTooltip() { //TODO:Castable while stunned.
        return "Reduces all damage taken by a friendly target by 40% for 8 sec. Castable while stunned."
    }

    getBuffTooltip(caster, target, buff) {
        return "All damage taken is reduced by 40%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let target = caster.castTarget
            if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                applyBuff(caster,caster,this)
            } else {
                applyBuff(caster,target,this)
            }

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
