class Outlaw_Abilities {
    "Slice And Dice" = new SliceAndDice()
    "Kidney Shot" = new KidneyShot()
    "Sprint" = new Sprint()
    "Crimson Vial" = new CrimsonVial()
    "Feint" = new Feint()
    "Kick" = new Kick()
    "Evasion" = new Evasion()
    "Stealth" = new Stealth()
    "Vanish" = new Vanish()
    "Cheap Shot" = new CheapShot()
    "Sap" = new Sap()
    "Ambush" = new Ambush()
    "Cloak of Shadows" = new CloakofShadows()
    "Shiv" = new Shiv()
    "Instant Poison" = new InstantPoison()
    "Sinister Strike" = new SinisterStrike()
    "Pistol Shot" = new PistolShot()
    "Dispatch" = new Dispatch()
    "Between the Eyes" = new BetweentheEyes()
    "Adrenaline Rush" = new AdrenalineRush()
    "Roll the Bones" = new RolltheBones()

    //passive
    "Main Gauche" = new MainGauche()
    "Combat Potency" = new CombatPotency()

    "Grand Melee" = new GrandMelee()
    "Broadside" = new Broadside()
    "Ruthless Precision" = new RuthlessPrecision()
    "Buried Treasure" = new BuriedTreasure()
    "Skull and Crossbones" = new SkullandCrossbones()
    "True Bearing" = new TrueBearing()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//-----------------------
class MainGauche extends Ability {
    constructor() {
        super("Main Gauche", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Your main-hand attacks have a 30% chance to trigger an attack with your off-hand that deals "+spellPowerToNumber(player.stats.mastery/100)+" Physical damage."
    }
}
//-----------------------
class CombatPotency extends Ability {
    constructor() {
        super("Combat Potency", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Increases your Energy regeneration rate by 35%. Your off-hand attacks have a 75% chance to generate 10 Energy."
    }
}