let _beastMastery_talents = function(caster) {
    //1
    caster.abilities["Killer Instinct"] = new KillerInstinct()
    caster.abilities["Animal Companion"] = new AnimalCompanion()
    caster.abilities["Dire Beast"] = new DireBeast()

    //2
    caster.abilities["Scent of Blood"] = new ScentofBlood()
    caster.abilities["One with the Pack"] = new OnewiththePack()
    caster.abilities["Chimaera Shot"] = new ChimaeraShot()

    //3
    caster.abilities["Trailblazer"] = new Trailblazer()
    caster.abilities["Natural Mending"] = new NaturalMending()
    caster.abilities["Camouflage"] = new Camouflage()

    //4
    caster.abilities["Spitting Cobra"] = new SpittingCobra()
    caster.abilities["Thrill of the Hunt"] = new ThrilloftheHunt()
    caster.abilities["A Murder of Crows"] = new AMurderofCrows()

    //5
    caster.abilities["Born To Be Wild"] = new BornToBeWild()
    caster.abilities["Posthaste"] = new Posthaste()
    caster.abilities["Binding Shot"] = new BindingShot()

    //6
    caster.abilities["Stomp"] = new Stomp()
    caster.abilities["Barrage"] = new Barrage()
    caster.abilities["Stampede"] = new Stampede()

    //7
    caster.abilities["Aspect of the Beast"] = new AspectoftheBeast()
    caster.abilities["Killer Cobra"] = new KillerCobra()
    caster.abilities["Bloodshed"] = new Bloodshed()

    caster.talents = [["Killer Instinct","Animal Companion","Dire Beast"],
        ["Scent of Blood","One with the Pack","Chimaera Shot"],
        ["Trailblazer","Natural Mending","Camouflage"],
        ["Spitting Cobra","Thrill of the Hunt","A Murder of Crows"],
        ["Born To Be Wild","Posthaste","Binding Shot"],
        ["Stomp","Barrage","Stampede"],
        ["Aspect of the Beast","Killer Cobra","Bloodshed"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class KillerInstinct extends Ability {
    constructor() {
        super("Killer Instinct", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Kill Command deals 50% increased damage against enemies below 35% health."
    }
}
//------------------------------------------------
class AnimalCompanion extends Ability {
    constructor() {
        super("Animal Companion", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Your Call Pet additionally summons the first pet from your stable. This pet will obey your Kill Command, but cannot use pet family abilities."
    }
}
//------------------------------------------------
class DireBeast extends Ability {
    constructor() {
        super("Dire Beast", 0, 1.5, 0, 20, false, false, false, "nature", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Summons a powerful wild beast that attacks the target and roars, increasing your Haste by 5% for 8 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
class OnewiththePack extends Ability {
    constructor() {
        super("One with the Pack", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Wild Call has a 20% increased chance to reset the cooldown of Barbed Shot."
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class SpittingCobra extends Ability {
    constructor() {
        super("Spitting Cobra", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//When Bestial Wrath ends, summon a Spitting Cobra to aid you in combat for 15 sec. Each Cobra Shot used during Bestial Wrath increases the damage this Spitting Cobra deals by 10%."
    }
}
//------------------------------------------------
class ThrilloftheHunt extends Ability {
    constructor() {
        super("Thrill of the Hunt", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Barbed Shot increases your critical strike chance by 3% for 8 sec, stacking up to 3 times."
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class Stomp extends Ability {
    constructor() {
        super("Stomp", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//When you cast Barbed Shot, your pet stomps the ground, dealing [((50% of Attack power)) * (1 + Versatility)] Physical damage to all nearby enemies."
    }
}
//------------------------------------------------
//------------------------------------------------
class Stampede extends Ability {
    constructor() {
        super("Stampede", 0, 1.5, 0, 120, false, false, false, "physical", 30, 1)
        this.talent = true
        //range 5
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Summon a herd of stampeding animals from the wilds around you that deal damage to your enemies for 12 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW7
class AspectoftheBeast extends Ability {
    constructor() {
        super("Aspect of the Beast", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Increases the damage and healing of your pet's abilities by 30%.\n" +
            "\n" +
            "Increases the effectiveness of your pet's Predator's Thirst, Endurance Training, and Pathfinding passives by 50%."
    }
}
//------------------------------------------------
class KillerCobra extends Ability {
    constructor() {
        super("Killer Cobra", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//While Bestial Wrath is active, Cobra Shot resets the cooldown on Kill Command."
    }
}
//------------------------------------------------
class Bloodshed extends Ability {
    constructor() {
        super("Bloodshed", 0, 1.5, 0, 60, false, false, false, "physical", 50, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Command your pet to tear into your target, causing your target to bleed for [Attack power * 0.25 * 6 * 1 * (1 + Versatility) * 1.11] over 18 sec and increase all damage taken from your pet by 15% for 18 sec."
    }
}