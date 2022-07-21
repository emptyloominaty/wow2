class frostDk_Abilities {
    "Death Strike" = new DeathStrike(false)
    "Mind Freeze" = new MindFreeze()
    "Dark Command" = new DarkCommand()
    "Asphyxiate" = new Asphyxiate()
    "Icebound Fortitude" = new IceboundFortitude()
    "Lichborne" = new Lichborne()
    "Raise Ally" = new RaiseAlly()
    "Death and Decay" = new DeathandDecay()
    "Anti-Magic Shell" = new AntiMagicShell()
    "Death's Advance" = new DeathsAdvance()
    "Anti-Magic Zone" = new AntiMagicZone()
    "Death Coil" = new DeathCoil()
    "Death Grip" = new DeathGrip()
    "Raise Dead" = new RaiseDead()
    "Sacrificial Pact" = new SacrificialPact()
    "Chains of Ice" = new ChainsofIce()
    "Obliterate" = new Obliterate()
    "Frost Strike" = new FrostStrike()

    //passive
    "Frozen Heart" = new FrozenHeart()
    "Veteran of the Third War" = new VeteranoftheThirdWar(false)
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//--------------------------
class FrozenHeart extends Ability {
    constructor() {
        super("Frozen Heart", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage of your Frost abilities by "+player.stats.mastery+"%. "
    }

}