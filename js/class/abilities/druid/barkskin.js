class Barkskin extends Ability {
    constructor() {
        let name = "Barkskin"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"damageReduction",val:0.2}]
        this.duration = 8
        this.noGcd = true
    }

    getTooltip() {
        return "Your skin becomes as tough as bark, reducing all damage you take by 20% and preventing damage from delaying your spellcasts. Lasts 8 sec.<br>" +
            "<br>" +
            "Usable while stunned, frozen, incapacitated, feared, or asleep, and in all shapeshift forms." //TODO
    }

    getBuffTooltip(caster, target, buff) {
        return "All damage taken reduced by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
