class Arcane_abilities {
    "Arcane Blast" =  new ArcaneBlast()
    "Arcane Barrage" =  new ArcaneBarrage()
    "Arcane Missiles" =  new ArcaneMissiles()
    "Arcane Explosion" = new ArcaneExplosion()
    "Arcane Intellect" = new ArcaneIntellect()
    "Arcane Power" = new ArcanePower()
    "Presence of Mind" = new PresenceofMind()
    "Time Warp" = new TimeWarp()
    "Counterspell" = new Counterspell()
    "Evocation" = new Evocation()
    "Remove Curse" = new RemoveCurse()
    "Touch of the Magi" = new TouchoftheMagi()
    "Slow" = new Slow()
    "Frost Nova" = new FrostNova()
    "Ice Block" = new IceBlock()
    "Polymorph" = new Polymorph()
    "Blink" = new Blink()
    "Prismatic Barrier" = new PrismaticBarrier()
    "Mirror Image" = new MirrorImage()


    //passive
    "Savant" = new Savant()
    "Clearcasting " =  new ClearcastingMage()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}


class Savant extends Ability {
    constructor() {
        super("Savant", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases your Mana regeneration rate and maximum Mana by "+player.stats.mastery.toFixed(1)+"%.<br>" +
            "<br>" +
            "Arcane Charges increase the damage of Arcane Blast by an additional "+(player.stats.mastery/2).toFixed(1)+"% and Arcane Barrage by "+(player.stats.mastery/4).toFixed(1)+"%.<br>" +
            "<br>" +
            "Increases all other Arcane damage by "+(player.stats.mastery/1.2).toFixed(1)+"%"
    }
}