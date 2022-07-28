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

    //passive
    "Main Gauche" = new MainGauche()
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