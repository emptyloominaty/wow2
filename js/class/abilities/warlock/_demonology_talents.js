let _demonology_talents = function(caster) {
    //1
    caster.abilities["Dreadlash"] = new Dreadlash()
    caster.abilities["Bilescourge Bombers"] = new BilescourgeBombers()
    caster.abilities["Demonic Strength"] = new DemonicStrength()

    //2
    caster.abilities["Demonic Calling"] = new DemonicCalling()
    caster.abilities["Power Siphon"] = new PowerSiphon()
    caster.abilities["Doom"] = new Doom()

    //3
    caster.abilities["Demon Skin"] = new DemonSkin()
    caster.abilities["Burning Rush"] = new BurningRush()
    caster.abilities["Dark Pact"] = new DarkPact()

    //4
    caster.abilities["From the Shadows"] = new FromtheShadows()
    caster.abilities["Soul Strike"] = new SoulStrike()
    caster.abilities["Summon Vilefiend"] = new SummonVilefiend()

    //5
    caster.abilities["Darkfury"] = new Darkfury()
    caster.abilities["Mortal Coil"] = new MortalCoil()
    caster.abilities["Howl of Terror"] = new HowlofTerror()

    //6
    caster.abilities["Soul Conduit"] = new SoulConduit()
    caster.abilities["Inner Demons"] = new InnerDemons()
    caster.abilities["Grimoire: Felguard"] = new GrimoireFelguard()

    //7
    caster.abilities["Sacrificed Souls"] = new SacrificedSouls()
    caster.abilities["Demonic Consumption"] = new DemonicConsumption()
    caster.abilities["Nether Portal"] = new NetherPortal()


    caster.talents = [["Dreadlash","Bilescourge Bombers","Demonic Strength"],
        ["Demonic Calling","Power Siphon","Doom"],
        ["Demon Skin","Burning Rush","Dark Pact"],
        ["From the Shadows","Soul Strike","Summon Vilefiend"],
        ["Darkfury","Mortal Coil","Howl of Terror"],
        ["Soul Conduit","Inner Demons","Grimoire: Felguard"],
        ["Sacrificed Souls","Demonic Consumption","Nether Portal"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Dreadlash extends Ability {
    constructor() {
        super("Dreadlash", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//When your Dreadstalkers charge into battle, their Dreadbite attack now hits all targets within 8 yards and deals 25% more damage."
    }
}
//------------------------------------------------
class BilescourgeBombers extends Ability {
    constructor() {
        super("Bilescourge Bombers", 0, 1.5, 0, 30, false, false, false, "physical", 40, 1)
        this.talent = true
        this.secCost = 2
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Tear open a portal to the nether above the target location, from which several Bilescourge will pour out of and crash into the ground over 6 sec, dealing (23% of Spell power) Shadow damage to all enemies within 8 yards.."
    }
}
//------------------------------------------------
class DemonicStrength extends Ability {
    constructor() {
        super("Demonic Strength", 0, 1.5, 0, 60, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Infuse your Felguard with demonic strength and command it to charge your target and unleash a Felstorm that will deal 400% increased damage."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class DemonicCalling extends Ability {
    constructor() {
        super("Demonic Calling", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Shadow Bolt and Demonbolt have has a 20% chance to make your next Call Dreadstalkers cost 2 fewer Soul Shards and have no cast time."
    }
}
//------------------------------------------------
class PowerSiphon extends Ability {
    constructor() {
        super("Power Siphon", 0, 1.5, 0, 30, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Instantly sacrifice up to 2 Wild Imps, generating 2 charges of Demonic Core that cause Demonbolt to deal 30% additional damage."
    }
}
//------------------------------------------------
class Doom extends Ability {
    constructor() {
        super("Doom", 1, 1.5, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
        this.secCost = -1
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Inflicts impending doom upon the target, causing (175% of Spell power) Shadow damage after 20 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class FromtheShadows extends Ability {
    constructor() {
        super("From the Shadows", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Dreadbite causes the target to take 20% additional Shadowflame damage from you for the next 12 sec."
    }
}
//------------------------------------------------
class SoulStrike extends Ability {
    constructor() {
        super("Soul Strike", 1, 1.5, 0, 10, false, false, false, "shadow", 50, 1)
        this.talent = true
        this.secCost = -1
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Command your Felguard to strike into the soul of its enemy, dealing [.575 * (Spell power * 1) * 1 * 1 * (1 + Versatility)] Shadow damage.<br><br>" +
            "Generates 1 Soul Shard."
    }
}
//------------------------------------------------
class SummonVilefiend extends Ability {
    constructor() {
        super("Summon Vilefiend", 0, 1.5, 2, 45, false, true, false, "fire", 40, 1)
        this.talent = true
        this.secCost = 1
    }

    //Bile Spit 68% | 20% over 20s (nature)
    //Auto Attack
    //Headbutt (136% physical)
    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Summon a Vilefiend to fight for you for the next 15 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
class InnerDemons extends Ability {
    constructor() {
        super("Inner Demons", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//You passively summon a Wild Imp to fight for you every 12 sec, and have a 10% chance to also summon an additional Demon to fight for you for 15 sec."
    }
}
//------------------------------------------------
class GrimoireFelguard extends Ability {
    constructor() {
        super("Grimoire: Felguard", 0, 1.5, 0, 120, false, false, false, "shadow", 40, 1)
        this.talent = true
        this.secCost = 1
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Summons a Felguard who attacks the target for 17 sec that deals 25% increased damage.<br>" +
            "This Felguard will stun their target when summoned."
    }
}
//------------------------------------------------------------------------------------------------ROW7
class SacrificedSouls extends Ability {
    constructor() {
        super("Sacrificed Souls", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Shadow Bolt and Demonbolt deal 4% additional damage per demon you have summoned."
    }
}
//------------------------------------------------
class DemonicConsumption extends Ability {
    constructor() {
        super("Demonic Consumption", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Your Demon Commander now drains 12% of the life from your demon servants to empower himself."
    }
}
//------------------------------------------------
class NetherPortal extends Ability {
    constructor() {
        super("Nether Portal", 0, 1.5, 2.5, 150, false, false, false, "shadow", 40, 1)
        this.talent = true
        this.secCost = 1
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Tear open a portal to the Twisting Nether for 15 sec. Every time you spend Soul Shards, you will also command demons from the Nether to come out and fight for you."
    }
}