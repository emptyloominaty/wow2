let _frostDk_talents = function(caster) {
    //1
    caster.abilities["Inexorable Assault"] = new InexorableAssault()
    caster.abilities["Icy Talons"] = new IcyTalons()
    caster.abilities["Cold Heart"] = new ColdHeart()

    //2
    //caster.abilities["Runic Attenuation"] = new RunicAttenuation()
    //caster.abilities["Murderous Efficiency"] = new MurderousEfficiency()
    //caster.abilities["Horn of Winter"] = new HornofWinter()

    //3
    //caster.abilities["Death's Reach"] = new DeathsReach()
    //caster.abilities["Asphyxiate"] = new Asphyxiate()
    //caster.abilities["Blinding Sleet"] = new BlindingSleet()

    //4
    //caster.abilities["Avalanche"] = new Avalanche()
    //caster.abilities["Frozen Pulse"] = new FrozenPulse()
    //caster.abilities["Frostscythe"] = new Frostscythe()

    //5
    //caster.abilities["Permafrost"] = new Permafrost()
    caster.abilities["Wraith Walk"] = new WraithWalk()
    caster.abilities["Death Pact"] = new DeathPact()

    //6
    //caster.abilities["Gathering Storm"] = new GatheringStorm()
    //caster.abilities["Hypothermic Presence"] = new HypothermicPresence()
    //caster.abilities["Glacial Advance"] = new GlacialAdvance()

    //7
    //caster.abilities["Icecap"] = new Icecap()
    //caster.abilities["Obliteration"] = new Obliteration()
    //caster.abilities["Breath of Sindragosa"] = new BreathofSindragosa()


    caster.talents = [["Inexorable Assault","Icy Talons","Cold Heart"],
        ["Runic Attenuation","Murderous Efficiency","Horn of Winter"],
        ["Death's Reach","Asphyxiate","Blinding Sleet"],
        ["Avalanche","Frozen Pulse","Frostscythe"],
        ["Permafrost","Wraith Walk","Death Pact"],
        ["Gathering Storm","Hypothermic Presence","Glacial Advance"],
        ["Icecap","Obliteration","Breath of Sindragosa"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class InexorableAssault extends Ability {
    constructor() {
        super("Inexorable Assault", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.214
        this.maxStacks = 5
        this.duration = 10

        this.timer1 = 0
        this.timer2 = 8
    }

    getTooltip() { //TODO: Frostscythe
        return "Gain Inexorable Assault every 8 sec, stacking up to 5 times. Obliterate and Frostscythe consume a stack to deal an additional "+spellPowerToNumber(this.spellPower)+" Frost damage."
    }

    run(caster) {
        if (this.talentSelect) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                this.timer1 = 0
                applyBuff(caster,caster,this,1,true)
            }
        }
    }

}
//------------------------------------------------
class IcyTalons extends Ability {
    constructor() {
        super("Icy Talons", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.maxStacks = 3
        this.duration = 6
        this.effect = [{name:"incAttackSpeed",val:0.05}]
    }

    getTooltip() {
        return "Your Runic Power spending abilities increase your melee attack speed by 5% for 6 sec, stacking up to 3 times."
    }

}
//------------------------------------------------
class ColdHeart extends Ability {
    constructor() {
        super("Cold Heart", 0, 0, 0, 0, false, false, false, "frost", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.maxStacks = 20
        this.duration = 10
        this.permanentBuff = true
        this.spellPower = 0.107
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Every 2 sec, gain a stack of Cold Heart, causing your next Chains of Ice to deal "+spellPowerToNumber(this.spellPower)+" Frost damage. Stacks up to 20 times."
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
//------------------------------------------------
//------------------------------------------------