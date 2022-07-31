let _fire_talents = function(caster) {
    //1
    caster.abilities["Firestarter"] = new Firestarter()
    caster.abilities["Pyromaniac"] = new Pyromaniac()
    caster.abilities["Searing Touch"] = new SearingTouch()

    //2
    caster.abilities["Blazing Soul"] = new BlazingSoul()
    caster.abilities["Shimmer"] = new Shimmer()
    caster.abilities["Blast Wave"] = new BlastWave()

    //3
    caster.abilities["Incanter's Flow"] = new IncantersFlow()
    caster.abilities["Focus Magic"] = new FocusMagic()
    caster.abilities["Rune of Power"] = new RuneofPower()

    //4
    caster.abilities["Flame On"] = new FlameOn()
    caster.abilities["Alexstrasza's Fury"] = new AlexstraszasFury()
    caster.abilities["From the Ashes"] = new FromtheAshes()

    //5
    caster.abilities["Frenetic Speed"] = new FreneticSpeed()
    caster.abilities["Ice Ward"] = new IceWard()
    caster.abilities["Ring of Frost"] = new RingofFrost()

    //6
    caster.abilities["Flame Patch"] = new FlamePatch()
    caster.abilities["Conflagration"] = new Conflagration()
    caster.abilities["Living Bomb"] = new LivingBomb()

    //7
    caster.abilities["Kindling"] = new Kindling()
    caster.abilities["Pyroclasm"] = new Pyroclasm()
    caster.abilities["Meteor"] = new Meteor()


    caster.talents = [["Firestarter","Pyromaniac","Searing Touch"],
        ["Blazing Soul","Shimmer","Blast Wave"],
        ["Incanter's Flow","Focus Magic","Rune of Power"],
        ["Flame On","Alexstrasza's Fury","From the Ashes"],
        ["Frenetic Speed","Ice Ward","Ring of Frost"],
        ["Flame Patch","Conflagration","Living Bomb"],
        ["Kindling","Pyroclasm","Meteor"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Firestarter extends Ability {
    constructor() {
        super("Firestarter", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Your Fireball and Pyroblast spells always deal a critical strike when the target is above 90% health."
    }

}
//------------------------------------------------
class Pyromaniac extends Ability {
    constructor() {
        super("Pyromaniac", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Casting Pyroblast or Flamestrike while Hot Streak is active has an 8% chance to instantly reactivate Hot Streak."
    }

}
//------------------------------------------------
class SearingTouch extends Ability {
    constructor() {
        super("Searing Touch", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Scorch deals 150% increased damage and is a guaranteed Critical Strike when the target is below 30% health."
    }

}
//------------------------------------------------------------------------------------------------ROW2
class BlazingSoul extends Ability {
    constructor() {
        super("Blazing Soul", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Casting Blink ignites a Blazing Barrier around you."
    }

}
//------------------------------------------------
//------------------------------------------------
class BlastWave extends Ability {
    constructor() {
        super("Blast Wave", 0, 1.5, 0, 25, false, false, false, "fire", 5, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Causes an explosion around yourself, dealing (47.25% of Spell power) Fire damage to all enemies within 8 yards, knocking them back, and reducing movement speed by 70% for 6 sec."
    }

}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class FlameOn extends Ability {
    constructor() {
        super("Flame On", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Reduces the cooldown of Fire Blast by 2 seconds and increases the maximum number of charges by 1."
    }

    setTalent(caster) {
        caster.abilities["Fire Blast"].cd -= 2
        caster.abilities["Fire Blast"].maxCd -= 2
        caster.abilities["Fire Blast"].charges ++
        caster.abilities["Fire Blast"].maxCharges ++
    }
    unsetTalent(caster) {
        caster.abilities["Fire Blast"].cd += 2
        caster.abilities["Fire Blast"].maxCd += 2
        caster.abilities["Fire Blast"].charges --
        caster.abilities["Fire Blast"].maxCharges --
    }

}
//------------------------------------------------
class AlexstraszasFury extends Ability {
    constructor() {
        super("Alexstrasza's Fury", 0, 0, 0, 45, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Dragon's Breath always critically strikes for 50% increased critical strike damage and contributes to Hot Streak.\n" +
            "\n" +
            "Additionally, damage done by your next Pyroblast or Flamestrike is increased by 35%."
    }
}
//------------------------------------------------
class FromtheAshes extends Ability {
    constructor() {
        super("From the Ashes", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Increases Mastery by 2% for each charge of Phoenix Flames off cooldown and your direct-damage critical strikes reduce its cooldown by 1 sec."
    }

}
//------------------------------------------------------------------------------------------------ROW5
class FreneticSpeed extends Ability {
    constructor() {
        super("Frenetic Speed", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 3
        this.effect = [{name:"moveSpeed",val:0.3}]
    }

    getTooltip() {
        return "Casting Scorch increases your movement speed by 30% for 3 sec."
    }
}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class FlamePatch extends Ability {
    constructor() {
        super("Flame Patch", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Flamestrike leaves behind a patch of flames which burns enemies within it for [8 * (5.4% of Spell power)] Fire damage over 8 sec."
    }

}
//------------------------------------------------
class Conflagration extends Ability {
    constructor() {
        super("Conflagration", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
        this.spellPower = 0.066
    }

    getTooltip() {
        return "Fireball applies Conflagration to the target, dealing an additional "+spellPowerHotToNumber(this.spellPower)+" Fire damage over 8 sec.<br>" +
            "<br>" +
            "Enemies affected by either Conflagration or Ignite have a 10% chance to flare up and deal (6.75% of Spell power) Fire damage to nearby enemies." //TODO:
    }

}
//------------------------------------------------
class LivingBomb extends Ability {
    constructor() {
        super("Living Bomb", 1.5, 1.5, 0, 12, false, false, false, "fire", 40, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//The target becomes a Living Bomb, taking (24% of Spell power) Fire damage over 4 sec, and then exploding to deal an additional (14% of Spell power) Fire damage to the target and reduced damage to all other enemies within 10 yards.\n" +
            "\n" +
            "Other enemies hit by this explosion also become a Living Bomb, but this effect cannot spread further."
    }

}
//------------------------------------------------------------------------------------------------ROW7
class Kindling extends Ability {
    constructor() {
        super("Kindling", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Your Fireball, Pyroblast, Fire Blast, and Phoenix Flames critical strikes reduce the remaining cooldown on Combustion by 1.0 sec."
    }

}
//------------------------------------------------
class Pyroclasm extends Ability {
    constructor() {
        super("Pyroclasm", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 15
        this.maxStacks = 2
    }

    getTooltip() { //TODO:
        return "Consuming Hot Streak has a 15% chance to make your next non-instant Pyroblast cast within 15 sec deal 240% additional damage.<br>" +
            "<br>" +
            "Maximum 2 stacks."
    }

}
//------------------------------------------------
class Meteor extends Ability {
    constructor() {
        super("Meteor", 1, 1.5, 0, 45, false, false, false, "fire", 40, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Calls down a meteor which lands at the target location after 3 sec, dealing (260% of Spell power) Fire damage, split evenly between all targets within 8 yards, and burns the ground, dealing [8 * (8.25% of Spell power)] Fire damage over 8.5 sec to all enemies in the area."
    }

}