class Unholy_Abilities {
    "Death Strike" = new DeathStrike(false)
    "Mind Freeze" = new MindFreeze()
    "Dark Command" = new DarkCommand()
    "Asphyxiate" = new Asphyxiate(true)
    "Icebound Fortitude" = new IceboundFortitude()
    "Lichborne" = new Lichborne()
    "Raise Ally" = new RaiseAlly()
    "Anti-Magic Shell" = new AntiMagicShell()
    "Death's Advance" = new DeathsAdvance()
    "Anti-Magic Zone" = new AntiMagicZone()
    "Chains of Ice" = new ChainsofIce()
    "Raise Dead" = new RaiseDead(true)
    "Sacrificial Pact" = new SacrificialPact()
    "Death Grip" = new DeathGrip()
    "Death Coil" = new DeathCoil()
    "Scourge Strike" = new ScourgeStrike()
    "Death and Decay" = new DeathandDecay()
    "Festering Strike" = new FesteringStrike()

    //passive
    "Dreadblade" = new Dreadblade()
    "Festering Wound" = new FesteringWound()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//--------------------------
class Dreadblade extends Ability {
    constructor() {
        super("Dreadblade", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage of your Minions and Shadow damage abilities by "+player.stats.mastery+"%."
    }

}