class Combustion extends Ability {
    constructor() {
        let name = "Combustion"
        let cost = 10
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"increaseStat",stat:"crit",val:100},{name:"increaseStat",stat:"mastery",val:15}]
        this.duration = 10

    }

    getTooltip() {
        return "Engulfs you in flames for 10 sec, increasing your spells' critical strike chance by 100% and granting you Mastery equal to 50% your Critical Strike stat. Castable while casting other spells."
    }

    getBuffTooltip(caster, target, buff) {
        return "Critical Strike chance of your spells increased by 100%.<br>" +
            "Mastery increased by "+buff.effect[1].val+"%"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.effect[1].val = caster.stats.crit
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
