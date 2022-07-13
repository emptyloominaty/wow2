class DivineSteed extends Ability {
    constructor() {
        let name = "Divine Steed"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"moveSpeed",val:1}]
        this.duration = 3
    }

    getTooltip() {
        return "Leap atop your Charger for 3 sec, increasing movement speed by 100%. Usable while indoors or in combat."
    }

    getBuffTooltip(caster, target, buff) {
        return "Movement speed increased by 100%."
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
