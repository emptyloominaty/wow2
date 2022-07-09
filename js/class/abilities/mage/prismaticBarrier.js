class PrismaticBarrier extends Ability {
    constructor() {
        let name = "Prismatic Barrier"
        let cost = 3
        let gcd = 1.5
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 60
        this.effect = [{name:"absorb",val:0},{name:"magicDamageReduction",val:0.15}]

    }

    getTooltip() {
        return "Shields you with an arcane force, absorbing [20 / 100 * Total health * (1 + Versatility)] damage and reducing magic damage taken by 15% for 1 min.<br>" +
            "<br>" +
            "The duration of harmful Magic effects against you is reduced by 25%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val+" damage.<br>" +
            "Magic damage taken reduced by 15%.<br>" +
            "Duration of all harmful Magic effects reduced by 25%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.effect[0].val = (caster.maxHealth * 0.2) * (1+(caster.stats.vers/100))
            applyBuff(caster,caster,this,undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
