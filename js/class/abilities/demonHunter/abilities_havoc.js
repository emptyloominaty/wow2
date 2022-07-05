class Havoc_Abilities {
    "Chaos Strike" = new ChaosStrike()
    "Demon's Bite" = new DemonsBite()
    "Fel Rush" = new FelRush()
    "Blade Dance" = new BladeDance()
    "Consume Magic" = new ConsumeMagic()
    "Disrupt" = new Disrupt()
    "Imprison" = new Imprison()
    "Blur" = new Blur()
    "Immolation Aura" = new ImmolationAura()


    "Death Sweep" = new DeathSweep()
    "Annihilation" = new Annihilation()

    //passive
    "Chaos Brand" = new ChaosBrand()
    "Demonic Presence" = new DemonicPresence()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//-----
class DemonicPresence extends Ability {
    constructor() {
        super("Demonic Presence", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases your Chaos damage by "+player.stats.mastery.toFixed(1)+"% and your movement speed by "+(player.stats.mastery/2.8).toFixed(1)+"%"
    }

}