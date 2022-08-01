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

    //passive
    "Winter's Chill" = new WintersChill()
    "Brain Freeze" = new BrainFreeze()
    "Icicles" = new Icicles()
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
            "Increases the damage of Frozen Orb by "+player.stats.mastery*1.875.toFixed(1)+"%" //TODO:
    }

    increaseIcicles(caster,target) {
        this.icicles++
        if (this.icicles>5) {
            doDamage(caster,target,this,undefined,caster.stats.mastery/100)
            this.icicles --
        }
    }

    launchIcicles(caster,target) {
        if (this.icicles>0) {
            doDamage(caster,target,this,undefined,caster.stats.mastery/100*this.icicles)
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
    }

}