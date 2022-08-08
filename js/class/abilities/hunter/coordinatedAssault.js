class CoordinatedAssault extends Ability {
    constructor() {
        let name = "Coordinated Assault"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.effect = [{name:"increaseStat",stat:"primary",val:20,percent:true}]
        this.duration = 20
        this.noGcd = true
    }

    getTooltip() {
        return "You and your pet attack as one, increasing all damage you both deal by 20% for 20 sec.<br>" +
            "While Coordinated Assault is active, Kill Command's chance to reset is increased by 25%"
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage dealt increased by 20%.<br>" +
            "Kill Command's chance to reset increased by 25%"
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
