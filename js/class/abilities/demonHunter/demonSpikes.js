class DemonSpikes extends Ability {
    constructor() {
        let name = "Demon Spikes"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 20
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effect = [{name:"increaseStat",stat:"armor",val:0.2},{name:"increaseStat",stat:"dodge",val:15}] // parry = dodge

        this.duration = 6
        this.noGcd = true
    }

    getTooltip() { //(75 * Agility / 100)
        return "Surge with fel power, increasing your Armor by "+(25*(1+(player.stats.mastery/100))).toFixed(0)+"%  and your Parry chance by 15%, for 6 sec"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            this.effect[0].val = (25*(1+(caster.stats.mastery/100)))
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
