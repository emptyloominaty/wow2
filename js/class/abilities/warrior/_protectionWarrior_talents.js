let _protectionWarrior_talents = function(caster) {
    //1
    caster.abilities["War Machine"] = new WarMachine()
    caster.abilities["Punish"] = new Punish()
    caster.abilities["Devastator"] = new Devastator()

    //2
    caster.abilities["Double Time"] = new DoubleTime()
    caster.abilities["Rumbling Earth"] = new RumblingEarth()
    caster.abilities["Storm Bolt"] = new StormBolt()

    //3
    caster.abilities["Best Served Cold"] = new BestServedCold()
    caster.abilities["Booming Voice"] = new BoomingVoice()
    caster.abilities["Dragon Roar"] = new DragonRoar()

    //4
    caster.abilities["Crackling Thunder"] = new CracklingThunder()
    caster.abilities["Bounding Stride"] = new BoundingStride()
    caster.abilities["Menace"] = new Menace()

    //5
    caster.abilities["Never Surrender"] = new NeverSurrender()
    caster.abilities["Indomitable"] = new Indomitable()
    caster.abilities["Impending Victory"] = new ImpendingVictory()

    //6
    caster.abilities["Into the Fray"] = new IntotheFray()
    caster.abilities["Unstoppable Force"] = new UnstoppableForce()
    caster.abilities["Ravager"] = new Ravager()

    //7
    caster.abilities["Anger Management"] = new AngerManagement()
    caster.abilities["Heavy Repercussions"] = new HeavyRepercussions()
    caster.abilities["Bolster"] = new Bolster()

    caster.talents = [["War Machine","Punish","Devastator"],
        ["Double Time","Rumbling Earth","Storm Bolt"],
        ["Best Served Cold","Booming Voice","Dragon Roar"],
        ["Crackling Thunder","Bounding Stride","Menace"],
        ["Never Surrender","Indomitable","Impending Victory"],
        ["Into the Fray","Unstoppable Force","Ravager"],
        ["Anger Management","Heavy Repercussions","Bolster"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
//------------------------------------------------
class Punish extends Ability {
    constructor() {
        super("Punish", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 9
        this.effect = [{name:"reduceDamage",val:0.03}]
    }

    getTooltip() {
        return "Shield Slam deals 20% increased damage, and reduces enemies' damage by 3% for 9 sec."
    }

}
//------------------------------------------------
class Devastator extends Ability {
    constructor() {
        super("Devastator", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.221
    }

    getTooltip() { //Replaces Devastate
        return "Your auto attacks deal an additional "+spellPowerToNumber(this.spellPower)+" Physical damage and have a 20% chance to reset the remaining cooldown on Shield Slam."
    }

    setTalent(caster) {
        caster.abilities["Devastate"].canUse = false
    }
    unsetTalent(caster) {
        caster.abilities["Devastate"].canUse = true
    }
}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
class RumblingEarth extends Ability {
    constructor() {
        super("Rumbling Earth", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//When Shockwave strikes at least 3 targets, its cooldown is reduced by 15 sec."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
class BestServedCold extends Ability {
    constructor() {
        super("Best Served Cold", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Revenge deals 20% more damage, or 50% more damage when your successful dodges or parries have made it cost no Rage."
    }

}
//------------------------------------------------
class BoomingVoice extends Ability {
    constructor() {
        super("Booming Voice", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Demoralizing Shout also generates 40 Rage, and increases damage you deal to affected targets by 20%."
    }

    setTalent(caster) {
        caster.abilities["Demoralizing Shout"].cost -= 40
    }
    unsetTalent(caster) {
        caster.abilities["Demoralizing Shout"].cost += 40
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
class CracklingThunder extends Ability {
    constructor() {
        super("Crackling Thunder", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Thunder Clap's radius is increased by 50%, and it reduces movement speed by an additional 10%."
    }

    setTalent(caster) {
        caster.abilities["Thunder Clap"].range *= 1.5
        caster.abilities["Thunder Clap"].effect[0].val += 0.1
    }
    unsetTalent(caster) {
        caster.abilities["Thunder Clap"].range /= 1.5
        caster.abilities["Thunder Clap"].effect[0].val -= 0.1
    }
}
//------------------------------------------------
//------------------------------------------------
class Menace extends Ability {
    constructor() {
        super("Menace", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Intimidating Shout will knock back all nearby enemies except your primary target, and cause them all to cower in fear for 15 sec instead of fleeing."
    }

}
//------------------------------------------------------------------------------------------------ROW5
class NeverSurrender extends Ability {
    constructor() {
        super("Never Surrender", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Ignore Pain prevents 40% to 100% more damage, based on your missing health."
    }

}
//------------------------------------------------
class Indomitable extends Ability {
    constructor() {
        super("Indomitable", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"increaseHealth",val:0.1}]
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Your maximum health is increased by 10%, and every 10 Rage you spend heals you for 1% of your maximum health."
    }

    setTalent(caster) {
        applyBuff(caster,caster,this)
        caster.health += (caster.stats.stamina*20) * 0.1
    }

    unsetTalent(caster) {
        checkBuff(caster,caster,"Indomitable",true)
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class IntotheFray extends Ability {
    constructor() {
        super("Into the Fray", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"increaseStat",stat:"haste",val:2}]
        this.maxStacks = 5
        this.duration = 10
        this.permanentBuff = true
    }

    getTooltip() {
        return "You gain 2% Haste for each enemy or ally within 10 yards, up to 10% Haste."
    }

    setTalent(caster) {
        applyBuff(caster,caster,this)
    }

    unsetTalent(caster) {
        checkBuff(caster,caster,"Into the Fray",true)
    }

    runBuff(caster, buff, id = 0) {
        let stacks = 0
        for (let i = 0; i<creatures.length; i++) {
            if (!creatures[i].isDead && this.checkDistance(caster,creatures[i],10,true)) {
                stacks++
                if (stacks>=5) {
                    break
                }
            }
        }
        buff.stacks = stacks
    }

}
//------------------------------------------------
class UnstoppableForce extends Ability {
    constructor() {
        super("Unstoppable Force", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Avatar increases the damage of Thunder Clap by 30%, and reduces its cooldown by 50%."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
class HeavyRepercussions extends Ability {
    constructor() {
        super("Heavy Repercussions", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Shield Slam generates 3 more Rage and extends the duration of Shield Block by 1.0 sec."
    }

}
//------------------------------------------------
class Bolster extends Ability {
    constructor() {
        super("Bolster", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Last Stand's cooldown is reduced by 1 min, and it grants you the Shield Block effect for its duration."
    }

    setTalent(caster) {
        caster.abilities["Last Stand"].cd -= 60
        caster.abilities["Last Stand"].maxCd -= 60
    }
    unsetTalent(caster) {
        caster.abilities["Last Stand"].cd += 60
        caster.abilities["Last Stand"].maxCd += 60
    }

}