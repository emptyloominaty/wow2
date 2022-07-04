class Ironbark extends Ability {
    constructor() {
        let name = "Ironbark"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"damageReduction",val:0.2}]
        this.duration = 12
        this.noGcd = true
    }

    getTooltip() {
        return "The target's skin becomes as tough as Ironwood, reducing damage taken by 20% and increasing healing from your heal over time effects by 20% for 12 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "All damage taken is reduced by 20% and healing over time from "+caster.name+" increased by 20%."
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
