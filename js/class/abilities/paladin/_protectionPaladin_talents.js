let _protectionPaladin_talents = function(caster) {
    //1
    caster.abilities["Holy Shield"] = new HolyShield()
    caster.abilities["Redoubt"] = new Redoubt()
    caster.abilities["Blessed Hammer"] = new BlessedHammer()

    //2
    //caster.abilities["First Avenger"] = new FirstAvenger()
    //caster.abilities["Crusader's Judgment"] = new CrusadersJudgment()
    //caster.abilities["Moment of Glory"] = new MomentofGlory()

    //3
    caster.abilities["Fist of Justice"] = new FistofJustice()
    caster.abilities["Repentance"] = new Repentance()
    caster.abilities["Blinding Light"] = new BlindingLight()

    //4
    caster.abilities["Unbreakable Spirit"] = new UnbreakableSpirit()
    caster.abilities["Cavalier"] = new Cavalier()
    //caster.abilities["Blessing of Spellwarding"] = new Blessing of Spellwarding()

    //5
    caster.abilities["Divine Purpose"] = new DivinePurpose() //TODO: ShieldoftheRighteous
    caster.abilities["Holy Avenger"] = new HolyAvenger()
    caster.abilities["Seraphim"] = new Seraphim()

    //6
    //caster.abilities["Hand of the Protector"] = new HandoftheProtector()
    //caster.abilities["Consecrated Ground"] = new ConsecratedGround()
    caster.abilities["Judgment of Light"] = new JudgmentofLight()

    //7
    //caster.abilities["Sanctified Wrath"] = new SanctifiedWrath()
    //caster.abilities["Righteous Protector"] = new RighteousProtector()
    //caster.abilities["Final Stand"] = new FinalStand()


    caster.talents = [["Holy Shield","Redoubt","Blessed Hammer"],
        ["First Avenger","Crusader's Judgment","Moment of Glory"],
        ["Fist of Justice","Repentance","Blinding Light"],
        ["Unbreakable Spirit","Cavalier","Blessing of Spellwarding"],
        ["Divine Purpose","Holy Avenger","Seraphim"],
        ["Hand of the Protector","Consecrated Ground","Judgment of Light"],
        ["Sanctified Wrath","Righteous Protector","Final Stand"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class HolyShield extends Ability {
    constructor() {
        super("Holy Shield", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.passive = true
        this.spellPower = 0.09828
    }

    getTooltip() {//TODO:you are able to block spells
        return "Your block chance is increased by 15%, you are able to block spells, and your successful blocks deal "+spellPowerToNumber(this.spellPower)+" Holy damage to your attacker."
    }

    setTalent(caster) {
        caster.statsBup.block += 15
    }

    unsetTalent(caster) {
        caster.statsBup.block -= 15
    }

}
//------------------------------------------------
class Redoubt extends Ability {
    constructor() {
        super("Redoubt", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.talent = true
        this.passive = true
        this.duration = 10
        this.maxStacks = 3
        this.effect = [{name:"increaseStat",stat:"primary",val:2,percent:true},{name:"increaseStat",stat:"stamina",val:2,percent:true}]
    }

    getTooltip() {
        return "Shield of the Righteous increases your Strength and Stamina by 2% for 10 sec, stacking up to 3."
    }
}
//------------------------------------------------
class BlessedHammer extends Ability {
    constructor() {
        super("Blessed Hammer", 0, 1.5, 0, 6, false, false, false, "holy", 8, 3)
        this.talent = true

        this.hasteCd = true
        this.duration = 10
        this.secCost = -1
        this.spellPower = 0.1
        this.duration = 5
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Throws a Blessed Hammer that spirals outward, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to enemies and reducing the next damage they deal to you by (Attack power * 30 / 100).<br>" +
            "<br>" +
            "Generates 1 Holy Power."
    }
}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
