class Marksmanship_Abilities {
    "Aimed Shot" = new AimedShot()
    "Steady Shot" = new SteadyShot()
    "Arcane Shot" = new ArcaneShot()
    "Kill Shot" = new KillShot()
    "Rapid Fire" = new RapidFire()
    "Tranquilizing Shot" = new TranquilizingShot()
    "Counter Shot" = new CounterShot()
    "Survival of the Fittest" = new SurvivaloftheFittestHunter()
    "Aspect of the Turtle" = new AspectoftheTurtle()
    "Concussive Shot" = new ConcussiveShot()
    "Exhilaration" = new Exhilaration()



    //TODO:Bursting Shot, 1.5, 30sec cd, Fires an explosion of bolts at all enemies in front of you, knocking them back, snaring them by 50% for 6 sec, and dealing (5.2728% of Attack power) Physical damage.   (8yards)
    //TODO:Misdirection, no gcd, 30s cd, Misdirects all threat you cause to the targeted party or raid member, beginning with your next attack within 30 sec and lasting for 8 sec. , bufftooltip: Threat redirected from Hunter.

    //passive
    "Sniper Training" = new SniperTraining()
    "Lone Wolf" = new LoneWolf()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//---------------------------------------
class SniperTraining extends Ability {
    constructor() {
        super("Sniper Training", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() { //TODO:RANGE
        return "Range of all your ranged abilities is increased by "+(player.stats.mastery/2.2).toFixed(1)+"% and damage of all abilities increased by "+player.stats.mastery.toFixed(1)+"% "
    }

}
//---------------------------------------
class LoneWolf extends Ability {
    constructor() {
        super("Lone Wolf", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
    }

    getTooltip() {
        return "Increases your damage by 10% when you do not have an active pet."
    }

}