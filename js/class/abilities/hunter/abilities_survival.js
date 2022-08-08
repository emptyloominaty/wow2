class Survival_Abilities {
    "Kill Shot" = new KillShot()
    "Tranquilizing Shot" = new TranquilizingShot()
    "Counter Shot" = new CounterShot()
    "Survival of the Fittest" = new SurvivaloftheFittestHunter()
    "Aspect of the Turtle" = new AspectoftheTurtle()
    "Concussive Shot" = new ConcussiveShot()
    "Exhilaration" = new Exhilaration()
    "Aspect of the Cheetah" = new AspectoftheCheetah()
    "Raptor Strike" = new RaptorStrike()
    "Serpent Sting" = new SerpentStingSurvival()
    "Carve" = new Carve()
    "Wildfire Bomb" = new WildfireBomb()
    "Aspect of the Eagle" = new AspectoftheEagle()
    "Coordinated Assault" = new CoordinatedAssault()
    "Kill Command" = new KillCommand()

    //TODO:Harpoon, 20s cd, 8-30yd, Hurls a harpoon at an enemy, rooting them in place for 3 sec and pulling you to them.

    //passive
    "Spirit Bond" = new SpiritBond()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//---------------------------------------
class SpiritBond extends Ability {
    constructor() {
        super("Spirit Bond", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "You and your pet's Focus spending abilities deal "+(player.stats.mastery).toFixed(1)+"% increased damage.<br>" +
            "<br>" +
            "While your pet is active, you both regenerate "+(player.stats.mastery/13).toFixed(1)+"% of maximum health every 5 sec." //TODO:regenerate
    }

}