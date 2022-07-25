let _guardian_talents = function(caster) {
    //1
    caster.abilities["Brambles"] = new Brambles()
    caster.abilities["Blood Frenzy"] = new BloodFrenzy()
    caster.abilities["Bristling Fur"] = new BristlingFur()

    //2
    caster.abilities["Tiger Dash"] = new TigerDash()
    caster.abilities["Renewal"] = new Renewal()
    caster.abilities["Wild Charge"] = new WildCharge()

    //3
    caster.abilities["Balance Affinity"] = new BalanceAffinity()
    caster.abilities["Feral Affinity"] = new FeralAffinity()
    caster.abilities["Restoration Affinity"] = new RestorationAffinity()

    //4
    caster.abilities["Mighty Bash"] = new MightyBash()
    caster.abilities["Mass Entanglement"] = new MassEntanglement()
    caster.abilities["Heart of the Wild"] = new HeartoftheWild()

    //5
    //caster.abilities["Soul of the Forest"] = new SouloftheForest()
    //caster.abilities["Galactic Guardian"] = new GalacticGuardian()
    //caster.abilities["Incarnation: Guardian of Ursoc"] = new IncarnationGuardianofUrsoc()

    //6
    //caster.abilities["Earthwarden"] = new Earthwarden()
    //caster.abilities["Survival of the Fittest"] = new SurvivaloftheFittest()
    //caster.abilities["Guardian of Elune"] = new GuardianofElune()

    //7
    //caster.abilities["Rend and Tear"] = new RendandTear()
    //caster.abilities["Tooth and Claw"] = new ToothandClaw()
    //caster.abilities["Pulverize"] = new Pulverize()

    caster.talents = [["Brambles","Blood Frenzy","Bristling Fur"],
        ["Tiger Dash","Renewal","Wild Charge"],
        ["Balance Affinity","Feral Affinity","Restoration Affinity"],
        ["Mighty Bash","Mass Entanglement","Heart of the Wild"],
        ["Soul of the Forest","Galactic Guardian","Incarnation: Guardian of Ursoc"],
        ["Earthwarden","Survival of the Fittest","Guardian of Elune"],
        ["Rend and Tear","Tooth and Claw","Pulverize"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Brambles extends Ability {
    constructor() {
        super("Brambles", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Sharp brambles protect you, absorbing and reflecting up to (Attack power * 0.06) damage from each attack.<br>" +
            "<br>" +
            "While Barkskin is active, the brambles also deal (2.6208% of Attack power) Nature damage to all nearby enemies every 1 sec."
    }

}
//------------------------------------------------
class BloodFrenzy extends Ability {
    constructor() {
        super("Blood Frenzy", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Thrash also generates 2 Rage each time it deals damage."
    }
}
//------------------------------------------------
class BristlingFur extends Ability {
    constructor() {
        super("Bristling Fur", 0, 1.5, 0, 40, false, false, false, "nature", 5, 1)
        this.talent = true
        this.duration = 8
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Bristle your fur, causing you to generate Rage based on damage taken for 8 sec."
    }
    getBuffTooltip(caster, target, buff) {
        return "Generating Rage from taking damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
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
