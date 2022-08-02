let _shadow_talents = function(caster) {
    //1
    caster.abilities["Fortress of the Mind"] = new FortressoftheMind()
    caster.abilities["Death and Madness"] = new DeathandMadness()
    caster.abilities["Unfurling Darkness"] = new UnfurlingDarkness()

    //2
    caster.abilities["Body and Soul"] = new BodyandSoul()
    caster.abilities["San'layn"] = new Sanlayn()
    caster.abilities["Intangibility"] = new Intangibility()

    //3
    caster.abilities["Twist of Fate"] = new TwistofFateShadow()
    caster.abilities["Misery"] = new Misery()
    caster.abilities["Searing Nightmare"] = new SearingNightmare()

    //4
    caster.abilities["Last Word"] = new LastWord()
    caster.abilities["Mind Bomb"] = new MindBomb()
    caster.abilities["Psychic Horror"] = new PsychicHorror()

    //5
    caster.abilities["Auspicious Spirits"] = new AuspiciousSpirits()
    caster.abilities["Psychic Link"] = new PsychicLink()
    caster.abilities["Shadow Crash"] = new ShadowCrash()

    //6
    caster.abilities["Damnation"] = new Damnation()
    caster.abilities["Mindbender"] = new Mindbender()
    caster.abilities["Void Torrent"] = new VoidTorrent()

    //7
    caster.abilities["Ancient Madness"] = new AncientMadness()
    caster.abilities["Hungering Void"] = new HungeringVoid()
    caster.abilities["Surrender to Madness"] = new SurrendertoMadness()


    caster.talents = [["Fortress of the Mind","Death and Madness","Unfurling Darkness"],
        ["Body and Soul","San'layn","Intangibility"],
        ["Twist of Fate","Misery","Searing Nightmare"],
        ["Last Word","Mind Bomb","Psychic Horror"],
        ["Auspicious Spirits","Psychic Link","Shadow Crash"],
        ["Damnation","Mindbender","Void Torrent"],
        ["Ancient Madness","Hungering Void","Surrender to Madness"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class FortressoftheMind extends Ability {
    constructor() {
        super("Fortress of the Mind", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Mind Flay and Mind Blast deal 10% more damage and generate 20% more Insanity."
    }

    setTalent(caster) {
        caster.abilities["Mind Flay"].spellPower *= 1.1
        caster.abilities["Mind Flay"].cost *= 1.2
        caster.abilities["Mind Blast"].spellPower *= 1.1
        caster.abilities["Mind Blast"].cost *= 1.2
    }
    unsetTalent(caster) {
        caster.abilities["Mind Flay"].spellPower /= 1.1
        caster.abilities["Mind Flay"].cost /= 1.2
        caster.abilities["Mind Blast"].spellPower /= 1.1
        caster.abilities["Mind Blast"].cost /= 1.2
    }
}
//------------------------------------------------
class DeathandMadness extends Ability {
    constructor() {
        super("Death and Madness", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//If a target dies within 7 sec after being struck by your Shadow Word: Death, you gain 40 Insanity over 4 sec and the cooldown of your Shadow Word: Death is reset."
    }

}
//------------------------------------------------
class UnfurlingDarkness extends Ability {
    constructor() {
        super("Unfurling Darkness", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//After casting Vampiric Touch on a target, your next Vampiric Touch within 8 sec is instant cast and deals (105.4% of Spell power) Shadow damage immediately.\n" +
            "\n" +
            "This effect cannot occur more than once every 15 sec."
    }

}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
class Sanlayn extends Ability {
    constructor() {
        super("San'layn", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Vampiric Embrace by 45 sec and increases its healing done by 25%."
    }


    setTalent(caster) {
        caster.abilities["Vampiric Embrace"].cd -= 45
        caster.abilities["Vampiric Embrace"].maxCd -= 45
    }
    unsetTalent(caster) {
        caster.abilities["Vampiric Embrace"].cd += 45
        caster.abilities["Vampiric Embrace"].maxCd += 45
    }

}
//------------------------------------------------
class Intangibility extends Ability {
    constructor() {
        super("Intangibility", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Dispersion heals for 50% of your maximum health over its duration and has 30 sec reduced cooldown."
    }

}
//------------------------------------------------------------------------------------------------ROW3
class TwistofFateShadow extends Ability {
    constructor() {
        super("Twist of Fate", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"increaseStat",stat:"primary",val:10,percent:true}]
        this.duration = 10
    }

    getTooltip() {
        return "After damaging a target below 35% health, you gain 10% increased damage and healing for 8 sec."
    }

}
//------------------------------------------------
class Misery extends Ability {
    constructor() {
        super("Misery", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Vampiric Touch also applies Shadow Word: Pain to the target."
    }

}
//------------------------------------------------
class SearingNightmare extends Ability {
    constructor() {
        super("Searing Nightmare", 30, 1.5, 0, 0, false, false, false, "shadow", 100, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Instantly deals (43% of Spell power) Shadow damage to enemies around the target and afflicts them with Shadow Word: Pain. If the enemy is already afflicted by your Shadow Word: Pain, Searing Nightmare's damage is increased by 100%.\n" +
            "\n" +
            "Only usable while channeling Mind Sear."
    }

}
//------------------------------------------------------------------------------------------------ROW4
class LastWord extends Ability {
    constructor() {
        super("Last Word", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Reduces the cooldown of Silence by 15 sec."
    }


    setTalent(caster) {
        caster.abilities["Silence"].cd -= 15
        caster.abilities["Silence"].maxCd -= 15
    }
    unsetTalent(caster) {
        caster.abilities["Silence"].cd += 15
        caster.abilities["Silence"].maxCd += 15
    }

}
//------------------------------------------------
class MindBomb extends Ability {
    constructor() {
        super("Mind Bomb", 0, 1.5, 0, 30, false, false, false, "shadow", 30, 1)
        this.talent = true
    }

    getTooltip() { //TODO:Replaces Psychic Scream
        return "//NOT IMPLEMENTED//Inflicts the target with a Mind Bomb.\n" +
            "\n" +
            "After 2 sec or if the target dies, it unleashes a psychic explosion, disorienting all enemies within 8 yds of the target for 6 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "About to unleash a psychic explosion, disorienting all nearby enemies."
    }
}
//------------------------------------------------
class PsychicHorror extends Ability {
    constructor() {
        super("Psychic Horror", 0, 1.5, 0, 45, false, false, false, "shadow", 30, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Terrifies the target in place, stunning them for 4 sec."
    }

}
//------------------------------------------------------------------------------------------------ROW5
class AuspiciousSpirits extends Ability {
    constructor() {
        super("Auspicious Spirits", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.passive = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Your Shadowy Apparitions now deal 15% increased damage and generate 2 Insanity."
    }

    setTalent(caster) {
        caster.abilities["Shadowy Apparitions"].spellPower *= 1.15
    }
    unsetTalent(caster) {
        caster.abilities["Shadowy Apparitions"].spellPower /= 1.15
    }
}
//------------------------------------------------
class PsychicLink extends Ability {
    constructor() {
        super("Psychic Link", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.passive = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Mind Blast deals 60% of its damage to all other targets afflicted by your Vampiric Touch within 40 yards."
    }

}
//------------------------------------------------
class ShadowCrash extends Ability {
    constructor() {
        super("Shadow Crash", -15, 1.5, 0, 45, false, false, false, "shadow", 40, 1)
        this.talent = true

    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Hurl a bolt of slow-moving Shadow energy at the destination, dealing (153% of Spell power) Shadow damage to all targets within 8 yards.\n" +
            "\n" +
            "Generates 15 Insanity."
    }

}
//------------------------------------------------------------------------------------------------ROW6
class Damnation extends Ability {
    constructor() {
        super("Damnation", 0, 1.5, 0, 45, false, false, false, "shadow", 40, 1)
        this.talent = true

    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Instantly afflicts the target with Shadow Word: Pain, Vampiric Touch and Devouring Plague."
    }

}
//------------------------------------------------
//------------------------------------------------
class VoidTorrent extends Ability {
    constructor() {
        super("Void Torrent", -60, 1.5, 3, 30, false, false, false, "shadow", 40, 1)
        this.talent = true

    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Channel a torrent of void energy into the target, dealing (306% of Spell power) Shadow damage over 3 sec.\n" +
            "\n" +
            "Generates 60 Insanity over the duration."
    }

}
//------------------------------------------------------------------------------------------------ROW7
class AncientMadness extends Ability {
    constructor() {
        super("Ancient Madness", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.passive = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Voidform increases your critical strike chance by 30% for 15 sec, reducing by 2% every sec."
    }

}
//------------------------------------------------
class HungeringVoid extends Ability {
    constructor() {
        super("Hungering Void", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.passive = true
        this.effect = [{name:"damageTaken",val:0.1}]
        this.duration = 6
    }

    getTooltip() { //TODO:LIMIT 1
        return "Void Bolt causes the target to become vulnerable to the void, increasing their damage taken from you by 10% for 6 sec. This effect may only be active on one target at a time.<br>" +
            "<br>" +
            "Casting Void Bolt on an enemy that is already vulnerable extends the duration of your Voidform by 1 sec, or 2 sec if Void Bolt critically strikes." //TODO:CRIT
    }

}
//------------------------------------------------
class SurrendertoMadness extends Ability {
    constructor() {
        super("Surrender to Madness", 0, 1.5, 0, 90, false, false, false, "shadow", 40, 1)
        this.talent = true
        this.duration = 30
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Deals [(64.6% of Spell power) * 2] Shadow damage to the target and activates Voidform.\n" +
            "\n" +
            "For the next 30 sec, your Insanity-generating abilities generate 100% more Insanity and you can cast while moving.\n" +
            "\n" +
            "If the target does not die within 30 sec of using Surrender to Madness, you die."
    }

    getBuffTooltip(caster, target, buff) {
        return "The Priest has surrendered to madness, sharing its fate with its target. If the target doesn't die within 30 sec, the Priest dies.\n" +
            "\n" +
            "Can cast while moving, and  Insanity-generating abilities generate 100% more Insanity."
    }

}