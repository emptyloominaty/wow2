class IcyVeins extends Ability {
    constructor() {
        let name = "Icy Veins"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"haste",val:30}]
        this.duration = 23

    }

    getTooltip() {
        return "Accelerates your spellcasting for 23 sec, granting 30% haste and preventing damage from delaying your spellcasts." //TODO:preventing damage from delaying your spellcasts
    }

    getBuffTooltip(caster, target, buff) {
        return "Haste increased by 30% and immune to pushback."

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            if (caster.abilities["Rune of Power"] && caster.abilities["Rune of Power"].talentSelect) {
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
