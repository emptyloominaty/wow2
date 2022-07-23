let _unholy_talents = function(caster) {
    //1
    caster.abilities["Infected Claws"] = new InfectedClaws()
    caster.abilities["All Will Serve"] = new AllWillServe()
    caster.abilities["Clawing Shadows"] = new ClawingShadows()

    //2
    //caster.abilities["Bursting Sores"] = new BurstingSores()
    //caster.abilities["Ebon Fever"] = new EbonFever()
    //caster.abilities["Unholy Blight"] = new UnholyBlight()

    //3
    caster.abilities["Grip of the Dead"] = new GripoftheDead()
    caster.abilities["Death's Reach"] = new DeathsReach()
    caster.abilities["Asphyxiate"] = new Asphyxiate()

    //4
    //caster.abilities["Pestilent Pustules"] = new PestilentPustules()
    //caster.abilities["Harbinger of Doom"] = new HarbingerofDoom()
    //caster.abilities["Soul Reaper"] = new SoulReaper()

    //5
    //caster.abilities["Spell Eater"] = new SpellEater()
    caster.abilities["Wraith Walk"] = new WraithWalk()
    caster.abilities["Death Pact"] = new DeathPact()

    //6
    //caster.abilities["Pestilence"] = new Pestilence()
    //caster.abilities["Unholy Pact"] = new UnholyPact()
    //caster.abilities["Defile"] = new Defile()

    //7
    //caster.abilities["Army of the Damned"] = new ArmyoftheDamned()
    //caster.abilities["Summon Gargoyle"] = new SummonGargoyle()
    //caster.abilities["Unholy Assault"] = new UnholyAssault()



    caster.talents = [["Infected Claws","All Will Serve","Clawing Shadows"],
        ["Bursting Sores","Ebon Fever","Unholy Blight"],
        ["Grip of the Dead","Death's Reach","Asphyxiate"],
        ["Pestilent Pustules","Harbinger of Doom","Soul Reaper"],
        ["Spell Eater","Wraith Walk","Death Pact"],
        ["Pestilence","Unholy Pact","Defile"],
        ["Army of the Damned","Summon Gargoyle","Unholy Assault"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class InfectedClaws extends Ability {
    constructor() {
        super("Infected Claws", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Your ghoul's Claw attack has a 30% chance to cause a Festering Wound on the target."
    }

}
//------------------------------------------------
class AllWillServe extends Ability {
    constructor() {
        super("All Will Serve", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.petId = false
        this.petData = {
            name:"Risen Skulker",
            abilities:{"Skulker Shot":new SkulkerShot()},
            color:"#eae4d2",
            size:4,
            do:[{name:"cast",ability:"Skulker Shot"}],
            autoAttackDamage:1
        }
        this.petDuration = 999
    }

    getTooltip() {
        return "Your Raise Dead spell summons an additional skeletal minion."
    }

    spawnPet(caster) {
        if (caster.pets[this.petId]!==undefined) {
            if (caster.pets[this.petId] && caster.pets[this.petId].name==="Risen Skulker") {
                caster.pets[this.petId] = undefined
            }
        }
        this.petId = spawnPet(caster,"guardian",this.petData.name,caster.x+10,caster.y+10,this)
    }

}
//------------------------------------------------
class ClawingShadows extends Ability {
    constructor() {
        super("Clawing Shadows", -10, 1.5, 0, 0, false, false, false, "shadow", 30, 1)
        this.talent = true
        this.secCost = 1
        this.spellPower = 0.46
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Deals (46% of Attack power) Shadow damage and causes 1 Festering Wound to burst."
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