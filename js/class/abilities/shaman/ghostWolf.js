class GhostWolf extends Ability {
    constructor() {
        let name = "Ghost Wolf"
        let cost = 0 //% mana
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effects = [{name:"moveSpeed",val:0.3},{name:"minSpeed",val:1}]
    }

    getTooltip() {
        return "Turn into a Ghost Wolf, increasing movement speed by "+(this.effects[0].val*100)+"% and preventing movement speed from being reduced below 100%."
    }


    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            changeForm(caster,this)
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        }
        return false
    }

    runBuff(target,buff) {
    }

    endBuff(target) {
    }
}
