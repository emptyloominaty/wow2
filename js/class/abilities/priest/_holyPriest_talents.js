let _holyPriest_talents = function(caster) {
    //1
    caster.abilities["Enlightenment"] = new Enlightenment()
    caster.abilities["Trail of Light"] = new TrailofLight()
    caster.abilities["Renewed Faith"] = new RenewedFaith()

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

    caster.talents = [["Enlightenment","Trail of Light","Renewed Faith"],
        ["Angel's Mercy","Body and Soul","Angelic Feather"],
        ["Binding Heals","Guardian Angel","Afterlife"],
        ["Psychic Voice","Censure","Shining Force"],
        ["Surge of Light","Cosmic Ripple","Prayer Circle"],
        ["Benediction","Divine Star","Halo"],
        ["Light of the Naaru","Apotheosis","Holy Word: Salvation"]
    ]
}
//------------------------------------------------------------------------------------------------ROW1
class Enlightenment extends Ability {
    constructor() {
        super("Enlightenment", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "You regenerate mana 10% faster."
    }

    setTalent(caster) {
        caster.energyRegen += 0.08
    }

    unsetTalent(caster) {
        caster.energyRegen -= 0.08
    }

}
//------------------------------------------------
class TrailofLight extends Ability {
    constructor() {
        super("Trail of Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.lastTarget = false
    }

    getTooltip() {
        return "When you cast Heal or Flash Heal, 35% of the healing is replicated to the previous target you healed with Heal or Flash Heal."
    }

    heal(caster,target,ability) {
        if (this.talentSelect) {
            if (this.lastTarget && !this.lastTarget.isDead) {
                doHeal(caster,this.lastTarget,ability,undefined,ability.spellPower*0.35)
            }
            this.lastTarget = friendlyTargets[target.id2]
        }
    }

}
//------------------------------------------------
class RenewedFaith extends Ability {
    constructor() {
        super("Renewed Faith", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Your healing is increased by 10% on targets with your Renew."
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
