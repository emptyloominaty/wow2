class FrostMage_Abilities {
    "Arcane Intellect" = new ArcaneIntellect()
    "Alter Time" = new AlterTime()
    "Time Warp" = new TimeWarp()
    "Counterspell" = new Counterspell()
    "Remove Curse" = new RemoveCurse()
    "Slow" = new Slow()
    "Frost Nova" = new FrostNova()
    "Ice Block" = new IceBlock()
    "Polymorph" = new Polymorph()
    "Blink" = new Blink()
    "Mirror Image" = new MirrorImage()
    "Spellsteal" = new Spellsteal()
    "Greater Invisibility" = new GreaterInvisibility() //TODO: Invisiblity 5min cd Turns you invisible over 3 sec, reducing threat each second. While invisible, you are untargetable by enemies. Lasts 20 sec. Taking any action cancels the effect.
    "Frostbolt" = new Frostbolt()
    "Ice Lance" = new IceLance()
    "Flurry" = new Flurry()
    "Cone of Cold" = new ConeofCold()
    "Icy Veins" = new IcyVeins()
    "Frozen Orb" = new FrozenOrb()
    "Blizzard" = new Blizzard()
    "Ice Barrier" = new IceBarrier()
    "Cold Snap" = new ColdSnap()
    "Summon Water Elemental" = new SummonWaterElemental()

    //passive
    "Winter's Chill" = new WintersChill()
    "Brain Freeze" = new BrainFreeze()
    "Icicles" = new Icicles()
    "Shatter" = new Shatter()
    "Fingers of Frost" = new FingersofFrost()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//----------------------------------------
class BrainFreeze extends Ability {
    constructor() {
        super("Brain Freeze", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() {
        return "Frostbolt has a 30% chance to empower your next Flurry to be instant cast and deal 50% increased damage and apply Winter's Chill to the target.<br>" +
            "<br>" +
            "Winter's Chill causes the target to take damage from your spells as if it were frozen"
    }

}
//----------------------------------------
class Icicles extends Ability {
    constructor() {
        super("Icicles", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.mastery = true
        this.icicles = 0
    }

    getTooltip() {
        return "Casting Frostbolt or Flurry grants you an Icicle. Casting Ice Lance causes all Icicles stored to begin launching at the target, each dealing "+spellPowerToNumber(player.stats.mastery/100)+" Frost damage.<br>" +
            "Up to 5 Icicles can be stored. Any excess Icicles gained will be automatically launched.<br>" +
            "Increases the damage of Frozen Orb by "+player.stats.mastery*1.875.toFixed(1)+"%"
    }

    increaseIcicles(caster,target) {
        this.icicles++
        if (this.icicles>5) {
            doDamage(caster,target,this,undefined,caster.stats.mastery/100)
            if (caster.abilities["Splitting Ice"].talentSelect) {
                //jump
                let targets = enemies
                for (let i = 0; i<targets.length ;i++) {
                    if (!targets[i].isDead && this.checkDistance(target, targets[i],8,true)) {
                        doDamage(caster, targets[i], this,undefined,caster.stats.mastery/100*this.icicles*0.65)
                        break
                    }
                }
            }
            this.icicles --
        }
    }

    launchIcicles(caster,target) {
        if (this.icicles>0) {
            doDamage(caster,target,this,undefined,caster.stats.mastery/100*this.icicles)
            if (caster.abilities["Splitting Ice"].talentSelect) {
                //jump
                let targets = enemies
                for (let i = 0; i<targets.length ;i++) {
                    if (!targets[i].isDead && this.checkDistance(target, targets[i],8,true)) {
                        doDamage(caster, targets[i], this,undefined,caster.stats.mastery/100*this.icicles*0.65)
                        break
                    }
                }
            }
            this.icicles = 0
        }
    }

}
//----------------------------------------
class Shatter extends Ability {
    constructor() {
        super("Shatter", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Multiplies the critical strike chance of your Frost spells against frozen targets by 1.5, and adds an additional 50% critical strike chance."
    }

}
//----------------------------------------
class FingersofFrost extends Ability {
    constructor() {
        super("Fingers of Frost", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.duration = 15
        this.maxStacks = 2
    }

    getTooltip() {
        return "Frostbolt has a 15% chance and Frozen Orb damage has a 10% to grant a charge of Fingers of Frost.<br>" +
            "Fingers of Frost causes your next Ice Lance to deal damage as if the target were frozen.<br>" +
            "Maximum 2 charges."
    }

    getBuff(caster,ability) {
        if (ability.name==="Frostbolt" && getChance(15)) {
            applyBuff(caster,caster,this,1,true)
        } else if (ability.name==="Frozen Orb" && getChance(10)) {
            applyBuff(caster,caster,this,1,true)
        }
    }

}
//----------------------------------------
class WintersChill extends Ability {
    constructor() {
        super("Winter's Chill", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.duration = 6
        this.hiddenSB = true
        this.maxStacks = 2
    }

}