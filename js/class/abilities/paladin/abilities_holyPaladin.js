class HolyPaladin_Abilities {
    "Flash of Light" = new FlashofLight()
    "Holy Light" = new HolyLight()
    "Judgment" = new Judgment()
    "Crusader Strike" = new CrusaderStrike()
    "Holy Shock" = new HolyShock()
    "Lay on Hands" = new LayonHands()
    "Light of Dawn" = new LightofDawn()
    "Redemption" = new Redemption()
    "Absolution" = new Absolution()
    "Cleanse" = new Cleanse()
    "Hand of Reckoning" = new HandofReckoning()
    "Hammer of Justice" = new HammerofJustice()
    "Word of Glory" = new WordofGlory()
    "Consecration" = new Consecration(true)
    "Avenging Wrath" = new AvengingWrath(true)
    "Divine Protection" = new DivineProtection()
    "Divine Steed" = new DivineSteed()
    "Beacon of Light" = new BeaconofLight()
    "Light of the Martyr" = new LightoftheMartyr()
    "Hammer of Wrath" = new HammerofWrath()
    "Devotion Aura" = new DevotionAura()
    "Aura Mastery" = new AuraMastery()
    "Divine Shield" = new DivineShield()
    "Blessing of Protection" = new BlessingofProtection()
    "Blessing of Freedom" = new BlessingofFreedom()

    //TODO: Retribution Aura
    //TODO: "Blessing of Sacrifice" = new BlessingofSacrifice()

    //passive
    "Lightbringer" = new Lightbringer()
    "Infusion of Light" = new InfusionofLight()
    "Devotion Aura " = new DevotionAuraBuff()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//------------------------------------------------
class Lightbringer extends Ability {
    constructor() {
        super("Lightbringer", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.mastery = true
        this.minVal = 10
        this.maxVal = 40
    }

    getTooltip() {
        return "Increases healing done by up to "+player.stats.mastery.toFixed(1)+", based on the proximity of your target."
    }
    //Lightbringer: It's 100% effective at 10 yards, 0% effective at 40 yards, falling off linearly in between.

    increaseHealing(caster,target) {
        let distance = getDistance(caster,target)
        let mul = 0
        if (distance<=this.minVal) {
            mul = 1
        } else if (distance>=this.maxVal) {
            mul = 0
        } else {
            mul = 1-((distance-this.minVal)/(this.maxVal-this.minVal))
        }
        return (1+((caster.stats.mastery/100)*mul))
    }
}

class InfusionofLight extends Ability {
    constructor() {
        super("Infusion of Light", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() {
        return "Your critical Holy Shocks reduce the cost of your next Flash of Light by 30% or cause your next Holy Light to generate 1 Holy Power."
    }

    getBuffTooltip(caster, target, buff) {
        return "Reduces the cost of your next Flash of Light by 30% or causes your next Holy Light to generate 1 Holy Power."
    }


}