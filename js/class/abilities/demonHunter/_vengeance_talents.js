let _vengeance_talents = function(caster) {
    //1
    caster.abilities["Abyssal Strike"] = new AbyssalStrike()
    caster.abilities["Agonizing Flames"] = new AgonizingFlames()
    caster.abilities["Felblade"] = new Felblade()

    //2
    caster.abilities["Feast of Souls"] = new FeastofSouls()
    caster.abilities["Fallout"] = new Fallout()
    caster.abilities["Burning Alive"] = new BurningAlive()

    //3
    caster.abilities["Infernal Armor"] = new InfernalArmor()
    //caster.abilities["Charred Flesh"] = new CharredFlesh()
    //caster.abilities["Spirit Bomb"] = new SpiritBomb()

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

    caster.talents = [["Abyssal Strike","Agonizing Flames","Felblade"],
        ["Feast of Souls","Fallout","Burning Alive"],
        ["Infernal Armor","Charred Flesh","Spirit Bomb"],
        ["Soul Rending","Feed the Demon","Fracture"],
        ["Concentrated Sigils","Quickened Sigils","Sigil of Chains"],
        ["Void Reaver","Demonic","Soul Barrier"],
        ["Last Resort","Ruinous Bulwark","Bulk Extraction"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class AbyssalStrike extends Ability {
    constructor() {
        super("Abyssal Strike", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Infernal Strike creates a Sigil of Flame when you land and its cooldown is reduced by 8 sec."
    }

    setTalent(caster) {
        caster.abilities["Infernal Strike"].cd -= 8
        caster.abilities["Infernal Strike"].maxCd -= 8
    }
    unsetTalent(caster) {
        caster.abilities["Infernal Strike"].cd += 8
        caster.abilities["Infernal Strike"].maxCd += 8
    }
}
//------------------------------------------------
class AgonizingFlames extends Ability {
    constructor() {
        super("Agonizing Flames", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Immolation Aura increases your movement speed by 20% and its duration is increased by 50%."
    }

    setTalent(caster) {
        caster.abilities["Immolation Aura"].effect = [{name:"moveSpeed",val:0.2}]
        caster.abilities["Immolation Aura"].duration *= 1.5
    }
    unsetTalent(caster) {
        caster.abilities["Immolation Aura"].effect = []
        caster.abilities["Immolation Aura"].duration /= 1.5
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
class FeastofSouls extends Ability {
    constructor() {
        super("Feast of Souls", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.54
        this.duration = 6
    }

    getTooltip() {
        return "Soul Cleave heals you for an additional "+spellPowerHotToNumber(this.spellPower)+" over 6 sec."
    }

}
//------------------------------------------------
class Fallout extends Ability {
    constructor() {
        super("Fallout", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Immolation Aura's initial burst has a 60% chance to shatter Lesser Soul Fragments from enemies."
    }

}
//------------------------------------------------
class BurningAlive extends Ability {
    constructor() {
        super("Burning Alive", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Every 2 sec, Fiery Brand spreads to one nearby enemy."
    }

}
//------------------------------------------------------------------------------------------------ROW3
class InfernalArmor extends Ability {
    constructor() {
        super("Infernal Armor", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 6
        this.effect = [{name:"increaseStat",stat:"armor",val:20}]
    }

    getTooltip() {
        return "Immolation Aura increases your armor by 20% and causes melee attackers to suffer (5% of Attack power) Fire damage." //TODO:melee attackers
    }

}
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
