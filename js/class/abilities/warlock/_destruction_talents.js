let _destruction_talents = function(caster) {
    //1
    caster.abilities["Flashover"] = new Flashover()
    caster.abilities["Eradication"] = new Eradication()
    caster.abilities["Soul Fire"] = new SoulFire()

    //2
    caster.abilities["Reverse Entropy"] = new ReverseEntropy()
    caster.abilities["Internal Combustion"] = new InternalCombustion()
    caster.abilities["Shadowburn"] = new Shadowburn()

    //3
    caster.abilities["Demon Skin"] = new DemonSkin()
    caster.abilities["Burning Rush"] = new BurningRush()
    caster.abilities["Dark Pact"] = new DarkPact()

    //4
    caster.abilities["Inferno"] = new Inferno()
    caster.abilities["Fire and Brimstone"] = new FireandBrimstone()
    caster.abilities["Cataclysm"] = new Cataclysm()

    //5
    caster.abilities["Darkfury"] = new Darkfury()
    caster.abilities["Mortal Coil"] = new MortalCoil()
    caster.abilities["Howl of Terror"] = new HowlofTerror()

    //6
    caster.abilities["Roaring Blaze"] = new RoaringBlaze()
    caster.abilities["Rain of Chaos"] = new RainofChaos()
    caster.abilities["Grimoire of Sacrifice"] = new GrimoireofSacrifice()

    //7
    caster.abilities["Soul Conduit"] = new SoulConduit()
    caster.abilities["Channel Demonfire"] = new ChannelDemonfire()
    caster.abilities["Dark Soul: Instability"] = new DarkSoulInstability()

    caster.talents = [["Flashover","Eradication","Soul Fire"],
        ["Reverse Entropy","Internal Combustion","Shadowburn"],
        ["Demon Skin","Burning Rush","Dark Pact"],
        ["Inferno","Fire and Brimstone","Cataclysm"],
        ["Darkfury","Mortal Coil","Howl of Terror"],
        ["Roaring Blaze","Rain of Chaos","Grimoire of Sacrifice"],
        ["Soul Conduit","Channel Demonfire","Dark Soul: Instability"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Flashover extends Ability {
    constructor() {
        super("Flashover", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Conflagrate deals 25% increased damage and grants an additional charge of Backdraft."
    }

    setTalent(caster) {
        caster.abilities["Conflagrate"].spellPower *= 1.25
        caster.abilities["Conflagrate"].maxStacks += 2
        caster.abilities["Conflagrate"].stacks ++
    }
    unsetTalent(caster) {
        caster.abilities["Conflagrate"].spellPower /= 1.25
        caster.abilities["Conflagrate"].maxStacks -= 2
        caster.abilities["Conflagrate"].stacks --
    }

}
//------------------------------------------------
class Eradication extends Ability {
    constructor() {
        super("Eradication", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Chaos Bolt increases the damage you deal to the target by 10% for 7 sec."
    }
}
//------------------------------------------------
class SoulFire extends Ability {
    constructor() {
        super("Soul Fire", 2, 1.5, 4, 45, false, true, false, "fire", 40, 1)
        this.talent = true
        this.secCost = -1
        this.spellPower = 4.2
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Burns the enemy's soul, dealing (420% of Spell power) Fire damage and applying Immolate.\n" +
            "\n" +
            "Generates 1 Soul Shard."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class ReverseEntropy extends Ability {
    constructor() {
        super("Reverse Entropy", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
        this.effect = [{name:"increaseStat",stat:"haste",val:15}]
    }

    getTooltip() {//2.5 procs per minute
        return "Your spells have a chance to grant you 15% Haste for 8 sec."
    }
}
//------------------------------------------------
class InternalCombustion extends Ability {
    constructor() {
        super("Internal Combustion", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Chaos Bolt consumes up to 5 sec of Immolate's damage over time effect on your target, instantly dealing that much damage."
    }
}
//------------------------------------------------
class Shadowburn extends Ability {
    constructor() {
        super("Shadowburn", 0, 1.5, 0, 12, false, true, false, "shadow", 40, 2)
        this.talent = true
        this.secCost = 1
        this.spellPower = 1.6
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Blasts a target for (160% of Spell power) Shadowflame damage, gaining 50% critical strike chance on targets that have 20% or less health.\n" +
            "\n" +
            "Restores 1 Soul Shard and refunds a charge if the target dies within 5 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW3
class DemonSkin extends Ability {
    constructor() {
        super("Demon Skin", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Your Soul Leech absorption now passively recharges at a rate of 0.5% of maximum health every 1 sec, and may now absorb up to 15% of maximum health."
    }
}
//------------------------------------------------
class BurningRush extends Ability {
    constructor() {
        super("Burning Rush", 0, 1.5, 0, 0, false, false, false, "fire", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"moveSpeed",val:0.5}]
    }

    getTooltip() {
        return "Increases your movement speed by 50%, but also damages you for 4% of your maximum health every 1 sec. Movement impairing effects may not reduce you below 100% of normal movement speed. Lasts until canceled."
    }

    getBuffTooltip(caster, target, buff) {
        return "Movement speed increased by 50%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (!checkBuff(caster,caster,"Burning Rush",true)) {
                applyBuff(caster,caster,this)
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    runBuff(caster, buff, id) {
        caster.health -= caster.maxHealth*0.04*progressInSec
        if (caster.health<0.04) {
            buff.duration = -1
        }
    }
}
//------------------------------------------------
class DarkPact extends Ability {
    constructor() {
        super("Dark Pact", 0, 0, 0, 60, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Sacrifices 20% of your current health to shield you for 250% of the sacrificed health plus an additional (Spell power * 5) for 20 sec. Usable while suffering from control impairing effects."
    }
}
//------------------------------------------------------------------------------------------------ROW4
class Inferno extends Ability {
    constructor() {
        super("Inferno", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Rain of Fire damage is increased by 20% and has a 20% chance to generate a Soul Shard Fragment."
    }
}
//------------------------------------------------
class FireandBrimstone extends Ability {
    constructor() {
        super("Fire and Brimstone", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Incinerate now also hits all enemies near your target for 40% damage and generates 2 Soul Shard Fragment for each additional enemy hit."
    }
}
//------------------------------------------------
class Cataclysm extends Ability {
    constructor() {
        super("Cataclysm", 1, 1.5, 2, 30, false, false, false, "fire", 40, 1)
        this.talent = true
        this.talentSelect = true

        this.spellPower = 1.8
        this.secCost = 3

        this.area = {type:"circle", radius:8, duration: 0.5,data:{type:"cataclysm", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#ff5401",color2:"rgba(214,74,0,0.14)"},cast:false}
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Calls forth a cataclysm at the target location, dealing "+spellPowerToNumber(this.spellPower)+" Shadowflame damage to all enemies within 8 yards and afflicting them with Immolate."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)
        this.setCd()
        caster.useEnergy(this.cost)
    }

}
//------------------------------------------------------------------------------------------------ROW5
class Darkfury extends Ability {
    constructor() {
        super("Darkfury", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Reduces the cooldown of Shadowfury by 15 sec and increases its radius by 2 yards."
    }
}
//------------------------------------------------
class MortalCoil extends Ability {
    constructor() {
        super("Mortal Coil", 2, 1.5, 0, 45, false, false, false, "shadow", 20, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Horrifies an enemy target into fleeing, incapacitating for 3 sec and healing you for 20% of maximum health."
    }
}
//------------------------------------------------
class HowlofTerror extends Ability {
    constructor() {
        super("Howl of Terror", 0, 0, 0, 40, false, false, false, "shadow", 5, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Let loose a terrifying howl, causing 5 enemies within 10 yds to flee in fear, disorienting them for 20 sec. Damage may cancel the effect."
    }
}
//------------------------------------------------------------------------------------------------ROW6
class RoaringBlaze extends Ability {
    constructor() {
        super("Roaring Blaze", 0, 0, 0, 0, false, false, false, "fire", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
    }

    getTooltip() {//TODO:Soul Fire, Channel Demonfire
        return "Conflagrate increases your Immolate, Incinerate, and Conflagrate damage to the target by 25% for 8 sec."
    }
}
//------------------------------------------------
class RainofChaos extends Ability {
    constructor() {
        super("Rain of Chaos", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//While your initial Infernal is active, every Soul Shard you spend has a 15% chance to summon an additional Infernal that lasts 8 sec."
    }
}
//------------------------------------------------
class GrimoireofSacrifice extends Ability {
    constructor() {
        super("Grimoire of Sacrifice", 0, 1.5, 0, 30, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() {//TODO:20ppm
        return "//NOT IMPLEMENTED//Sacrifices your demon pet for power, gaining its command demon ability, and causing your spells to sometimes also deal (43.75% of Spell power) additional Shadow damage.\n" +
            "\n" +
            "Lasts 1 hour or until you summon a demon pet.\n"
    }
}
//------------------------------------------------------------------------------------------------ROW7
class SoulConduit extends Ability {
    constructor() {
        super("Soul Conduit", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Every Soul Shard you spend has a 15% chance to be refunded."
    }
}
//------------------------------------------------
class ChannelDemonfire extends Ability {
    constructor() {
        super("Channel Demonfire", 1.5, 1.5, 3, 25, false, false, false, "fire", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Launches 15 bolts of felfire over 3 sec at random targets afflicted by your Immolate within 40 yds. Each bolt deals (19.36% of Spell power) Fire damage to the target and (7.7% of Spell power) Fire damage to nearby enemies."
    }
}
//------------------------------------------------
class DarkSoulInstability extends Ability {
    constructor() {
        super("Dark Soul: Instability", 1, 0, 0, 120, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 20
        this.effect = [{name:"increaseStat",stat:"crit",val:30}]
        this.noGcd = true
    }

    getTooltip() {
        return "Infuses your soul with unstable power, increasing your critical strike chance by 30% for 20 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Critical strike chance increased by 30%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}