class Blur extends Ability {
    constructor() {
        let name = "Blur"
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

        this.spellPower = 0
        this.effect = [{name:"damageReduction",val:0.2},{name:"increaseStat",stat:"dodge",val:50}]

        this.duration = 10
        this.noGcd = true
    }

    getTooltip() {
        return "Increases your chance to dodge by 50% and reduces all damage taken by 20% for 10 sec."
    }

    run(caster) {
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
