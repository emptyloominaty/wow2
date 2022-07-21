class PillarofFrost extends Ability {
    constructor() {
        let name = "Pillar of Frost"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"primary",val:20,percent:true}]
        this.duration = 12
        this.noGcd = true
    }

    getTooltip() {
        return "The power of frost increases your Strength by 20% for 12 sec.<br>" +
            "<br>" +
            "Each Rune spent while active increases your Strength by an additional 1%." //TODO:
    }

    getBuffTooltip(caster, target, buff) {
        return "Strength increased by "+buff.effect[0].val+"%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost,this.secCost)
            return true
        }
        return false
    }
}
