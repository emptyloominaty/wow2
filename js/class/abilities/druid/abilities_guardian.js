class Guardian_Abilities {
    "Regrowth" = new Regrowth(false)
    "Moonfire" = new Moonfire(false,true)
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
    "Maul" = new Maul(true)
    "Mangle" = new Mangle(true)
    "Swipe" = new Swipe()
    "Thrash" = new Thrash()
    "Ironfur" = new Ironfur()
    "Frenzied Regeneration" = new FrenziedRegeneration()
    "Survival Instincts" = new SurvivalInstincts()
    "Berserk" = new Berserk()
    "Incapacitating Roar" = new IncapacitatingRoar()
    "Wild Growth" = new WildGrowth(false)
    "Rejuvenation" = new Rejuvenation(false)
    "Swiftmend" = new Swiftmend(false)
    "Starfire" = new Starfire(true)
    "Starsurge" = new Starsurge(true)
    "Moonkin Form" = new MoonkinForm(true)

    //passive
    "Nature's Guardian" = new NaturesGuardian()
    "Ursine Adept" = new UrsineAdept()
    "Thick Hide" = new ThickHide()
    "Gore" = new Gore()
    "Infected Wounds" = new InfectedWounds()
    "Ysera's Gift" = new YserasGift()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//------------------------
class NaturesGuardian extends Ability {
    constructor() {
        super("Nature's Guardian", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.mastery = true
        this.effect = [{name:"naturesGuardian"}]
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Increases your maximum health and healing received by "+(player.stats.mastery/2).toFixed(1)+"%." +
            "<br>" +
            "Also increases your attack power by "+player.stats.mastery.toFixed(1)+"%."
    }
}
//------------------------
class UrsineAdept extends Ability {
    constructor() {
        super("Ursine Adept", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.effect = [{name:"damageReduction",val:0.1}]
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Moonfire, Soothe, Remove Corruption, and Rebirth are usable in Bear Form. <br><br> All damage taken in Bear Form reduced by 10%."
    }
}
//------------------------
class ThickHide extends Ability {
    constructor() {
        super("Thick Hide", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.effect = [{name:"damageReduction",val:0.06}]
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
    }

    getTooltip() {
        return "Reduces all damage taken by 6%."
    }
}
//------------------------
class Gore extends Ability {
    constructor() {
        super("Gore", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Thrash, Swipe, Moonfire, and Maul have a 15% chance to generate 4 Rage and reset the cooldown on Mangle."
    }
}
//------------------------
class InfectedWounds extends Ability {
    constructor() {
        super("Infected Wounds", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.effect = [{name:"moveSpeed",val:0.5}]
        this.duration = 12
    }

    getTooltip() {
        if (player.spec==="guardian") {
            return "Mangle and Maul cause an Infected Wound in the target, reducing their movement speed by 50% for 12 sec."
        } else {
            return "Rake causes an Infected Wound in the target, reducing their movement speed by 50% for 12 sec." //TODO:20%
        }
    }
}
