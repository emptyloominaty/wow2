let _protectionWarrior_talents = function(caster) {
    //1
    caster.abilities["War Machine"] = new WarMachine()
    //caster.abilities["Punish"] = new Punish()
    //caster.abilities["Devastator"] = new Devastator()

    //2
    caster.abilities["Double Time"] = new DoubleTime()
    //caster.abilities["Rumbling Earth"] = new RumblingEarth()
    caster.abilities["Storm Bolt"] = new StormBolt()

    //3
    //caster.abilities["Best Served Cold"] = new BestServedCold()
    //caster.abilities["Booming Voice"] = new BoomingVoice()
    //caster.abilities["Dragon Roar"] = new DragonRoar()

    //4
    //caster.abilities["Crackling Thunder"] = new CracklingThunder()
    caster.abilities["Bounding Stride"] = new BoundingStride()
    //caster.abilities["Menace"] = new Menace()

    //5
    //caster.abilities["Never Surrender"] = new NeverSurrender()
    //caster.abilities["Indomitable"] = new Indomitable()
    caster.abilities["Impending Victory"] = new ImpendingVictory()

    //6
    //caster.abilities["Into the Fray"] = new IntotheFray()
    //caster.abilities["Unstoppable Force"] = new UnstoppableForce()
    caster.abilities["Ravager"] = new Ravager()

    //7
    caster.abilities["Anger Management"] = new AngerManagement()
    //caster.abilities["Heavy Repercussions"] = new HeavyRepercussions()
    //caster.abilities["Bolster"] = new Bolster()

    caster.talents = [["War Machine","Punish","Devastator"],
        ["Double Time","Rumbling Earth","Storm Bolt"],
        ["Best Served Cold","Booming Voice","Dragon Roar"],
        ["Crackling Thunder","Bounding Stride","Menace"],
        ["Never Surrender","Indomitable","Impending Victory"],
        ["Into the Fray","Unstoppable Force","Ravager"],
        ["Anger Management","Heavy Repercussions","Bolster"]
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
