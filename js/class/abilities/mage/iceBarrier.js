class IceBarrier extends Ability {
    constructor() {
        let name = "Ice Barrier"
        let cost = 3
        let gcd = 1.5
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 60
        this.effect = [{name:"absorb",val:0},{name:"magicDamageReduction",val:0.15}]

    }

    getTooltip() {
        return "Shields you with ice, absorbing "+(player.maxHealth * 0.2) * (1+(player.stats.vers/100))+" damage for 1 min.<br>" +
            "<br>" +
            "Melee attacks against you reduce the attacker's movement speed by 50%." //TODO:
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val+" damage.<br>" +
            "Melee attackers slowed by 50%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.effect[0].val = (caster.maxHealth * 0.2) * (1+(caster.stats.vers/100))
            applyBuff(caster,caster,this,undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
