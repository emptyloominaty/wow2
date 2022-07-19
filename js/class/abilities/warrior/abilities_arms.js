class Arms_Abilities {
    "Execute" = new Execute(false)
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
    "Colossus Smash" = new ColossusSmash()
    "Sweeping Strikes" = new SweepingStrikes()
    "Bladestorm " = new BladestormArms()
    "Die by the Sword" = new DiebytheSword()

    //passive
    "Deep Wounds" = new DeepWounds()
    "Tactician" = new Tactician()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//--------------------------
class DeepWounds extends Ability {
    constructor() {
        super("Deep Wounds", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
        this.spellPower = 0.72
        this.duration = 12
    }

    getTooltip() { //TODO: Warbreaker, Ravager
        return "Mortal Strike, Warbreaker, Colossus Smash, Cleave, Ravager and Bladestorm" +
            " inflict Deep Wounds, dealing "+spellPowerToNumber(this.spellPower)+" Bleed damage over 12 sec and increasing the damage the enemy takes from you by "+player.stats.mastery+"%.. "
    }

}
//--------------------------
class Tactician extends Ability {
    constructor() {
        super("Tactician", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "You have a 1.40% chance per Rage spent on damaging abilities to reset the remaining cooldown on Overpower."

    }
}