class RestoSham_abilities {
    "Healing Surge" = new HealingSurge()
    "Healing Wave" = new HealingWave()
    "Flame Shock" = new FlameShock(false,true)
    "Lightning Bolt" = new LightningBolt(false,true)
    "Lava Burst" = new LavaBurst(false,true)
    "Healing Rain" = new HealingRain()
    "Healing Tide Totem" = new HealingTideTotem()
    "Ghost Wolf" = new GhostWolf()
    "Riptide" = new Riptide()
    "Chain Heal" = new ChainHeal()
    "Chain Lightning" = new ChainLightning(false,true)
    "Frost Shock" = new FrostShock(false,true)
    "Astral Shift" = new AstralShift()
    "Heroism" = new Heroism()
    "Wind Shear" = new WindShear()
    "Mana Tide Totem" = new ManaTideTotem()
    "Healing Stream Totem" = new HealingStreamTotem()
    "Spirit Link Totem" = new SpiritLinkTotem()
    "Earth Shield" = new EarthShield()
    "Water Shield" = new WaterShield()
    "Hex" = new Hex()
    "Purify Spirit" = new PurifySpirit()
    "Spiritwalker's Grace" = new SpiritwalkersGrace()
    "Capacitor Totem" = new CapacitorTotem()
    "Earthbind Totem" = new EarthbindTotem()
    "Ancestral Spirit" = new AncestralSpirit()
    "Ancestral Vision" = new AncestralVision()
    "Purge" = new Purge()

    //TODO:
    //Earth Elemental
    //Tremor Totem          //FEAR
    //Reincarnation

    //passive
    "Exhaustion" = new Exhaustion()
    "Lava Surge" = new LavaSurge()
    "Resurgence" = new Resurgence()
    "Tidal Waves" = new TidalWaves()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//TODO: MASTERY this.mastery = true


class LavaSurge extends Ability {
    constructor() {
        super("Lava Surge", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() {
        return "Your Flame Shock damage over time has a 15% chance to reset the remaining cooldown on Lava Burst and cause your next Lava Burst to be instant."
    }

}
//----------------------------------------
class Resurgence extends Ability {
    constructor() {
        super("Resurgence", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
    }
    getTooltip() {
        return "Your direct heal criticals refund a percentage of your maximum mana: 1.00% from Healing Wave, 0.60% from Healing Surge, Unleash Life or Riptide, and 0.25% from Chain Heal."
    }

    refundMana(caster,ability) {
        if (ability.name==="Healing Wave") {
            this.cost = -1
        } else if (ability.name==="Healing Surge") {
            this.cost = -0.6
        } else if (ability.name==="Riptide") {
            this.cost = -0.6
        } else if (ability.name==="Unleash Life") {
            this.cost = -0.6
        }  else if (ability.name==="Chain Heal") {
            this.cost = -0.25
        }


        caster.useEnergy(this.cost)
    }
}


class TidalWaves extends Ability {
    constructor() {
        super("Tidal Waves", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.duration = 15
        this.maxStacks = 2
    }

    getTooltip() {
        return "Casting Chain Heal or Riptide reduces the cast time of your next Healing Wave by 10% or increases the critical effect chance of your next Healing Surge by 30%. Stacks up to 2 times."
    }

    applyBuff(caster) {
        applyBuff(caster,caster,this,1,true)
    }

}