class Ironfur extends Ability {
    constructor() {
        let name = "Ironfur"
        let cost = 40
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"increaseStat",stat:"armor",val:0.2}]
        this.needForm = "Bear Form"
        this.duration = 6
        this.noGcd = true
    }

    getTooltip() { //(100 * Agility / 100)
        return "Increases armor by 31% for 7 sec. Multiple uses of this ability may overlap" //TODO:overlap
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.effect[0].val = 31
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
