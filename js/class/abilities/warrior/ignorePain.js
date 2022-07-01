class IgnorePain extends Ability {
    constructor() {
        let name = "Ignore Pain"
        let cost = 35
        let gcd = 0
        let castTime = 0
        let cd = 1
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"absorb",val:0}] //TODO: 55% of damage taken
        this.duration = 12

    }

    getTooltip() {
        return  "Fight through the pain, ignoring 55% of damage taken, up to "+((player.stats.primary*3.5)) * (1 + (player.stats.vers / 100))+" total damage prevented."
    }

    getBuffTooltip(caster, target, buff) {
        return "Ignoring 55% of damage taken, preventing 0 total damage."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.effect[0].val = ((player.stats.primary*3.5)) * (1 + (player.stats.vers / 100))
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
