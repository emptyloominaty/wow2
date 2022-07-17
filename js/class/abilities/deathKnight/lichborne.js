class Lichborne extends Ability {
    constructor() {
        let name = "Lichborne"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"leech",val:10}]
        this.duration = 10
        this.noGcd = true
    }

    getTooltip() { //TODO:imunity to stun
        return "Draw upon unholy energy to become Undead for 10 sec, increasing Leech by 10%, and making you immune to Charm, Fear, and Sleep."
    }

    getBuffTooltip(caster, target, buff) {
        return "Leech increased by 10% and immune to Charm, Fear and Sleep. Undead." //TODO:Undead? TODO:immune to charm fear and sleep
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
