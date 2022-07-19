class Arms_Abilities {
    "Execute" = new Execute()
    "Whirlwind" = new Whirlwind(true)
    "Charge" = new Charge()
    "Pummel" = new Pummel()
    "Taunt" = new Taunt()
    "Rallying Cry" = new RallyingCry()
    "Heroic Throw" = new HeroicThrow()
    "Hamstring" = new Hamstring()
    "Challenging Shout" = new ChallengingShout()
    "Ignore Pain" = new IgnorePain()
    "Battle Shout" = new BattleShout()
    "Shattering Throw" = new ShatteringThrow()
    "Spell Reflection" = new SpellReflection()
    "Intervene" = new Intervene()
    "Piercing Howl" = new PiercingHowl()
    "Victory Rush" = new VictoryRush()
    "Heroic Leap" = new HeroicLeap()
    "Mortal Strike" = new MortalStrike()
    "Slam" = new Slam()
    "Overpower" = new Overpower()
    "Cleave" = new Cleave()

    //TODO   caster.abilities["Bladestorm"] = new Bladestorm()

    //passive
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}