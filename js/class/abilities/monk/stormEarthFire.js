class StormEarthandFire extends Ability {
    constructor() {
        let name = "Storm, Earth, and Fire"
        let cost = 0 //% mana
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 2
        let maxCharges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseDamage",val:0.35}] //TODO:! SPAWN
        this.duration = 15
        this.noGcd = true

    }

    getTooltip() {
        return "Split into 3 elemental spirits for 15 sec, each spirit dealing 45% of normal damage and healing.<br>" +
            "You directly control the Storm spirit, while Earth and Fire spirits mimic your attacks on nearby enemies.<br>" +
            "While active, casting Storm, Earth, and Fire again will cause the spirits to fixate on your target."
    }

    getBuffTooltip(caster, target, buff) {
        return "Elemental spirits summoned, mirroring all of the Monk's attacks.<br>" +
            "The Monk and spirits each do 45% of normal damage and healing."
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
