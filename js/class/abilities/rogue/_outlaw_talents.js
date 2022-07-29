let _outlaw_talents = function(caster) {
    //1
    caster.abilities["Weaponmaster"] = new Weaponmaster()
    caster.abilities["Quick Draw"] = new QuickDraw()
    caster.abilities["GhostlyStrike"] = new GhostlyStrike()

    //2
    caster.abilities["Acrobatic Strikes"] = new AcrobaticStrikes()
    caster.abilities["Retractable Hook"] = new RetractableHook()
    caster.abilities["Hit and Run"] = new HitandRun()

    //3
    caster.abilities["Vigor"] = new Vigor()
    caster.abilities["Deeper Stratagem"] = new DeeperStratagem()
    caster.abilities["Marked for Death"] = new MarkedforDeath()

    //4
    caster.abilities["Iron Stomach"] = new IronStomach()
    caster.abilities["Cheat Death"] = new CheatDeath()
    caster.abilities["Elusiveness"] = new Elusiveness()

    //5
    caster.abilities["Dirty Tricks"] = new DirtyTricks()
    caster.abilities["Blinding Powder"] = new BlindingPowder()
    caster.abilities["Prey on the Weak"] = new PreyontheWeak()

    //6
    caster.abilities["Loaded Dice"] = new LoadedDice()
    caster.abilities["Alacrity"] = new Alacrity()
    caster.abilities["Dreadblades"] = new Dreadblades()

    //7
    caster.abilities["Dancing Steel"] = new DancingSteel()
    caster.abilities["Blade Rush"] = new BladeRush()
    caster.abilities["Killing Spree"] = new KillingSpree()


    caster.talents = [["Weaponmaster","Quick Draw","Ghostly Strike"],
        ["Acrobatic Strikes","Retractable Hook","Hit and Run"],
        ["Vigor","Deeper Stratagem","Marked for Death"],
        ["Iron Stomach","Cheat Death","Elusiveness"],
        ["Dirty Tricks","Blinding Powder","Prey on the Weak"],
        ["Loaded Dice","Alacrity","Dreadblades"],
        ["Dancing Steel","Blade Rush","Killing Spree"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Weaponmaster extends Ability {
    constructor() {
        super("Weaponmaster", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Sinister Strike has a 10% increased chance to strike an additional time."
    }

}
//------------------------------------------------
class QuickDraw extends Ability {
    constructor() {
        super("Quick Draw", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Half-cost uses of Pistol Shot granted by Sinister Strike now generate 1 additional combo point, and deal 50% additional damage."
    }

}
//------------------------------------------------
class GhostlyStrike extends Ability {
    constructor() {
        super("Ghostly Strike", 30, 1, 0, 35, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() {
        return "Strikes an enemy, dealing (80% of Attack power) Physical damage and causing the target to take 10% increased damage from your abilities for 10 sec.\n" +
            "\n" +
            "Awards 1 combo point."
    }

}
//------------------------------------------------------------------------------------------------ROW2
class AcrobaticStrikes extends Ability {
    constructor() {
        super("Acrobatic Strikes", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Increases the range on all your melee attacks by 3 yards." //TODO: melee
    }

    setTalent(caster) {
        Object.keys(caster.abilities).forEach((key)=> {
            caster.abilities[key].range += 3
        })
    }
    unsetTalent(caster) {
        Object.keys(this.abilities).forEach((key)=> {
            caster.abilities[key].range -= 3
        })
    }
}
//------------------------------------------------
class RetractableHook extends Ability {
    constructor() {
        super("Retractable Hook", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:retraction speed
        return "Reduces the cooldown of Grappling Hook by 15 sec, and increases its retraction speed."
    }
    setTalent(caster) {
        caster.abilities["Grappling Hook"].cd -= 15
        caster.abilities["Grappling Hook"].maxCd -= 15
    }
    unsetTalent(caster) {
        caster.abilities["Grappling Hook"].cd += 15
        caster.abilities["Grappling Hook"].maxCd += 15
    }
}
//------------------------------------------------
class HitandRun extends Ability {
    constructor() {
        super("Hit and Run", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
        this.effect = [{name:"moveSpeed",val:0.15}]
    }

    getTooltip() {
        return "Increases your movement speed at all times by 15%."
    }

    setTalent(caster) {
        applyBuff(caster,caster,this)
    }
    unsetTalent(caster) {
        checkBuff(caster,caster,"Hit and Run",true)
    }
}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class IronStomach extends Ability {
    constructor() {
        super("Iron Stomach", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Increases the healing you receive from Crimson Vial, healing potions, and healthstones by 30%."
    }
}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
class DirtyTricks extends Ability {
    constructor() {
        super("Dirty Tricks", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:Gouge, Sap
        return "//NOT IMPLEMENTED//Cheap Shot, Gouge and Sap no longer cost Energy."
    }
}
//------------------------------------------------
class BlindingPowder extends Ability {
    constructor() {
        super("Blinding Powder", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Reduces the cooldown of Blind by 30 sec and increases its range by 15 yds."
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class LoadedDice extends Ability {
    constructor() {
        super("Loaded Dice", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Activating Adrenaline Rush causes your next Roll the Bones to grant at least two matches."
    }
}
//------------------------------------------------
//------------------------------------------------
class Dreadblades extends Ability {
    constructor() {
        super("Dreadblades", 30, 1, 0, 90, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Strike at an enemy, dealing (120% of Attack power) Physical damage, filling your combo points, and empowering your weapons for 10 sec, causing your Sinister Strike," +
            "Ambush, and Pistol Shot to fill your combo points, but your finishing moves consume 5% of your current health."
    }
}
//------------------------------------------------------------------------------------------------ROW7
class DancingSteel extends Ability {
    constructor() {
        super("Dancing Steel", 30, 1, 0, 90, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() {
        return "Increases the duration of Blade Flurry by 3 sec and its damage by 5%."
    }
    setTalent(caster) {
        caster.abilities["Blade Flurry"].damage += 0.05
        caster.abilities["Blade Flurry"].duration += 3
    }
    unsetTalent(caster) {
        caster.abilities["Blade Flurry"].damage -= 0.05
        caster.abilities["Blade Flurry"].duration -= 3
    }

}
//------------------------------------------------
class BladeRush extends Ability {
    constructor() {
        super("Blade Rush", -25, 1, 0, 45, false, false, false, "physical", 20, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1.2
        this.spellPowerAoe = 0.6

        this.effect = [{name:"moveToTarget",val:7,target:0}]
        this.duration = 1
        this.caster = {}
        this.canCastWhileRooted = false
    }

    getTooltip() {//TODO: 25 ENERGY OVER 5 SEC
        return "Charge to your target with your blades out, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage to the target and "+spellPowerToNumber(this.spellPowerAoe)+" to all other nearby enemies.<br>" +
            "<br>" +
            "While Blade Flurry is active, damage to non-primary targets is increased by 100%.<br>" +
            "<br>" +
            "Generates 25 Energy over 5 sec."
    }


    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && !caster.castTarget.isDead && this.checkDistance(caster,caster.castTarget)) {

                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.isRolling = true
                this.caster = caster
                this.effect[0].target = caster.castTarget.id
                caster.abilities["Blade Flurry"].damage += 0.6
                applyBuff(caster,caster,this)
                this.setCd()
                caster.useEnergy(this.cost, this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster) {
        doDamage(caster, creatures[this.effect[0].target], this)
        caster.abilities["Blade Flurry"].damage -= 0.6
        for (let i = 0; i < enemies.length; i++) {
            if (!enemies[i].isDead && enemies[i]!==creatures[this.effect[0].target] && this.checkDistance(caster, enemies[i])) {
                doDamage(caster, enemies[i], this, undefined, this.spellPowerAoe)
            }
        }

        caster.isRolling = false
    }

}
//------------------------------------------------
class KillingSpree extends Ability {
    constructor() {
        super("Killing Spree", 30, 1, 0, 120, false, false, false, "physical", 10, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Teleport to an enemy within 10 yards, attacking with both weapons for a total of [(32% of Attack power) * 6 + (64% of Attack power) * 6] Physical damage over 2 sec.\n" +
            "\n" +
            "While Blade Flurry is active, also hits up to 4 nearby enemies for 100% damage."
    }

}