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
    caster.abilities["Incarnation: King of the Jungle"] = new IncarnationKingoftheJungle()

    //6
    caster.abilities["Scent of Blood"] = new ScentofBlood()
    caster.abilities["Brutal Slash"] = new BrutalSlash()
    caster.abilities["Primal Wrath"] = new PrimalWrath()

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
        this.needForm = "Cat Form"
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
class IncarnationKingoftheJungle extends Ability {
    constructor() {
        super("Incarnation: King of the Jungle", 0, 0, 0, 180, false, false, false, "physical", 5, 1)
        this.talent = true
        this.canCastForm = "Cat Form"
        this.duration = 30
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//An improved Cat Form that grants the benefits of Berserk, reduces the Energy cost of all Cat Form abilities by 20%, and allows the use of Prowl once while in combat.<br>" +
            "<br>" +
            "Lasts 30 sec. You may shapeshift in and out of this improved Cat Form for its duration."

    }

    getBuffTooltip(caster, target, buff) {
        return "Rake and Shred deal damage as though you were stealthed.\n" +
            "\n" +
            "Finishing moves have a 20% chance per combo point spent to refund 1 combo point.\n" + //Rip, Ferocious Bite, Maim, Savage Roar, Primal Wrath
            "\n" +
            "Energy costs reduced by 20%."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            applyBuff(caster,caster,this)
            caster.health += (caster.stats.stamina*20) * 0.3
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }


    setTalent(caster) {
        caster.abilities["Berserk"].canUse = false
        replaceAction(caster, "Berserk", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Berserk"].canUse = true
        replaceAction(caster,this.name,"Berserk")
    }

    endBuff(caster) {
    }

}
//------------------------------------------------------------------------------------------------ROW6
class ScentofBlood extends Ability {
    constructor() {
        super("Scent of Blood", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Each enemy hit by Thrash reduces the cost of Swipe by 3 Energy for the next 6 sec."
    }

}
//------------------------------------------------
class BrutalSlash extends Ability {
    constructor() {
        super("Brutal Slash", 25, 1, 0, 8, false, false, false, "physical", 8,3)
        this.talent = true
        this.needForm = "Cat Form"
        this.secCost = -1
        this.spellPower = 0.828
    }

    getTooltip() { //TODO: Replaces Swipe
        return "//NOT IMPLEMENTED//Strikes all nearby enemies with a massive slash, inflicting (82.8% of Attack power) Physical damage."
    }

}
//------------------------------------------------
class PrimalWrath extends Ability {
    constructor() {
        super("Primal Wrath", 20, 1, 0, 8, false, false, false, "physical", 8,3)
        this.talent = true
        this.needForm = "Cat Form"
        this.secCost = "all"
        this.spellPower = 0.055
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Finishing move that deals instant damage and applies Rip to all enemies within 8 yards. Lasts longer per combo point.\n" +
            "\n" +
            "  1 point  : [(5.5% of Attack power) * 2] plus Rip for 4 sec\n" +
            "  2 points: [(5.5% of Attack power) * 3] plus Rip for 6 sec\n" +
            "  3 points: [(5.5% of Attack power) * 4] plus Rip for 8 sec\n" +
            "  4 points: [(5.5% of Attack power) * 5] plus Rip for 10 sec\n" +
            "  5 points: [(5.5% of Attack power) * 6] plus Rip for 12 sec"
    }

}
//------------------------------------------------------------------------------------------------ROW7
class MomentofClarity extends Ability {
    constructor() {
        super("Moment of Clarity", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Omen of Clarity now triggers 50% more often, can accumulate up to (1u + 1) charges, and increases the damage of your next Shred, Thrash, or\n" +
            "\n" +
            "Brutal Slash\n" +
            "Brutal Slash\n" +
            "\n" +
            "Swipe by 15%.\n" +
            "\n" +
            "Your maximum Energy is increased by 30."
    }

}
//------------------------------------------------
class Bloodtalons extends Ability {
    constructor() {
        super("Bloodtalons", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:When you use 3 different combo point-generating abilities within 4 sec, the damage of your next 2 Rips or Ferocious Bites is increased by 30%.
        return "Damage of your Ferocious Bites is increased by 25%."
    }

    setTalent(caster) {
        caster.abilities["Ferocious Bite"].spellPower *= 1.25
    }
    unsetTalent(caster) {
        caster.abilities["Ferocious Bite"].spellPower /= 1.25
    }

}
//------------------------------------------------
class FeralFrenzy extends Ability {
    constructor() {
        super("Feral Frenzy", 25, 1, 0, 45, false, false, false, "physical", 5, 1)
        this.talent = true
        this.secCost = -5
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Unleash a furious frenzy, clawing your target 5 times for [(7.5% of Attack power) * 5] Physical damage and an additional [5 * (15% of Attack power) * 6 / 2] Bleed damage over 6 sec.<br>" +
            "<br>" +
            "Awards 5 combo points."
    }

}