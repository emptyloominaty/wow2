let _fury_talents = function(caster) {
    //1
    caster.abilities["War Machine"] = new WarMachine()
    //caster.abilities["Sudden Death"] = new SuddenDeath()
    //caster.abilities["Fresh Meat"] = new FreshMeat()

    //2
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //3
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //4
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //5
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //6
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //7
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    caster.talents = [["War Machine","Sudden Death","Fresh Meat"],
        ["Double Time","Impending Victory","Storm Bolt"],
        ["Massacre","Frenzy","Onslaught"],
        ["Furious Charge","Bounding Stride","Warpaint"],
        ["Seethe","Frothing Berserker","Cruelty"],
        ["Meat Cleaver","Dragon Roar","Bladestorm"],
        ["Anger Management","Reckless Abandon","Siegebreaker"]
    ]
}
//------------------------------------------------------------------------------------------------ROW1
class WarMachine extends Ability {
    constructor() {
        super("War Machine", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
        this.effect = [{name:"moveSpeed",val:0.3}]
    }

    getTooltip() {
        return "Your auto attacks generate 20% more Rage.<br>" +
            "<br>" +
            "Killing an enemy instantly generates 10 Rage, and increases your movement speed by 30% for 8 sec." //TODO:
    }

    killEnemy(caster,target) {
        if (this.talentSelect) {
            applyBuff(caster,caster,this)
            caster.useEnergy(-10,0)
        }
    }

    setTalent(caster) {
    }

    unsetTalent(caster) {
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