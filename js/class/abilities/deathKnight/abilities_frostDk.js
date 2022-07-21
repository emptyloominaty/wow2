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
    "Howling Blast" = new HowlingBlast()
    "Empower Rune Weapon" = new EmpowerRuneWeapon()
    "Pillar of Frost" = new PillarofFrost()
    "Remorseless Winter" = new RemorselessWinter()
    "Frostwyrm's Fury" = new FrostwyrmsFury()

    //passive
    "Frozen Heart" = new FrozenHeart()
    "Frost Fever" = new FrostFever()
    "Veteran of the Third War" = new VeteranoftheThirdWar(false)
    "Runic Empowerment" = new RunicEmpowerment()
    "Killing Machine" = new KillingMachine()
    "Rime" = new Rime()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//--------------------------
class FrozenHeart extends Ability {
    constructor() {
        super("Frozen Heart", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage of your Frost abilities by "+player.stats.mastery+"%."
    }

}
//--------------------------
class RunicEmpowerment extends Ability {
    constructor() {
        super("Runic Empowerment", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Each Runic Power you spend has a 2.0% chance to instantly grant you a Rune."
    }

}
//--------------------------
class Rime extends Ability {
    constructor() {
        super("Rime", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() { //TODO:Frostscythe
        return "Obliterate has a 45% chance and Frostscythe has a 22.5% chance to cause your next Howling Blast to consume no runes and deal 150% additional damage."
    }

}
//--------------------------
class KillingMachine extends Ability {
    constructor() {
        super("Killing Machine", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 10
    }

    getTooltip() {
        return "Your auto attack critical strikes have a chance to make your next Obliterate deal Frost damage and critically strike."
    }

}

