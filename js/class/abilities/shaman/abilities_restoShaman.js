class RestoSham_abilities {
    "Healing Surge" = new HealingSurge()
    "Flame Shock" = new FlameShock()
    "Lightning Bolt" = new LightningBolt()
    "Lava Burst" = new LavaBurst()
    "Healing Rain" = new HealingRain()
    "Healing Tide Totem" = new HealingTideTotem()
    "Ghost Wolf" = new GhostWolf()
    "Riptide" = new Riptide()

    //passive
    "Lava Surge" = new LavaSurge()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}


class LavaSurge extends Ability {
    constructor() {
        super("Lava Surge", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.duration = 15
    }
}