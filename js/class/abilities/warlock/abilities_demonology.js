class Demonology_Abilities {
    "Unending Resolve" = new UnendingResolve()
    "Soulstone" = new Soulstone()
    "Command Demon" = new CommandDemon()
    "Summon Imp" = new SummonImp()
    "Summon Felhunter" = new SummonFelhunter()
    "Shadowfury" = new Shadowfury()
    "Shadow Bolt" = new ShadowBolt(true)

    //passive
    "Master Demonologist" = new MasterDemonologist()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//-----------------------------
class MasterDemonologist extends Ability {
    constructor() {
        super("Master Demonologist", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage done by your demons by "+player.stats.mastery.toFixed(1)+"%.<br>"
    }
}