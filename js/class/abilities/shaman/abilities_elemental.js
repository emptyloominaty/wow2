class Elemental_Abilities {
    "Healing Surge" = new HealingSurge()
    "Flame Shock" = new FlameShock(true)
    "Lightning Bolt" = new LightningBolt(true)
    "Lava Burst" = new LavaBurst(true)
    "Chain Heal" = new ChainHeal()
    "Chain Lightning" = new ChainLightning(true)
    "Frost Shock" = new FrostShock(true)
    "Earth Shock" = new EarthShock()
    "Ghost Wolf" = new GhostWolf()
    "Astral Shift" = new AstralShift()
    "Heroism" = new Heroism()
    "Wind Shear" = new WindShear()
    "Hex" = new Hex()
    "Spiritwalker's Grace" = new SpiritwalkersGrace()
    "Capacitor Totem" = new CapacitorTotem()
    "Earthbind Totem" = new EarthbindTotem()
    "Ancestral Spirit" = new AncestralSpirit()
    "Earthquake" = new Earthquake()

    //passive
    "Exhaustion" = new Exhaustion()
    "Lava Surge" = new LavaSurge()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}