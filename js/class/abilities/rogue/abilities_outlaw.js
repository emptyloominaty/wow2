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
    "Grappling Hook" = new GrapplingHook()
    "Blade Flurry" = new BladeFlurry()


    //TODO:Gouge | Gouges the eyes of an enemy target, incapacitating for 4 sec. Damage will interrupt the effect. | 15 sec cd | 25 cost |

    //passive
    "Main Gauche" = new MainGauche()
    "Combat Potency" = new CombatPotency()
    "Ruthlessness" = new Ruthlessness()
    "Restless Blades" = new RestlessBlades()

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
//-----------------------
class Ruthlessness extends Ability {
    constructor() {
        super("Ruthlessness", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() { //Dispatch, BetweenTheEyes, SliceAndDice
        return "Your finishing moves have a 20% chance per combo point spent to grant a combo point."
    }
}
//-----------------------
class RestlessBlades extends Ability {
    constructor() {
        super("Restless Blades", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Finishing moves reduce the remaining cooldown of Adrenaline Rush, Between the Eyes, Blade Flurry, Grappling Hook, Roll the Bones, Sprint and Vanish by 1 sec per combo point spent."
    }

    reduceCd2(caster,val) {
        caster.abilities["Adrenaline Rush"].incCd(caster,val,true)
        caster.abilities["Between the Eyes"].incCd(caster,val,true)
        caster.abilities["Grappling Hook"].incCd(caster,val,true)
        caster.abilities["Roll the Bones"].incCd(caster,val,true)
        caster.abilities["Sprint"].incCd(caster,val,true)

        //TODO:caster.abilities["Blade Flurry"].incCd(caster,val,true)
        //TODO:caster.abilities["Ghostly Strike"].incCd(caster,val,true)
        //TODO:caster.abilities["Marked for Death"].incCd(caster,val,true)
        //TODO:caster.abilities["Blade Rush"].incCd(caster,val,true)
        //TODO:caster.abilities["Killing Spree"].incCd(caster,val,true)

        caster.abilities["Vanish"].incCd(caster,val,true)
    }

}