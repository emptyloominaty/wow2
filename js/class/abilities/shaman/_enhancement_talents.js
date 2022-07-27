let _enhancement_talents = function(caster) {
    //1
    caster.abilities["Lashing Flames"] = new LashingFlames()
    caster.abilities["Forceful Winds"] = new ForcefulWinds()
    caster.abilities["Elemental Blast"] = new ElementalBlast(true)
    caster.abilities["Elemental Blast"].talentSelect = true

    //2
    caster.abilities["Stormflurry"] = new Stormflurry()
    caster.abilities["Hot Hand"] = new HotHand()
    caster.abilities["Ice Strike"] = new IceStrike()

    //3
    caster.abilities["Spirit Wolf"] = new SpiritWolf()
    caster.abilities["Earth Shield"] = new EarthShield()
    caster.abilities["Static Charge"] = new StaticCharge()

    //4
    //caster.abilities["Elemental Assault"] = new ElementalAssault()
    //caster.abilities["Hailstorm"] = new Hailstorm()
    //caster.abilities["Fire Nova"] = new FireNova()

    //5
    caster.abilities["Nature's Guardian"] = new NaturesGuardian()
    //caster.abilities["Feral Lunge"] = new FeralLunge()
    caster.abilities["Wind Rush Totem"] = new WindRushTotem()

    //6
    //caster.abilities["Crashing Storm"] = new CrashingStorm()
    //caster.abilities["Stormkeeper"] = new Stormkeeper()
    //caster.abilities["Sundering"] = new Sundering()

    //7
    //caster.abilities["Elemental Spirits"] = new ElementalSpirits()
    //caster.abilities["Earthen Spike"] = new EarthenSpike()
    //caster.abilities["Ascendance"] = new Ascendance()


    caster.talents = [["Lashing Flames","Forceful Winds","Elemental Blast"],
        ["Stormflurry","Hot Hand","Ice Strike"],
        ["Spirit Wolf","Earth Shield","Static Charge"],
        ["Elemental Assault","Hailstorm","Fire Nova"],
        ["Nature's Guardian","Feral Lunge","Wind Rush Totem"],
        ["Crashing Storm","Stormkeeper","Sundering"],
        ["Elemental Spirits","Earthen Spike","Ascendance"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class LashingFlames extends Ability {
    constructor() {
        super("Lashing Flames", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Lava Lash now increases the damage of Flame Shock on its target by 100% for 20 sec."
    }

}
//------------------------------------------------
class ForcefulWinds extends Ability {
    constructor() {
        super("Forceful Winds", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Windfury causes each successive Windfury attack within 15 sec to increase the damage of Windfury by 35%, stacking up to 5 times."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
class Stormflurry extends Ability {
    constructor() {
        super("Stormflurry", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Stormstrike has a 25% chance to strike the target an additional time for 40% of normal damage. This effect can chain off of itself."
    }

}
//------------------------------------------------
class HotHand extends Ability {
    constructor() {
        super("Hot Hand", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
    }

    getTooltip() {
        return "Melee auto-attacks with Flametongue Weapon active have a 5% chance to reduce the cooldown of Lava Lash by 75% and increase the damage of Lava Lash by 100% for 8 sec."
    }

}
//------------------------------------------------
class IceStrike extends Ability {
    constructor() {
        super("Ice Strike", 3.3, 1.5, 0, 15, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//Strike your target with an icy blade, dealing (115% of Attack power) Frost damage and snaring them by 50% for 6 sec.<br>" +
            "<br>" +
            "Successful Ice Strikes reset the cooldown of your Flame Shock and Frost Shock spells."
    }

}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------