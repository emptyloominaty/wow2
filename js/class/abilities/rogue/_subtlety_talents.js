let _subtlety_talents = function(caster) {
    //1
    caster.abilities["Weaponmaster"] = new Weaponmaster()
    caster.abilities["Premeditation"] = new Premeditation()
    caster.abilities["Gloomblade"] = new Gloomblade()

    //2
    caster.abilities["Nightstalker"] = new Nightstalker()
    caster.abilities["Subterfuge"] = new Subterfuge()
    caster.abilities["Shadow Focus"] = new ShadowFocus()

    //3
    caster.abilities["Vigor"] = new Vigor()
    caster.abilities["Deeper Stratagem"] = new DeeperStratagem()
    caster.abilities["Marked for Death"] = new MarkedforDeath()

    //4
    caster.abilities["Soothing Darkness"] = new SoothingDarkness()
    caster.abilities["Cheat Death"] = new CheatDeath()
    caster.abilities["Elusiveness"] = new Elusiveness()

    //5
    caster.abilities["Shot in the Dark"] = new ShotintheDark()
    caster.abilities["Night Terrors"] = new NightTerrors()
    caster.abilities["Prey on the Weak"] = new PreyontheWeak()

    //6
    caster.abilities["Dark Shadow"] = new DarkShadow()
    caster.abilities["Alacrity"] = new Alacrity()
    caster.abilities["Enveloping Shadows"] = new EnvelopingShadows()

    //7
    caster.abilities["Master of Shadows"] = new MasterofShadows()
    caster.abilities["Secret Technique"] = new SecretTechnique()
    caster.abilities["Shuriken Tornado"] = new ShurikenTornado()


    caster.talents = [["Weaponmaster","Premeditation","Gloomblade"],
        ["Nightstalker","Subterfuge","Shadow Focus"],
        ["Vigor","Deeper Stratagem","Marked for Death"],
        ["Soothing Darkness","Cheat Death","Elusiveness"],
        ["Shot in the Dark","Night Terrors","Prey on the Weak"],
        ["Dark Shadow","Alacrity","Enveloping Shadows"],
        ["Master of Shadows","Secret Technique","Shuriken Tornado"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
//------------------------------------------------
class Premeditation extends Ability {
    constructor() {
        super("Premeditation", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//After entering Stealth, your next Shadowstrike grants up to 10 sec of Slice and Dice, and generates 2 additional combo points if Slice and Dice is active."
    }

}
//------------------------------------------------
class Gloomblade extends Ability {
    constructor() {
        super("Gloomblade", 35, 1, 0, 0, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.secCost = -1
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Punctures your target with your shadow-infused blade for (56.5812% of Attack power) Shadow damage, bypassing armor. Critical strikes apply Find Weakness for 6 sec.<br><br>" +
            "Awards 1 combo point."
    }

}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
class ShadowFocus extends Ability {
    constructor() {
        super("Shadow Focus", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Abilities cost 20% less Energy while Stealth or Shadow Dance is active."
    }

}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class SoothingDarkness extends Ability {
    constructor() {
        super("Soothing Darkness", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//You heal 3% of your maximum health every 1 sec while Stealth or Shadow Dance is active."
    }

}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
class ShotintheDark extends Ability {
    constructor() {
        super("Shot in the Dark", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//After entering Stealth or Shadow Dance, your next Cheap Shot is free."
    }

}
//------------------------------------------------
class NightTerrors extends Ability {
    constructor() {
        super("Night Terrors", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Shuriken Storm reduces enemies' movement speed by 30% for 8 sec."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class DarkShadow extends Ability {
    constructor() {
        super("Dark Shadow", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Shadow Dance now increases damage by 30%."
    }

}
//------------------------------------------------
//------------------------------------------------
class EnvelopingShadows extends Ability {
    constructor() {
        super("Enveloping Shadows", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Deepening Shadows reduces the remaining cooldown of Shadow Dance by an additional 0.5 sec per combo point spent.<br>" +
            "<br>" +
            "Shadow Dance gains 1 additional charge."
    }

    setTalent(caster) {
        caster.abilities["Shadow Dance"].charges ++
        caster.abilities["Shadow Dance"].maxCharges ++
    }

    unsetTalent(caster) {
        caster.abilities["Shadow Dance"].charges --
        caster.abilities["Shadow Dance"].maxCharges --
    }

}
//------------------------------------------------------------------------------------------------ROW7
class MasterofShadows extends Ability {
    constructor() {
        super("Master of Shadows", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 3
    }

    getTooltip() {
        return "Gain 25 Energy over 3 sec when you enter Stealth or activate Shadow Dance."
    }

    runBuff(caster, buff, id) {
        caster.useEnergy(-8.33*progressInSec)
    }

}
//------------------------------------------------
class SecretTechnique extends Ability {
    constructor() {
        super("Secret Technique", 30, 1, 0, 45, false, false, false, "physical", 5, 1)
        this.talent = true
        this.secCost = "all"
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Finishing move that creates shadow clones of yourself. You and your shadow clones each perform a piercing attack on all enemies near your target, dealing Physical damage to the primary target and reduced damage to other targets.\n" +
            "  1 point  : [(11% of Attack power) * 1 * 3] total damage\n" +
            "  2 points: [(11% of Attack power) * 2 * 3] total damage\n" +
            "  3 points: [(11% of Attack power) * 3 * 3] total damage\n" +
            "  4 points: [(11% of Attack power) * 4 * 3] total damage\n" +
            "  5 points: [(11% of Attack power) * 5 * 3] total damage\n" +
            "Cooldown is reduced by 1 sec for every combo point you spend."
    }

}
//------------------------------------------------
class ShurikenTornado extends Ability {
    constructor() {
        super("Shuriken Tornado", 60, 1, 0, 60, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Focus intently, then release a Shuriken Storm every sec for the next 4 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Releasing a Shuriken Storm every sec."
    }

}