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
    "Outbreak" = new Outbreak()
    "Epidemic" = new Epidemic()
    "Dark Transformation" = new DarkTransformation()
    "Apocalypse" = new Apocalypse()
    "Army of the Dead" = new ArmyoftheDead()

    //passive
    "Dreadblade" = new Dreadblade()
    "Festering Wound" = new FesteringWound()
    "Virulent Plague" = new VirulentPlague()
    "Veteran of the Third War" = new VeteranoftheThirdWar(false)
    "Sudden Doom" = new SuddenDoom()
    "Runic Corruption" = new RunicCorruption()
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
//--------------------------
class SuddenDoom extends Ability {
    constructor() {
        super("Sudden Doom", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.duration = 10
    }

    getTooltip() {
        return "Your auto attacks have a chance to make your next Death Coil or Epidemic cost no Runic Power."
    }

}
//--------------------------
class RunicCorruption extends Ability {
    constructor() {
        super("Runic Corruption", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Each Runic Power you spend has a 1.6% chance to increase your Rune regeneration rate by 100% for 3 sec."
    }

}