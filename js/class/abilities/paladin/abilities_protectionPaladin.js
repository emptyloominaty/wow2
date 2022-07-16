class ProtectionPaladin_Abilities {
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
    "Judgment" = new Judgment(true)
    "Consecration" = new Consecration(false,true)
    "Hammer of Wrath" = new HammerofWrath()
    "Avenging Wrath" = new AvengingWrath()
    "Rebuke" = new Rebuke()
    "Cleanse Toxins" = new CleanseToxins()

    //passive
    "Divine Bulwark" = new DivineBulwark()
    "Aegis of Light" = new AegisofLight()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//------------------------------------------------
class DivineBulwark extends Ability {
    constructor() {
        super("Divine Bulwark", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.mastery = true
        this.permanentBuff = true
        this.duration = 10
        this.hiddenBuff = true
        this.effect = [{name:"divineBulwark"}]
    }

    getTooltip() {
        return "Increases your chance to block melee attacks by "+player.stats.mastery.toFixed(1)+"%. " +
            "Reduces all damage taken while inside your Consecration by "+(player.stats.mastery/2.666).toFixed(1)+"%. " +
            "Also increases your attack power by "+player.stats.mastery.toFixed(1)+"%."
    }
}
//------------------------------------------------
class AegisofLight extends Ability {
    constructor() {
        super("Aegis of Light", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.permanentBuff = true
        this.duration = 10
        this.hiddenBuff = true
        this.effect = [{name:"increaseStat",stat:"stamina",val:45,percent:true},{name:"increaseStat",stat:"armor",val:10,percent:true},{name:"damageReduction",val:0.1}]
    }

    getTooltip() {
        return "Stamina increased by 45%.<br>" +
            "<br>" +
            "Armor increased by 10%.<br>" +
            "<br>" +
            "All damage taken reduced by 10%"
    }
}