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

    //passive
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}