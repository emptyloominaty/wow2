class Affliction_Abilities {
    "Unending Resolve" = new UnendingResolve()
    "Soulstone" = new Soulstone()
    "Command Demon" = new CommandDemon()
    "Summon Imp" = new SummonImp()
    "Summon Felhunter" = new SummonFelhunter()
    "Shadowfury" = new Shadowfury()
    "Shadow Bolt" = new ShadowBolt()
    "Corruption" = new Corruption()
    "Agony" = new Agony()
    "Unstable Affliction" = new UnstableAffliction()
    "Malefic Rapture" = new MaleficRapture()

    //passive
    "Potent Afflictions" = new PotentAfflictions()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//-----------------------------
class PotentAfflictions extends Ability {
    constructor() {
        super("Potent Afflictions", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases damage done by Malefic Rapture, Agony, Corruption, Unstable Affliction, and Seed of Corruption by "+player.stats.mastery.toFixed(1)+"%.<br>"
    }
}