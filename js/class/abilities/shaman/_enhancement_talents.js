let _enhancement_talents = function(caster) {
    //1
    caster.abilities["Lashing Flames"] = new LashingFlames()
    caster.abilities["Forceful Winds"] = new ForcefulWinds()
    caster.abilities["Elemental Blast"] = new ElementalBlast(true)
    caster.abilities["Elemental Blast"].talentSelect = true

    //2
    caster.abilities["Stormflurry"] = new Stormflurry()
    caster.abilities["Hot Hand"] = new HotHand()
    caster.abilities["Ice Strike"] = new IceStrike()

    //3
    caster.abilities["Spirit Wolf"] = new SpiritWolf()
    caster.abilities["Earth Shield"] = new EarthShield()
    caster.abilities["Static Charge"] = new StaticCharge()

    //4
    caster.abilities["Elemental Assault"] = new ElementalAssault()
    caster.abilities["Hailstorm"] = new Hailstorm()
    caster.abilities["Fire Nova"] = new FireNova()

    //5
    caster.abilities["Nature's Guardian"] = new NaturesGuardian()
    caster.abilities["Feral Lunge"] = new FeralLunge()
    caster.abilities["Wind Rush Totem"] = new WindRushTotem()

    //6
    caster.abilities["Crashing Storm"] = new CrashingStorm()
    caster.abilities["Stormkeeper"] = new StormkeeperEnh()
    caster.abilities["Sundering"] = new Sundering()

    //7
    caster.abilities["Elemental Spirits"] = new ElementalSpirits()
    caster.abilities["Earthen Spike"] = new EarthenSpike()
    caster.abilities["Ascendance"] = new AscendanceEnh()


    caster.talents = [["Lashing Flames","Forceful Winds","Elemental Blast"],
        ["Stormflurry","Hot Hand","Ice Strike"],
        ["Spirit Wolf","Earth Shield","Static Charge"],
        ["Elemental Assault","Hailstorm","Fire Nova"],
        ["Nature's Guardian","Feral Lunge","Wind Rush Totem"],
        ["Crashing Storm","Stormkeeper","Sundering"],
        ["Elemental Spirits","Earthen Spike","Ascendance"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class LashingFlames extends Ability {
    constructor() {
        super("Lashing Flames", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Lava Lash now increases the damage of Flame Shock on its target by 100% for 20 sec."
    }

}
//------------------------------------------------
class ForcefulWinds extends Ability {
    constructor() {
        super("Forceful Winds", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Windfury causes each successive Windfury attack within 15 sec to increase the damage of Windfury by 35%, stacking up to 5 times."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
class Stormflurry extends Ability {
    constructor() {
        super("Stormflurry", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Stormstrike has a 25% chance to strike the target an additional time for 40% of normal damage. This effect can chain off of itself."
    }

}
//------------------------------------------------
class HotHand extends Ability {
    constructor() {
        super("Hot Hand", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
    }

    getTooltip() {
        return "Melee auto-attacks with Flametongue Weapon active have a 5% chance to reduce the cooldown of Lava Lash by 75% and increase the damage of Lava Lash by 100% for 8 sec."
    }

}
//------------------------------------------------
class IceStrike extends Ability {
    constructor() {
        super("Ice Strike", 3.3, 1.5, 0, 15, false, false, false, "frost", 5, 1)
        this.talent = true
        this.duration = 6
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//Strike your target with an icy blade, dealing (115% of Attack power) Frost damage and snaring them by 50% for 6 sec.<br>" +
            "<br>" +
            "Successful Ice Strikes reset the cooldown of your Flame Shock and Frost Shock spells."
    }

}
//------------------------------------------------------------------------------------------------ROW4
class ElementalAssault extends Ability {
    constructor() {
        super("Elemental Assault", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Stormstrike damage is increased by 15%, and Stormstrike now generates 1 stack of Maelstrom Weapon."
    }


}
//------------------------------------------------
class Hailstorm extends Ability {
    constructor() {
        super("Hailstorm", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Each stack of Maelstrom Weapon consumed increases the damage of your next Frost Shock by 15%, and causes your next Frost Shock to hit 1 additional target per Maelstrom Weapon stack consumed."
    }


}
//------------------------------------------------
class FireNova extends Ability {
    constructor() {
        super("Fire Nova", 1, 1.5, 0, 15, false, false, false, "fire", 5, 1)
        this.talent = true
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//Erupt a burst of fiery damage from all targets affected by your Flame Shock, dealing (42% of Attack power) Fire damage to up to 6 targets within 8 yds of your Flame Shock targets."
    }
}
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
class FeralLunge extends Ability {
    constructor() {
        super("Feral Lunge", 0, 0.5, 0, 30, false, false, false, "physical", 25, 1)
        this.talent = true
        this.minRange = 8
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//Lunge at your enemy as a ghostly wolf, biting them to deal (9% of Attack power) Physical damage."

    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class CrashingStorm extends Ability {
    constructor() {
        super("Crashing Storm", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Crash Lightning also electrifies the ground, leaving an electrical field behind which damages enemies within it for [7 * (2.688% of Attack power)] Nature damage over 6 sec."
    }

}
//------------------------------------------------
class StormkeeperEnh extends Ability {
    constructor() {
        super("Stormkeeper", 0, 1.5, 1.5, 60, false, true, false, "physical", 5, 1)
             this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Charge yourself with lightning, causing your next 2 Chain Lightnings to deal 300% more damage and be instant cast."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next Chain Lightning will deal 300% increased damage and be instant cast."
    }

}
//------------------------------------------------
class Sundering extends Ability {
    constructor() {
        super("Sundering", 6, 1.5, 0, 40, false, false, false, "fire", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1.4
        this.duration = 2
        this.effect = [{name:"incapacitate"}]
    }

    getTooltip() {
        return "Shatters a line of earth in front of you with your main hand weapon, causing "+spellPowerToNumber(this.spellPower)+" Flamestrike damage and Incapacitating any enemy hit for 2 sec."
    }
    startCast(caster) {
        if (this.checkStart(caster)) {
            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                        applyDebuff(caster, targets[i], this)
                    }
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW7
class ElementalSpirits extends Ability {
    constructor() {
        super("Elemental Spirits", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    //TODO:Molten Weapon:: FlametongueWeapon, LavaLash, Sundering, ElementalBlast, FlameShock, FlameShockDirect, FireNova +20% dmg
    //TODO:Crackling Surge:: StormstrikeMain, StormstrikeOff, Windfury, WindstrikeMain, WindstrikeOff +35% dmg
    //TODO:Frost:: AutoAttackMainEnhance, AutoAttackOffEnhance +21% dmg

    getTooltip() { //TODO:causes your Feral Spirits to be imbued with Fire, Frost, or Lightning, enhancing your abilities."
        return "Reduces the cooldown of Feral Spirit by 30 sec and causes your Feral Spirits to be imbued with Fire, Frost, or Lightning, enhancing your abilities."
    }

    setTalent(caster) {
        caster.abilities["Feral Spirit"].cd -= 30
    }

    unsetTalent(caster) {
        caster.abilities["Feral Spirit"].cd += 30
    }

}
//------------------------------------------------
class EarthenSpike extends Ability {
    constructor() {
        super("Earthen Spike", 3.75, 1.5, 0, 20, false, false, false, "physical", 10, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Summons an Earthen Spike under an enemy, dealing (108% of Attack power) Physical damage and increasing Physical and Nature damage you deal to the target by 20% for 10 sec."
    }

}
//------------------------------------------------
class AscendanceEnh extends Ability {
    constructor() {
        super("Ascendance", 0, 1.5, 0, 180, false, false, false, "physical", 10, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Transform into an Air Ascendant for 15 sec, immediately dealing (250% of Attack power) Nature damage to any enemy within 8 yds," +
            " reducing the cooldown and cost of Stormstrike by 66%, and transforming your auto attack and Stormstrike into Wind attacks which bypass armor and have a 30 yd range."
    }

    //Windstrike
    //9sec cd
    //Hurl a staggering blast of wind at an enemy, dealing a total of [(107.4% of Attack power)% + (107.4% of Attack power)%] Physical damage, bypassing armor.
    //30yards
    //
}