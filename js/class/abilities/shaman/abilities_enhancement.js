class Enhancement_Abilities {
    "Healing Surge" = new HealingSurge()
    "Flame Shock" = new FlameShock()
    "Lightning Bolt" = new LightningBolt()
    "Chain Heal" = new ChainHeal()
    "Chain Lightning" = new ChainLightning()
    "Frost Shock" = new FrostShock(false,false,true)
    "Ghost Wolf" = new GhostWolf()
    "Astral Shift" = new AstralShift()
    "Heroism" = new Heroism()
    "Wind Shear" = new WindShear()
    "Hex" = new Hex()
    "Capacitor Totem" = new CapacitorTotem()
    "Earthbind Totem" = new EarthbindTotem()
    "Ancestral Spirit" = new AncestralSpirit()
    "Cleanse Spirit" = new CleanseSpirit()
    "Purge" = new Purge()
    "Stormstrike" = new Stormstrike()
    "Lava Lash" = new LavaLash()
    "Crash Lightning" = new CrashLightning()
    "Spirit Walk" = new SpiritWalk()
    "Flametongue Weapon" = new FlametongueWeapon()
    "Windfury Weapon" = new WindfuryWeapon()
    "Windfury Totem" = new WindfuryTotem()

    //passive
    "Exhaustion" = new Exhaustion()
    "Stormbringer" = new Stormbringer()
    "Enhanced Elements" = new EnhancedElements()
    "Maelstrom Weapon" = new MaelstromWeapon()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//----------------------------------------
class EnhancedElements extends Ability {
    constructor() {
        super("Enhanced Elements", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.mastery = true
        this.duration = 12
    }

    getTooltip() {
        return "Increases your chance to trigger Stormbringer and Windfury by "+(player.stats.mastery*0.04).toFixed(2)+"%, and increases all Fire, Frost, and Nature damage you deal by "+player.stats.mastery.toFixed(1)+"%."
    }

}
//----------------------------------------
class Stormbringer extends Ability {
    constructor() {
        super("Stormbringer", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.duration = 12
    }

    getTooltip() {
        return  "Your special attacks have a 5% chance to reset the remaining cooldown on Stormstrike and increase the damage of your next Stormstrike by 25%"
    }

}
//----------------------------------------
class MaelstromWeapon extends Ability {
    constructor() {
        super("Maelstrom Weapon", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.duration = 30
        this.maxStacks = 10
    }

    getTooltip() { //TODO:reduces the cast time: Chain Lightning, Elemental Blast, Lightning Bolt, Stormkeeper, Healing Surge
        return  "When you deal damage with a melee weapon, you have a chance to gain Maelstrom Weapon, stacking up to 10 times." +
            " Each stack of Maelstrom Weapon reduces the cast time of your next damage or healing spell by 20% and increase the damage or healing of your next spell by 20%." +
            " A maximum of 5 stacks of Maelstrom Weapon can be consumed at a time."
    }

}
