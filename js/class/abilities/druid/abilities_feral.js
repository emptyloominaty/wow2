class Feral_Abilities {
    "Regrowth" = new Regrowth(false)
    "Moonfire" = new Moonfire(false,false,true)
    "Barkskin" = new Barkskin()
    "Revive" = new Revive(false)
    "Rebirth" = new Rebirth(false)
    "Cat Form" = new CatForm()
    "Bear Form" = new BearForm(true)
    "Growl" = new Growl()
    "Dash" = new Dash()
    "Stampeding Roar" = new StampedingRoar()
    "Entangling Roots" = new EntanglingRoots(false)
    "Soothe" = new Soothe(false)
    "Remove Corruption" = new RemoveCorruption()
    "Skull Bash" = new SkullBash()
    "Swipe" = new Swipe(true)
    "Thrash" = new Thrash()
    "Survival Instincts" = new SurvivalInstincts()
    "Wild Growth" = new WildGrowth(false)
    "Rejuvenation" = new Rejuvenation(false)
    "Swiftmend" = new Swiftmend(false)
    "Shred" = new Shred()
    "Rake" = new Rake()
    "Ferocious Bite" = new FerociousBite()
    "Rip" = new Rip()
    "Maim" = new Maim()
    "Berserk" = new Berserk(true)
    "Tiger's Fury" = new TigersFury()
    "Starfire" = new Starfire(true)
    "Starsurge" = new Starsurge(true)
    "Moonkin Form" = new MoonkinForm(true)

    //passive
    "Ysera's Gift" = new YserasGift()
    "Razor Claws" = new RazorClaws()
    "Infected Wounds" = new InfectedWounds()
    "Feline Swiftness" = new FelineSwiftness()
    "Predatory Swiftness" = new PredatorySwiftness()
    "Primal Fury" = new PrimalFury()
    "Omen of Clarity" = new OmenofClarityFeral()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//------------------------
class RazorClaws extends Ability {
    constructor() {
        super("Razor Claws", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases the damage done by your Cat Form bleed abilities and finishing moves by "+(player.stats.mastery).toFixed(1)+"%."

    }
}
//------------------------
class FelineSwiftness extends Ability {
    constructor() {
        super("Feline Swiftness", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"moveSpeed",val:0.15}]
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Increases your movement speed by 15%."

    }
}
//------------------------
class PredatorySwiftness extends Ability {
    constructor() {
        super("Predatory Swiftness", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 10
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Your finishing moves have a 20% chance per combo point to make your next Regrowth or Entangling Roots instant, free, and castable in all forms."

    }
}
//------------------------
class PrimalFury extends Ability {
    constructor() {
        super("Primal Fury", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "When you critically strike with an attack that generates a combo point, you gain an additional combo point.<br>" +
            "<br>" +
            "Damage over time cannot trigger this effect."

    }
}
//------------------------
class OmenofClarityFeral extends Ability {
    constructor() {
        super("Omen of Clarity", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() {
        return "Your auto attacks have a chance to cause a Clearcasting state, making your next Shred, Thrash or Swipe cost no Energy."

    }
}


