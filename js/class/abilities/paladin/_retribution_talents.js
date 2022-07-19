let _retribution_talents = function(caster) {
    //1
    caster.abilities["Zeal"] = new Zeal()
    //caster.abilities["Righteous Verdict"] = new RighteousVerdict()
    //caster.abilities["Execution Sentence"] = new ExecutionSentence()

    //2
    //caster.abilities["Fires of Justice"] = new FiresofJustice()
    //caster.abilities["Blade of Wrath"] = new BladeofWrath()
    //caster.abilities["Empyrean Power] = new EmpyreanPower()

    //3
    caster.abilities["Fist of Justice"] = new FistofJustice()
    caster.abilities["Repentance"] = new Repentance()
    caster.abilities["Blinding Light"] = new BlindingLight()

    //4
    caster.abilities["Unbreakable Spirit"] = new UnbreakableSpirit()
    caster.abilities["Cavalier"] = new Cavalier()
    //caster.abilities["Eye for an Eye"] = new EyeforanEye()

    //5
    caster.abilities["Divine Purpose"] = new DivinePurpose() //TODO:  ExecutionSentence, JusticarsVengeance
    caster.abilities["Holy Avenger"] = new HolyAvenger()
    caster.abilities["Seraphim"] = new Seraphim()

    //6
    //caster.abilities["Selfless Healer"] = new SelflessHealer()
    //caster.abilities["Justicar's Vengeance"] = new JusticarsVengeance()
    //caster.abilities["Healing Hands"] = new HealingHands()

    //7
    caster.abilities["Sanctified Wrath"] = new SanctifiedWrath()
    //caster.abilities["Crusade"] = new Crusade()
    //caster.abilities["Final Reckoning"] = new FinalReckoning()


    caster.talents = [["Zeal","Righteous Verdict","Execution Sentence"],
        ["Fires of Justice","Blade of Wrath","Empyrean Power"],
        ["Fist of Justice","Repentance","Blinding Light"],
        ["Unbreakable Spirit","Cavalier","Eye for an Eye"],
        ["Divine Purpose","Holy Avenger","Seraphim"],
        ["Selfless Healer","Justicar's Vengeance","Healing Hands"],
        ["Sanctified Wrath","Crusade","Final Reckoning"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Zeal extends Ability {
    constructor() {
        super("Zeal", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.085
        this.duration = 20
        this.maxStacks = 9
    }

    getTooltip() {
        return "Judgment empowers you with holy zeal, causing your next 3 auto attacks to occur 30% faster and deal an additional "+spellPowerToNumber(this.spellPower)+" Holy damage."
    }
}
//------------------------------------------------
//------------------------------------------------
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
//------------------------------------------------
//------------------------------------------------