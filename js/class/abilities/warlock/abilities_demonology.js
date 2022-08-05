class Demonology_Abilities {
    "Unending Resolve" = new UnendingResolve()
    "Soulstone" = new Soulstone()
    "Command Demon" = new CommandDemon()
    "Summon Imp" = new SummonImp()
    "Summon Felhunter" = new SummonFelhunter()
    "Shadowfury" = new Shadowfury()
    "Shadow Bolt" = new ShadowBolt(true)
    "Hand of Gul'dan" = new HandofGuldan()
    "Call Dreadstalkers" = new CallDreadstalkers()
    "Summon Demonic Tyrant" = new SummonDemonicTyrant()
    "Demonbolt" = new Demonbolt()
    "Implosion" = new Implosion()

    //passive
    "Master Demonologist" = new MasterDemonologist()
    "Demonic Core" = new DemonicCore()
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
//-----------------------------
class DemonicCore extends Ability {
    constructor() {
        super("Demonic Core", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.maxStacks = 4
        this.duration = 20
    }

    getTooltip() {
        return "When your Wild Imps expend all of their energy or are imploded, you have a 10% chance to absorb their life essence, granting you a stack of Demonic Core.<br>" +
            "When your summoned Dreadstalkers fade away, you have a 100% chance to absorb their life essence, granting you a stack of Demonic Core.<br>" +
            "Demonic Core reduces the cast time of Demonbolt by 100%. Maximum 4 stacks."
    }
}