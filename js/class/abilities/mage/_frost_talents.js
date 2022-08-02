let _frost_talents = function(caster) {
    //1
    caster.abilities["Bone Chilling"] = new BoneChilling()
    caster.abilities["Lonely Winter"] = new LonelyWinter()
    caster.abilities["Ice Nova"] = new IceNova()

    //2
    caster.abilities["Glacial Insulation"] = new GlacialInsulation()
    caster.abilities["Shimmer"] = new Shimmer()
    caster.abilities["Ice Floes"] = new IceFloes()

    //3
    caster.abilities["Incanter's Flow"] = new IncantersFlow()
    caster.abilities["Focus Magic"] = new FocusMagic()
    caster.abilities["Rune of Power"] = new RuneofPower()

    //4
    caster.abilities["Frozen Touch"] = new FrozenTouch()
    caster.abilities["Chain Reaction"] = new ChainReaction()
    caster.abilities["Ebonbolt"] = new Ebonbolt()

    //5
    caster.abilities["Frigid Winds"] = new FrigidWinds()
    caster.abilities["Ice Ward"] = new IceWard()
    caster.abilities["Ring of Frost"] = new RingofFrost()

    //6
    caster.abilities["Freezing Rain"] = new FreezingRain()
    caster.abilities["Splitting Ice"] = new SplittingIce()
    caster.abilities["Comet Storm"] = new CometStorm()

    //7
    caster.abilities["Thermal Void"] = new ThermalVoid()
    caster.abilities["Ray of Frost"] = new RayofFrost()
    caster.abilities["Glacial Spike"] = new GlacialSpike()

    caster.talents = [["Bone Chilling","Lonely Winter","Ice Nova"],
        ["Glacial Insulation","Shimmer","Ice Floes"],
        ["Incanter's Flow","Focus Magic","Rune of Power"],
        ["Frozen Touch","Chain Reaction","Ebonbolt"],
        ["Frigid Winds","Ice Ward","Ring of Frost"],
        ["Freezing Rain","Splitting Ice","Comet Storm"],
        ["Thermal Void","Ray of Frost","Glacial Spike"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class BoneChilling extends Ability {
    constructor() {
        super("Bone Chilling", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Whenever you attempt to chill a target, you gain Bone Chilling, increasing spell damage you deal by 0.5% for 8 sec, stacking up to 10 times."
    }

}
//------------------------------------------------
class LonelyWinter extends Ability {
    constructor() {
        super("Lonely Winter", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "You can no longer summon your Water Elemental, but Frostbolt, Ice Lance, and Flurry deal 25% increased damage."
    }

    setTalent(caster) {
        caster.abilities["Summon Water Elemental"].canUse = false
        caster.abilities["Frostbolt"].spellPower *= 1.25
        caster.abilities["Ice Lance"].spellPower *= 1.25
        caster.abilities["Flurry"].spellPower *= 1.25
    }
    unsetTalent(caster) {
        caster.abilities["Summon Water Elemental"].canUse = true
        caster.abilities["Frostbolt"].spellPower /= 1.25
        caster.abilities["Ice Lance"].spellPower /= 1.25
        caster.abilities["Flurry"].spellPower /= 1.25
    }

}
//------------------------------------------------
class IceNova extends Ability {
    constructor() {
        super("Ice Nova", 0, 1.5, 0, 25, false, false, false, "frost", 40, 1)
        this.talent = true
        this.aoeRange = 8
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Causes a whirl of icy wind around the enemy, dealing (180% of Spell power) Frost damage to the target and reduced damage to all other enemies within 8 yards, and freezing them in place for 2 sec."
    }

}
//------------------------------------------------------------------------------------------------ROW2
class GlacialInsulation extends Ability {
    constructor() {
        super("Glacial Insulation", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Ice Barrier increases your armor by 200% while active, and Ice Block applies Ice Barrier to you when it fades."
    }

}
//------------------------------------------------
//------------------------------------------------
class IceFloes extends Ability {
    constructor() {
        super("Ice Floes", 0, 0, 0, 20, false, false, false, "frost", 5, 3)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Makes your next Mage spell with a cast time shorter than 10 sec castable while moving. Unaffected by the global cooldown and castable while casting."
    }

    getBuffTooltip(caster, target, buff) {
        return "Able to move while casting spells."
    }

}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class FrozenTouch extends Ability {
    constructor() {
        super("Frozen Touch", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Frostbolt grants you Fingers of Frost and Brain Freeze 20% more often."
    }

}
//------------------------------------------------
class ChainReaction extends Ability {
    constructor() {
        super("Chain Reaction", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.maxStacks = 5
        this.duration = 10
    }

    getTooltip() {
        return "Your Ice Lances against frozen targets increase the damage of your Ice Lances by 3% for 10 sec, stacking up to 5 times."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your Ice Lances damage against frozen targets increased by "+buff.stacks*3+"%"
    }

}
//------------------------------------------------
class Ebonbolt extends Ability {
    constructor() {
        super("Ebonbolt", 0, 1.5, 2.5, 45, false, false, false, "frost", 40, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Launch a bolt of ice at the enemy, dealing (200% of Spell power) Frost damage and granting you Brain Freeze."
    }

}
//------------------------------------------------------------------------------------------------ROW5
class FrigidWinds extends Ability {
    constructor() {
        super("Frigid Winds", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//All of your chilling effects reduce the target's movement speed by an additional 10%."
    }

}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class FreezingRain extends Ability {
    constructor() {
        super("Freezing Rain", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 12
    }

    getTooltip() {
        return "Frozen Orb makes Blizzard instant cast and increases its damage done by 60% for 12 sec."
    }

}
//------------------------------------------------
class SplittingIce extends Ability {
    constructor() {
        super("Splitting Ice", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Your Ice Lance and Icicles now deal 5% increased damage, and hit a second nearby target for 65% of their damage.<br>" +
            "<br>" +
            "Your Ebonbolt and Glacial Spike also hit a second nearby target for 80% of its damage." //TODO:
    }

    setTalent(caster) {
        caster.abilities["Ice Lance"].spellPower *= 1.05
        caster.abilities["Icicles"].spellPower *= 1.05
    }

    unsetTalent(caster) {
        caster.abilities["Ice Lance"].spellPower /= 1.05
        caster.abilities["Icicles"].spellPower /= 1.05
    }

}
//------------------------------------------------
class CometStorm extends Ability {
    constructor() {
        super("Comet Storm", 1, 1.5, 0, 30, false, false, false, "frost", 40, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Calls down a series of 7 icy comets on and around the target, that deals up to [7 * (42% of Spell power)] Frost damage to all enemies within 6 yds of its impacts."
    }

}
//------------------------------------------------------------------------------------------------ROW7
class ThermalVoid extends Ability {
    constructor() {
        super("Thermal Void", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Icy Veins' duration is increased by 10 sec.<br>" +
            "<br>" +
            "Your Ice Lances against frozen targets extend your Icy Veins by an additional 1 sec."
    }

    setTalent(caster) {
        caster.abilities["Icy Veins"].duration += 10
    }
    unsetTalent(caster) {
        caster.abilities["Icy Veins"].duration -= 10
    }

}
//------------------------------------------------
class RayofFrost extends Ability {
    constructor() {
        super("Ray of Frost", 2, 1.5, 5, 75, true, false, false, "frost", 40, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Channel an icy beam at the enemy for 5 sec, dealing (120% of Spell power) Frost damage every 1 sec and slowing movement by 60%. Each time Ray of Frost deals damage, its damage and snare increases by 10%.\n" +
            "\n" +
            "Generates 2 charges of Fingers of Frost over its duration."
    }

}
//------------------------------------------------
class GlacialSpike extends Ability {
    constructor() {
        super("Glacial Spike", 1, 1.5, 3, 0, false, true, false, "frost", 40, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Conjures a massive spike of ice, and merges your current Icicles into it. It impales your target, dealing (297% of Spell power) damage plus all of the damage stored in your Icicles, and freezes the target in place for 4 sec. Damage may interrupt the freeze effect.\n" +
            "\n" +
            "Requires 5 Icicles to cast.\n" +
            "\n" +
            "Passive: Ice Lance no longer launches Icicles."
    }

}