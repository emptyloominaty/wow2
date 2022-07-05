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
    "Heroism" = new Heroism(true)
    "Wind Shear" = new WindShear()
    "Hex" = new Hex()
    "Spiritwalker's Grace" = new SpiritwalkersGrace(true)
    "Capacitor Totem" = new CapacitorTotem(true)
    "Earthbind Totem" = new EarthbindTotem()
    "Ancestral Spirit" = new AncestralSpirit(true)
    "Earthquake" = new Earthquake()
    "Cleanse Spirit" = new CleanseSpirit()
    "Fire Elemental" = new FireElemental()
    "Purge" = new Purge()
    "Healing Stream Totem" = new HealingStreamTotem(true)

    //TODO
    //Thunderstorm
    //Earth Elemental
    //Tremor Totem          //FEAR
    //Reincarnation

    //passive
    "Exhaustion" = new Exhaustion()
    "Lava Surge" = new LavaSurge()
    "Elemental Fury" = new ElementalFury()
    "Elemental Overload" = new ElementalOverload()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}


class ElementalOverload extends Ability {
    constructor() {
        super("Elemental Overload", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Your Lightning Bolt, Elemental Blast, Icefury, Lava Burst and Chain Lightning casts have a "+player.stats.mastery.toFixed(1)+"% chance to trigger a second cast on the same target, dealing 85% of normal damage and generating less Maelstrom."
    }

    mastery_(caster,target,ability,name) {
        if (ability.name === "Lightning Bolt" || ability.name === "Elemental Blast" || ability.name === "Icefury" || ability.name === "Lava Burst" || ability.name === "Chain Lightning") {
            if (name!=="Elemental Overload" && getChance(player.stats.mastery)) {
                doDamage(caster,target,this,undefined,ability.spellPower*0.85)
                caster.useEnergy(ability.cost/2)
                if (caster.abilities["Unlimited Power"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Unlimited Power"],1,true,undefined,undefined,undefined,true)
                }
            }
        }
    }

}



class ElementalFury extends Ability {
    constructor() {
        super("Elemental Fury", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Your damaging and healing critical strikes deal 250% damage or healing instead of the usual 200%."
    }

    critChance() {
        return 2.5
    }

}