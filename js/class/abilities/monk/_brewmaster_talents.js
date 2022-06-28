let _brewmaster_talents = function(caster) {
    //1
    caster.abilities["Eye of the Tiger"] = new EyeoftheTiger()
    caster.abilities["Chi Wave"] = new ChiWave(caster.spec)
    caster.abilities["Chi Burst"] = new ChiBurst(caster.spec)

    //2
    caster.abilities["Chi Torpedo"] = new ChiTorpedo()
    caster.abilities["Celerity"] = new Celerity()
    caster.abilities["Tiger's Lust"] = new TigersLust()

    //3
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //4
    caster.abilities["Tiger Tail Sweep"] = new TigerTailSweep()
    //caster.abilities[""] = new ()
    caster.abilities["Ring of Peace"] = new RingofPeace()


    //5
    //caster.abilities[""] = new ()
    caster.abilities["Healing Elixir"] = new HealingElixir()
    caster.abilities["Dampen Harm"] = new DampenHarm()

    //6
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //7
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()


    caster.talents = [["Eye of the Tiger","Chi Wave","Chi Burst"],
        ["Celerity","Chi Torpedo","Tiger's Lust"],
        ["Light Brewing","Spitfire","Black Ox Brew"],
        ["Tiger Tail Sweep","Summon Black Ox Statue","Ring of Peace"],
        ["Bob and Weave","Healing Elixir","Dampen Harm"],
        ["Special Delivery","Rushing Jade Wind","Exploding Keg"],
        ["High Tolerance","Celestial Flames","Blackout Combo"]
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