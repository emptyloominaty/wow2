let _assassination_talents = function(caster) {
    //1
    caster.abilities["Master Poisoner"] = new MasterPoisoner()
    caster.abilities["Elaborate Planning"] = new ElaboratePlanning()
    caster.abilities["Blindside"] = new Blindside()

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

    caster.talents = [["Master Poisoner","Elaborate Planning","Blindside"],
        ["Nightstalker","Subterfuge","Master Assassin"],
        ["Vigor","Deeper Stratagem","Marked for Death"],
        ["Leeching Poison","Cheat Death","Elusiveness"],
        ["Internal Bleeding","Iron Wire","Prey on the Weak"],
        ["Venom Rush","Alacrity","Exsanguinate"],
        ["Poison Bomb","Hidden Blades","Crimson Tempest"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class MasterPoisoner extends Ability {
    constructor() {
        super("Master Poisoner", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Increases the damage done by your weapon poisons by 30% and their non-damaging effects by 20%."
    }

    setTalent(caster) {
        caster.abilities["Deadly Poison"].effectValue.spellPower *= 1.3
        caster.abilities["Deadly Poison"].spellPower *= 1.3
        caster.abilities["Deadly Poison"].effectValue.spellPowerDot *= 1.3
        caster.abilities["Deadly Poison"].spellPowerDot *= 1.3
    }

    unsetTalent(caster) {
        caster.abilities["Deadly Poison"].effectValue.spellPower /= 1.3
        caster.abilities["Deadly Poison"].spellPower /= 1.3
        caster.abilities["Deadly Poison"].effectValue.spellPowerDot /= 1.3
        caster.abilities["Deadly Poison"].spellPowerDot /= 1.3
    }
}
//------------------------------------------------
class ElaboratePlanning extends Ability {
    constructor() {
        super("Elaborate Planning", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"increaseDamage",val:0.1}]
        this.duration = 4
    }
    //TODO: CrimsonTempest
    getTooltip() {
        return "Your finishing moves grant 10% increased damage done for 4 sec."
    }
}
//------------------------------------------------
class Blindside extends Ability {
    constructor() {
        super("Blindside", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 10
    }

    getTooltip() {
        return "Mutilate has a 20% chance to make your next Ambush free and usable without Stealth. Chance increased to 40% if the target is under 35% health."
    }

    endBuff(caster) {
        caster.abilities["Ambush"].canUseWithoutStealth = false
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
