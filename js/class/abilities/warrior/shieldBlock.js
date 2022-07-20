class ShieldBlock extends Ability {
    constructor() {
        let name = "Shield Block"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 16
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"increaseStat",stat:"block",val:100}] //idk

        this.duration = 6
        this.hasteCd = true
    }

    getTooltip() {//These blocks can be critical blocks
        return "Raise your shield, blocking all melee attacks against you for 6 sec.<br><br>" +
            "Increases Shield Slam damage by 30% while active"
    }

    getBuffTooltip(caster, target, buff) {
        return "Blocking all melee attacks."
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
