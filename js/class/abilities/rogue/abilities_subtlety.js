class Subtlety_Abilities {
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
    "Cloak of Shadows" = new CloakofShadows()
    "Shiv" = new Shiv()
    "Instant Poison" = new InstantPoison()
    "Shadowstep" = new Shadowstep(true)
    "Rupture" = new Rupture(true)
    "Shadowstrike" = new Shadowstrike()
    "Shuriken Toss" = new ShurikenToss()
    "Eviscerate" = new Eviscerate()
    "Backstab" = new Backstab()
    "Shuriken Storm" = new ShurikenStorm()
    "Black Powder" = new BlackPowder()
    "Shadow Blades" = new ShadowBlades()
    "Symbols of Death" = new SymbolsofDeath()
    "Shadow Dance" = new ShadowDance()

    //passive
    "Find Weakness" = new FindWeakness()
    "Shadow Techniques" = new ShadowTechniques()
    "Relentless Strikes" = new RelentlessStrikes()
    "Executioner" = new Executioner()
    "Deepening Shadows" = new DeepeningShadows()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//--------------------------------------
class FindWeakness extends Ability {
    constructor() {
        super("Find Weakness", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 18
        //TODO:ARMOR
    }

    getTooltip() {
        return "Cheap Shot and Shadowstrike reveal a flaw in your target's defenses, causing all of your attacks to bypass 30% of that enemy's armor for 18 sec."
    }
}
//--------------------------------------
class ShadowTechniques extends Ability {
    constructor() {
        super("Shadow Techniques", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Your auto attacks have a chance to generate 1 combo point and 8 Energy."
    }
    //TODO:The chance on auto attacks to get the effect is not completely random but rather based on the number of successful, subsequent auto attacks. For your first two auto attacks (counting both, main hand and off hand) there is no chance for it to proc. The third hit, however, has a 50% chance. If you don't get the proc on the third, your fourth auto attack will have a guaranteed proc. When the effect triggers, the counter is reset and the cycle starts over again. This mechanic allows it to play around this ability. For example, you can use a Weak Aura to keep track of the number of successful auto attacks since your last proc and prepare for incoming resources on the third or fourth hit.
}
//--------------------------------------
class RelentlessStrikes extends Ability {
    constructor() {
        super("Relentless Strikes", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Your finishing moves generate 6 Energy per combo point spent."
    }
}
//--------------------------------------
class Executioner extends Ability {
    constructor() {
        super("Executioner", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage done by your finishing moves by "+player.stats.mastery.toFixed(1)+"%."
    }
}
//--------------------------------------
class DeepeningShadows extends Ability {
    constructor() {
        super("Deepening Shadows", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Your finishing moves reduce the remaining cooldown on Shadow Dance by 1 sec per combo point spent."
    }
}
