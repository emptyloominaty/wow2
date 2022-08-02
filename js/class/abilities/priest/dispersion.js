class Dispersion extends Ability {
    constructor() {
        let name = "Dispersion"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.75},{name:"moveSpeed",val:0.5},{name:"interrupt"}]

        this.duration = 6

    }

    getTooltip() {
        return "Disperse into pure shadow energy, reducing all damage taken by 75% for 6 sec, but you are unable to attack or cast spells.<br>" +
            "Increases movement speed by 50% and makes you immune to all movement impairing effects<br>" +
            "<br>" +
            "Castable while stunned, feared, or silenced." //TODO:
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 75%.<br>" +
            "Cannot attack or cast spells.<br>" +
            "Movement speed increased by 50%.<br>" +
            "Immune to all movement impairing effects" //TODO:
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
