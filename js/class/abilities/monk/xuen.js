class InvokeXuentheWhiteTiger extends Ability {
    constructor() {
        let name = "Invoke Xuen, the White Tiger"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseDamage",val:0.35}] //TODO:! SPAWN
        this.duration = 24

    }

    getTooltip() {
        return "Summons an effigy of Xuen, the White Tiger for 24 sec. Xuen attacks your primary target, and strikes 3 enemies within 10 yards every 1 sec with Tiger Lightning for (23% of Attack power) Nature damage. Every 4 sec, Xuen strikes your enemies with Empowered Tiger Lightning dealing 10% of the damage you have dealt to those targets in the last 4 sec."
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
