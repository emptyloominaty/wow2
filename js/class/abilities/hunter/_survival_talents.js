let _survival_talents = function(caster) {
    //1
    caster.abilities["Viper's Venom"] = new VipersVenom()
    caster.abilities["Terms of Engagement"] = new TermsofEngagement()
    caster.abilities["Alpha Predator"] = new AlphaPredator()

    //2
    caster.abilities["Guerrilla Tactics"] = new GuerrillaTactics()
    caster.abilities["Hydra's Bite"] = new HydrasBite()
    caster.abilities["Butchery"] = new Butchery()

    //3
    caster.abilities["Trailblazer"] = new Trailblazer()
    caster.abilities["Natural Mending"] = new NaturalMending()
    caster.abilities["Camouflage"] = new Camouflage()

    //4
    caster.abilities["Bloodseeker"] = new Bloodseeker()
    caster.abilities["Steel Trap"] = new SteelTrap()
    caster.abilities["A Murder of Crows"] = new AMurderofCrows()

    //5
    caster.abilities["Born To Be Wild"] = new BornToBeWild()
    caster.abilities["Posthaste"] = new Posthaste()
    caster.abilities["Binding Shot"] = new BindingShot()

    //6
    caster.abilities["Tip of the Spear"] = new TipoftheSpear()
    caster.abilities["Mongoose Bite"] = new MongooseBite()
    caster.abilities["Flanking Strike"] = new FlankingStrike()

    //7
    caster.abilities["Birds of Prey"] = new BirdsofPrey()
    caster.abilities["Wildfire Infusion"] = new WildfireInfusion()
    caster.abilities["Chakrams"] = new Chakrams()

    caster.talents = [["Viper's Venom","Terms of Engagement","Alpha Predator"],
        ["Guerrilla Tactics","Hydra's Bite","Butchery"],
        ["Trailblazer","Natural Mending","Camouflage"],
        ["Bloodseeker","Steel Trap","A Murder of Crows"],
        ["Born To Be Wild","Posthaste","Binding Shot"],
        ["Tip of the Spear","Mongoose Bite","Flanking Strike"],
        ["Birds of Prey","Wildfire Infusion","Chakrams"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class VipersVenom  extends Ability {
    constructor() {
        super("Viper's Venom", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Raptor Strike has a chance to make your next Serpent Sting cost no Focus and deal an additional 250% initial damage."
    }
}
//------------------------------------------------
class TermsofEngagement extends Ability {
    constructor() {
        super("Terms of Engagement", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Harpoon deals (50% of Attack power) Physical damage and generates 20 Focus over 10 sec. Killing an enemy resets the cooldown of Harpoon.\n"
    }
}
//------------------------------------------------
class AlphaPredator extends Ability {
    constructor() {
        super("Alpha Predator", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Kill Command now has 2 charges, and deals 30% increased damage."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class GuerrillaTactics extends Ability {
    constructor() {
        super("Guerrilla Tactics", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Wildfire Bomb now has 2 charges, and the initial explosion deals 100% increased damage."
    }
}
//------------------------------------------------
class HydrasBite extends Ability {
    constructor() {
        super("Hydra's Bite", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Serpent Sting fires arrows at 2 additional enemies near your target, and its damage over time is increased by 20%."
    }
}
//------------------------------------------------
class Butchery extends Ability {
    constructor() {
        super("Butchery", 30, 1.5, 0, 9, false, false, false, "physical", 8, 3)
        this.talent = true
    }

    getTooltip() {//TODO:Replaces Carve
        return "//NOT IMPLEMENTED//Attack all nearby enemies in a flurry of strikes, inflicting (88% of Attack power) Physical damage to each. Deals reduced damage beyond 5 targets.\n" +
            "Reduces the remaining cooldown on Wildfire Bomb by 1 sec for each target hit, up to 5 sec"
    }
}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class Bloodseeker extends Ability {
    constructor() {
        super("Bloodseeker", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Kill Command causes the target to bleed for [Ranged attack power * (0.1) * (4)] damage over 8 sec.\n" +
            "\n" +
            "You and your pet gain 10% attack speed for every bleeding enemy within 12 yds."
    }
}
//------------------------------------------------
class SteelTrap extends Ability {
    constructor() {
        super("Steel Trap", 0, 1.5, 0, 30, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Hurls a Steel Trap to the target location that snaps shut on the first enemy that approaches, immobilizing them for 20 sec and causing them to bleed for (200% of Attack power) damage over 20 sec.\n" +
            "\n" +
            "Damage other than Steel Trap may break the immobilization effect. Trap will exist for 1 min. Limit 1."
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
class BindingShot extends Ability {
    constructor() {
        super("Binding Shot", 0, 1.5, 0, 45, false, false, false, "nature", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Fires a magical projectile, tethering the enemy and any other enemies within 5 yards for 10 sec, rooting them in place for 8 sec if they move more than 5 yards from the arrow."
    }
}
//------------------------------------------------------------------------------------------------ROW6
class TipoftheSpear extends Ability {
    constructor() {
        super("Tip of the Spear", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Kill Command increases the damage of your next Raptor Strike by 25%, stacking up to 3 times."
    }
}
//------------------------------------------------
class MongooseBite extends Ability {
    constructor() {
        super("Mongoose Bite", 30, 1.5, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() {//TODO: Replaces Raptor Strike
        return "//NOT IMPLEMENTED//A brutal attack that deals (131% of Attack power) Physical damage and grants you Mongoose Fury."
    }
    //Mongoose Fury
    // Increases the damage of Mongoose Bite by 15% for 14 sec, stacking up to 5 times. Successive attacks do not increase duration.
}
//------------------------------------------------
class FlankingStrike extends Ability {
    constructor() {
        super("Flanking Strike", 0, 1.5, 0, 30, false, false, false, "physical", 15, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//You and your pet leap to the target and strike it as one, dealing a total of [(Attack power * 1.49 * (1 + Versatility)) + ((149% of Attack power))] Physical damage.\n" +
            "\n" +
            "Generates 30 Focus for you and your pet."
    }
}
//------------------------------------------------------------------------------------------------ROW7
class BirdsofPrey extends Ability {
    constructor() {
        super("Birds of Prey", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Attacking your pet's target with Raptor Strike or Carve extends the duration of Coordinated Assault by  1.5 sec."
    }
}
//------------------------------------------------
class WildfireInfusion extends Ability {
    constructor() {
        super("Wildfire Infusion", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Lace your Wildfire Bomb with extra reagents, randomly giving it one of the following enhancements each time you throw it:\n" +
            "\n" +
            "Shrapnel Bomb: Shrapnel pierces the targets, causing\n" +
            "\n" +
            "Mongoose Bite\n" +
            "Mongoose Bite\n" +
            "\n" +
            "Raptor Strike and\n" +
            "\n" +
            "Butchery\n" +
            "Butchery\n" +
            "\n" +
            "Carve to apply a bleed for 9 sec that stacks up to 3 times.\n" +
            "\n" +
            "Pheromone Bomb: Kill Command has a 100% chance to reset against targets coated with Pheromones.\n" +
            "\n" +
            "Volatile Bomb: Reacts violently with poison, causing an extra explosion against enemies suffering from your Serpent Sting and refreshes your Serpent Stings."
    }
}
//------------------------------------------------
class Chakrams extends Ability {
    constructor() {
        super("Chakrams", 15, 1.5, 0, 20, false, false, false, "physical", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Throw a pair of chakrams at your target, slicing all enemies in the chakrams' path for [(40% of Attack power)] Physical damage. The chakrams will return to you, damaging enemies again.\n" +
            "\n" +
            "Your primary target takes 100% increased damage."
    }
}