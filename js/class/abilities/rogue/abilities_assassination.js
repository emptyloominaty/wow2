class assassination_abilities {
    "Mutilate" = new Mutilate()
    "Rupture" = new Rupture()
    "Garrote" = new Garrote()
    "Envenom" = new Envenom()
    "Slice And Dice" = new SliceAndDice()
    "Deadly Poison" = new DeadlyPoison()
    "Fan of Knives" = new FanofKnives()

    //passive
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

    gainEnergyDead(caster,duration,maxDuration) { //TODO
        let val = 8 * (duration/maxDuration)
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

