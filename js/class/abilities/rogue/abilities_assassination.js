class assassination_abilities {
    "Mutilate" = new Mutilate()
    "Rupture" = new Rupture()
    "Garrote" = new Garrote()
    "Envenom" = new Envenom()
    "Slice And Dice" = new SliceAndDice()
    "Deadly Poison" = new DeadlyPoison()
    "Fan of Knives" = new FanofKnives()
    "Kidney Shot" = new KidneyShot()
    "Sprint" = new Sprint()
    "Crimson Vial" = new CrimsonVial()
    "Feint" = new Feint()
    "Kick" = new Kick()
    "Poisoned Knife" = new PoisonedKnife()
    "Evasion" = new Evasion()
    //"Tricks of the Trade" = new TricksoftheTrade()
    "Shadowstep" = new Shadowstep()
    "Shiv" = new Shiv(true)
    "Vendetta" = new Vendetta()
    "VendettaEnergy" = new VendettaEnergy()
    "Cloak of Shadows" = new CloakofShadows()
    "Stealth" = new Stealth()
    "Vanish" = new Vanish()
    "Cheap Shot" = new CheapShot()
    "Sap" = new Sap()
    "Ambush" = new Ambush()

    //passive
    "GarroteSilence" = new GarroteSilence()
    "Cut to the Chase" = new CuttotheChase()
    "Potent Assassin" = new PotentAssassin()
    "Venomous Wounds" = new VenomousWounds()
    "Seal Fate" = new SealFate()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

class VenomousWounds extends Ability {
    constructor() {
        super("Venomous Wounds", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return  "You regain 8 Energy each time your<br>" +
            "<br>" +
            "Internal Bleeding<br>" +
            "Garrote, Rupture, or Internal Bleeding<br>" +
            "<br>" +
            "Garrote or Rupture deal Bleed damage to a poisoned target.<br>" +
            "<br>" +
            "If an enemy dies while afflicted by your Rupture, you regain energy based on its remaining duration."
    }

    gainEnergy(caster) {
        caster.useEnergy(-8)
    }

    onDeath(caster,target,buff) {
        let val = 8 * (buff.duration/buff.maxDuration)
        caster.useEnergy(val)
    }

}

class SealFate extends Ability {
    constructor() {
        super("Seal Fate", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return  "When you critically strike with a melee attack that generates combo points, you gain an additional combo point per critical strike."
    }

    gainCombo(caster) {
        caster.useEnergy(0,-1)
    }
}

class CuttotheChase extends Ability {
    constructor() {
        super("Cut to the Chase", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Envenom extends the duration of Slice and Dice by up to 3 sec per combo point spent."
    }
}

class PotentAssassin extends Ability {
    constructor() {
        super("Potent Assassin", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage done by your poisons and bleeds by "+player.stats.mastery+"%."
    }
}