class IceBlock extends Ability {
    constructor() {
        let name = "Ice Block"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 240
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 10
        this.effect = [{name:"cantDie"},{name:"stun"}]
    }

    getTooltip() {
        return "Encases you in a block of ice, protecting you from all attacks and damage for 10 sec, but during that time you cannot attack, move, or cast spells.  <br>" +
            "<br>" +
            "Causes Hypothermia, preventing you from recasting Ice Block for 30 sec." //TODO:
    }

    getBuffTooltip(caster, target, buff) {
        return "Immune to all attacks and damage.<br>" +
            "Cannot attack, move, or use spells"
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
