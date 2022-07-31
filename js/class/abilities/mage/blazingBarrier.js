class BlazingBarrier extends Ability {
    constructor() {
        let name = "Blazing Barrier"
        let cost = 3
        let gcd = 1.5
        let castTime = 0
        let cd = 25
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 60
        this.effect = [{name:"absorb",val:0}]
        this.spellPower = 0.125

    }

    getTooltip() {
        return "Shields you in flame, absorbing "+(player.maxHealth * 0.2) * (1+(player.stats.vers/100))+" damage<br>" +
            "<br>" +
            "and reducing Physical damage taken by 0%" //TODO:
    }
    //TODO: Melee attackers take (12.5% of spell power) Fire damage

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val+" damage.<br>" +
            "Melee attackers take "+spellPowerToNumber(this.spellPower)+" Fire damage."
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
