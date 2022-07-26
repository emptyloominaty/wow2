let _feral_talents = function(caster) {
    //1
    caster.abilities["Predator"] = new Predator()
    caster.abilities["Sabertooth"] = new Sabertooth()
    caster.abilities["Lunar Inspiration"] = new LunarInspiration()

    //2
    caster.abilities["Tiger Dash"] = new TigerDash()
    caster.abilities["Renewal"] = new Renewal()
    caster.abilities["Wild Charge"] = new WildCharge()

    //3
    caster.abilities["Balance Affinity"] = new BalanceAffinity()
    caster.abilities["Guardian Affinity"] = new GuardianAffinity()
    caster.abilities["Restoration Affinity"] = new RestorationAffinity()

    //4
    caster.abilities["Mighty Bash"] = new MightyBash()
    caster.abilities["Mass Entanglement"] = new MassEntanglement()
    caster.abilities["Heart of the Wild"] = new HeartoftheWild()

    //5
    caster.abilities["Soul of the Forest"] = new SouloftheForestFeral()
    caster.abilities["Savage Roar"] = new SavageRoar()
    //caster.abilities["Incarnation: King of the Jungle"] = new IncarnationKingoftheJungle()

    //6
    //caster.abilities["Scent of Blood"] = new ScentofBlood()
    //caster.abilities["Brutal Slash"] = new BrutalSlash()
    //caster.abilities["Primal Wrath"] = new PrimalWrath()

    //7
    //caster.abilities["Moment of Clarity"] = new MomentofClarity()
    //caster.abilities["Bloodtalons"] = new Bloodtalons()
    //caster.abilities["Feral Frenzy"] = new FeralFrenzy()


    caster.talents = [["Predator","Sabertooth","Lunar Inspiration"],
        ["Tiger Dash","Renewal","Wild Charge"],
        ["Balance Affinity","Guardian Affinity","Restoration Affinity"],
        ["Mighty Bash","Mass Entanglement","Heart of the Wild"],
        ["Soul of the Forest","Savage Roar","Incarnation: King of the Jungle"],
        ["Scent of Blood","Brutal Slash","Primal Wrath"],
        ["Moment of Clarity","Bloodtalons","Feral Frenzy"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Predator extends Ability {
    constructor() {
        super("Predator", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//The cooldown on Tiger's Fury resets when a target dies with one of your Bleed effects active, and Tiger's Fury lasts 5 additional seconds."
    }

}
//------------------------------------------------
class Sabertooth extends Ability {
    constructor() {
        super("Sabertooth", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Ferocious Bite deals 20% increased damage and increases the duration of Rip on your target by 1 sec per combo point spent."
    }

    setTalent(caster) {
        caster.abilities["Ferocious Bite"].spellPower *= 1.2
    }
    unsetTalent(caster) {
        caster.abilities["Ferocious Bite"].spellPower /= 1.2
    }
}
//------------------------------------------------
class LunarInspiration extends Ability {
    constructor() {
        super("Lunar Inspiration", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //Moonfire is usable in Cat Form, costs 30 energy, and generates 1 combo points.
        return "Moonfire damage is increased by 100%."
    }

    setTalent(caster) {
        caster.abilities["Moonfire"].spellPower *= 2
        caster.abilities["Moonfire"].spellPowerDot *= 2
    }
    unsetTalent(caster) {
        caster.abilities["Moonfire"].spellPower /= 2
        caster.abilities["Moonfire"].spellPowerDot /= 2
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
class SouloftheForestFeral extends Ability {
    constructor() {
        super("Soul of the Forest", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Your finishing moves grant 5 Energy per combo point spent and deal 5% increased damage."
    }

    setTalent(caster) {
        caster.abilities["Ferocious Bite"].spellPower *= 1.05
        caster.abilities["Maim"].spellPower *= 1.05
        caster.abilities["Rip"].spellPower *= 1.05
        //TODO:caster.abilities["Primal Wrath"].spellPower *= 1.05
    }
    unsetTalent(caster) {
        caster.abilities["Ferocious Bite"].spellPower /= 1.05
        caster.abilities["Maim"].spellPower /= 1.05
        caster.abilities["Rip"].spellPower /= 1.05
        //TODO:caster.abilities["Primal Wrath"].spellPower /= 1.05
    }


}
//------------------------------------------------
class SavageRoar extends Ability {
    constructor() {
        super("Savage Roar", 25, 1, 0, 0, false, false, false, "physical", 100, 1)
        this.talent = true
        this.secCost = "all"
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Finishing move that increases damage by 15% and energy regeneration rate by 10% while in Cat Form. Lasts longer per combo point:\n" +
            "\n" +
            "  1 point  : 12 seconds\n" +
            "  2 points: 18 seconds\n" +
            "  3 points: 24 seconds\n" +
            "  4 points: 30 seconds\n" +
            "  5 points: 36 seconds"
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage increased 15% while in Cat Form.\n" +
            "Energy regeneration increased by 10%."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------