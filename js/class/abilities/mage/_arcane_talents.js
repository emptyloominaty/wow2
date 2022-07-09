let _arcane_talents = function(caster) {

    //1
    caster.abilities["Amplification"] = new Amplification()
    caster.abilities["Rule of Threes"] = new RuleofThrees()
    caster.abilities["Arcane Familiar"] = new ArcaneFamiliar()

    //2
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //3
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //4
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //5
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //6
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //7
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    caster.talents = [["Amplification","Rule of Threes","Arcane Familiar"],
        ["Master of Time","Shimmer","Slipstream"],
        ["Incanter's Flow","Focus Magic","Rune of Power"],
        ["Resonance","Arcane Echo","Nether Tempest"],
        ["Chrono Shift","Ice Ward","Ring of Frost"],
        ["Reverberate","Arcane Orb","Supernova"],
        ["Overpowered","Time Anomaly","Enlightened"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Amplification extends Ability {
    constructor() {
        super("Amplification", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "When Clearcast, Arcane Missiles fires 2 additional missile."
    }
}
//------------------------------------------------
class RuleofThrees extends Ability {
    constructor() {
        super("Rule of Threes", 0, 0, 0, 0, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return "When you gain your third Arcane Charge, the cost of your next Arcane Blast or Arcane Missiles is reduced by 100%."
    }
}
//------------------------------------------------
class ArcaneFamiliar extends Ability {
    constructor() {
        super("Arcane Familiar", 0, 1.5, 0, 10, false, false, false, "arcane", 5, 1)
        this.passive = true
        this.talent = true
        //pet casts:  Arcane Assault: Launches bolts of arcane energy at the enemy target, causing (8.75% of Spell power) Arcane damage.
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Summon a Familiar that attacks your enemies and increases your maximum mana by 10% for 1 hour."
    }
}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------