class BeastMastery_Abilities {
    "Kill Shot" = new KillShot()
    "Tranquilizing Shot" = new TranquilizingShot()
    "Counter Shot" = new CounterShot()
    "Survival of the Fittest" = new SurvivaloftheFittestHunter()
    "Aspect of the Turtle" = new AspectoftheTurtle()
    "Concussive Shot" = new ConcussiveShot()
    "Exhilaration" = new Exhilaration()
    "Aspect of the Cheetah" = new AspectoftheCheetah()
    "Arcane Shot" = new ArcaneShot()
    "Kill Command" = new KillCommand(true)
    "Multi-Shot" = new MultiShot(true)
    "Barbed Shot" = new BarbedShot()
    "Cobra Shot" = new CobraShot()

    //TODO:Intimidation, 60s cd, 1.5 gcd, Commands your pet to intimidate the target, stunning it for 5 sec.
    //TODO:Aspect of the Wild, 120s cd, 0 gcd, Grants you and your pet 5 Focus per sec and 10% increased critical strike chance for 20 sec.  bufftooltip:Gaining 5 Focus per sec.<br> Critical Strike chance increased by 10%.

    //TODO:Bestial Wrath, 90s cd, 1.5 gcd, Sends you and your pet into a rage, instantly dealing [Attack power * 0.65 * 1 * (1 + Versatility) * 1.11] Physical damage to its target, and increasing all damage you both deal by 25% for 15 sec. Removes all crowd control effects from your pet. Bestial Wrath's remaining cooldown is reduced by 12 sec each time you use Barbed Shot
    // bufftooltip: Damage dealt increased by 25%.

    //passive
    "Master of Beasts" = new MasterofBeasts()
    "Kindred Spirits" = new KindredSpirits()
    //TODO:Pack Tactics, Passive Focus generation increased by 100%.
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//--------------------------
class MasterofBeasts extends Ability {
    constructor() {
        super("Master of Beasts", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage done by your pets by "+(player.stats.mastery).toFixed(1)+"%."
    }
}
//--------------------------
class KindredSpirits extends Ability {
    constructor() {
        super("Kindred Spirits", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
    }

    getTooltip() { //TODO: pets focus
        return "Increases your maximum Focus and your pet's maximum Focus by 20."
    }
}
//--------------------------
class WildCall extends Ability {
    constructor() {
        super("Wild Call", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
    }

    getTooltip() {
        return "Your auto shot critical strikes have a 20% chance to reset the cooldown of Barbed Shot."
    }
}
//--------------------------
class BeastCleave extends Ability {
    constructor() {
        super("Beast Cleave", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//After you Multi-Shot, your pet's melee attacks also strike all nearby enemies for 100% as much for the next 4 sec. Deals reduced damage beyond 8 targets."
    }
}