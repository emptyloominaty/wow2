let _enhancement_talents = function(caster) {
    //1
    //caster.abilities["Lashing Flames"] = new LashingFlames()
    //caster.abilities["Forceful Winds"] = new ForcefulWinds()
    caster.abilities["Elemental Blast"] = new ElementalBlast(true)

    //2
    //caster.abilities["Stormflurry"] = new Stormflurry()
    //caster.abilities["Hot Hand"] = new HotHand()
    //caster.abilities["Ice Strike"] = new IceStrike()

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
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
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