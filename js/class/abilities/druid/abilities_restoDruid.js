class restoDruid_abilities {
    "Regrowth" = new Regrowth(true)
    "Rejuvenation" = new Rejuvenation()
    "Wild Growth" = new WildGrowth()
    "Wrath" = new Wrath()
    "Moonfire" = new Moonfire()
    "Sunfire" = new Sunfire()
    "Efflorescence" = new Efflorescence()

    //passive
    "Harmony" = new Harmony()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

class Harmony extends Ability {
    constructor() {
        let name = "Harmony"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Your healing is increased by "+player.stats.mastery.toFixed(1)+"% for each of your Restoration heal over time effects on the target."
    }

}