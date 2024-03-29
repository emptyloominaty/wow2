class ArcanePower extends Ability {
    constructor() {
        let name = "Arcane Power"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseDamage",val:0.3},{name:"reduceEnergyCost",val:0.3}]
        this.duration = 15

    }

    getTooltip() {
        return "For 15 sec, you deal 30% more spell damage and your spells cost 30% less mana"
    }

    getBuffTooltip(caster, target, buff) {
        return "Spell damage increased by 30%.<br><br>" +
            "Mana costs of your damaging spells reduced by 30%"

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            if (caster.abilities["Rune of Power"].talentSelect) {
                let area = caster.abilities["Rune of Power"].area
                caster.abilities["Rune of Power"].setCd(caster)
                addArea(areas.length,caster,caster.abilities["Rune of Power"],area.type,area.duration,area.data,caster.x,caster.y,true,area.radius)
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
