class Retribution_Abilities {
    "Devotion Aura" = new DevotionAura()
    "Hand of Reckoning" = new HandofReckoning()
    "Divine Shield" = new DivineShield()
    "Divine Steed" = new DivineSteed()
    "Flash of Light" = new FlashofLight(true)
    "Blessing of Protection" = new BlessingofProtection()
    "Blessing of Freedom" = new BlessingofFreedom()
    "Redemption" = new Redemption()
    "Hammer of Justice" = new HammerofJustice()
    "Lay on Hands" = new LayonHands()
    "Word of Glory" = new WordofGlory()
    "Judgment" = new Judgment()
    "Consecration" = new Consecration()
    "Hammer of Wrath" = new HammerofWrath()
    "Avenging Wrath" = new AvengingWrath()
    "Rebuke" = new Rebuke()
    "Cleanse Toxins" = new CleanseToxins()
    "Crusader Strike" = new CrusaderStrike()
    "Templar's Verdict" = new TemplarsVerdict()
    "Blade of Justice" = new BladeofJustice()
    "Divine Storm" = new DivineStorm()
    "Hand of Hindrance" = new HandofHindrance()
    "Wake of Ashes" = new WakeofAshes()
    "Shield of Vengeance" = new ShieldofVengeance()

    //passive
    "Hand of Light" = new HandofLight()
    "Art of War" = new ArtofWar()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//---------------------------
class HandofLight extends Ability {
    constructor() {
        super("Hand of Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Increases Holy damage done by "+player.stats.mastery.toFixed(1)+"%. "
    }
}
//---------------------------
class ArtofWar extends Ability {
    constructor() {
        super("Art of War", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
    }

    getTooltip() {
        return "Your auto attacks have a 8% chance to reset the cooldown of Blade of Justice. "
    }
}