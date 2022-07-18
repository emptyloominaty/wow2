class AntiMagicShell extends Ability {
    constructor() {
        let name = "Anti-Magic Shell"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"magicabsorb",val:0},{name:"immuneToMagic"}]
        this.duration = 5
        this.noGcd = true
    }

    getTooltip() {
        return "Surrounds you in an Anti-Magic Shell for 5 sec, absorbing up to "+(player.maxHealth*0.3 * (1+(player.stats.vers/100))).toFixed(0)+" magic damage and preventing application of harmful magical effects. Damage absorbed generates Runic Power."
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val+" damage.<br>" +
            "Immune to harmful magic effects."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let mul = 1

            if (caster.abilities["Anti-Magic Barrier"].talentSelect) {
                mul = 1.4
            }

            this.effect[0].val = (caster.maxHealth * 0.3 * (1+(caster.stats.vers/100)))*mul

            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endBuff(caster,id) {
        let absorbVal = (caster.maxHealth * 0.3 * (1+(caster.stats.vers/100)))
        let val = (absorbVal-(caster.buffs[id].effect[0].val)) / absorbVal
        caster.useEnergy(val*(-30))
    }
}
