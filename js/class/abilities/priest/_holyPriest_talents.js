let _holyPriest_talents = function(caster) {
    //1
    caster.abilities["Enlightenment"] = new Enlightenment()
    caster.abilities["Trail of Light"] = new TrailofLight()
    caster.abilities["Renewed Faith"] = new RenewedFaith()

    //2
    caster.abilities["Angel's Mercy"] = new AngelsMercy()
    caster.abilities["Body and Soul"] = new BodyandSoul()
    caster.abilities["Angelic Feather"] = new AngelicFeather()

    //3
    caster.abilities["Binding Heals"] = new BindingHeals()
    caster.abilities["Guardian Angel"] = new GuardianAngel()
    caster.abilities["Afterlife"] = new Afterlife()

    //4
    caster.abilities["Psychic Voice"] = new PsychicVoice()
    caster.abilities["Censure"] = new Censure()
    caster.abilities["Shining Force"] = new ShiningForce()

    //5
    caster.abilities["Surge of Light"] = new SurgeofLight()
    caster.abilities["Cosmic Ripple"] = new CosmicRipple()
    caster.abilities["Prayer Circle"] = new PrayerCircle()

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
class AngelsMercy extends Ability {
    constructor() {
        super("Angel's Mercy", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Damage you take reduces the cooldown of Desperate Prayer, based on the amount of damage taken."
    }

    takeDamage(caster,damage) {
        let val = (damage / caster.maxHealth) * 15
        caster.abilities["Desperate Prayer"].incCd(caster,val,false)
    }
}
//------------------------------------------------
class BodyandSoul extends Ability {
    constructor() {
        super("Body and Soul", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 3
        this.effect = [{name:"moveSpeed",val:0.4}]
    }

    getTooltip() {
        return "Power Word: Shield and Leap of Faith increase your target's movement speed by 40% for 3 sec."
    }

}
//------------------------------------------------
class AngelicFeather extends Ability {
    constructor() {
        super("Angelic Feather", 0, 1.5, 0, 20, false, false, false, "holy", 40, 3)
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"moveSpeed",val:0.4}]
        this.duration = 5
        this.area = {type:"circle", radius:2, duration: 20,data:{type:"applyBuffOneTarget",color:"#f8ff81",color2:"rgba(253,255,139,0.65)",cast:false}}

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Places a feather at the target location, granting the first ally to walk through it 40% increased movement speed for 5 sec. Only 3 feathers can be placed at one time."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW3
class BindingHeals extends Ability {
    constructor() {
        super("Binding Heals", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "20% of Heal or Flash Heal healing on other targets also heals you."
    }

}
//------------------------------------------------
class GuardianAngel extends Ability {
    constructor() {
        super("Guardian Angel", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Guardian Spirit by 60 sec."
        // TODO: "When Guardian Spirit saves the target from death, it does not expire.<br>" +
       //    "<br>" +
        //    "When Guardian Spirit expires without saving the target from death, reduce its remaining cooldown to 60 seconds."
    }

    setTalent(caster) {
        caster.abilities["Guardian Spirit"].cd -= 60
        caster.abilities["Guardian Spirit"].maxCd -= 60

    }

    unsetTalent(caster) {
        caster.abilities["Guardian Spirit"].cd += 60
        caster.abilities["Guardian Spirit"].maxCd += 60

    }
}
//------------------------------------------------
class Afterlife extends Ability {
    constructor() {
        super("Afterlife", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Increases the duration of Spirit of Redemption by 50% and the range of its spells by 50%.<br>" +
            "<br>" +
            "As a Spirit of Redemption, you may sacrifice your spirit to Resurrect an ally, putting yourself to rest."
    }
}
//------------------------------------------------------------------------------------------------ROW4
class PsychicVoice extends Ability {
    constructor() {
        super("Psychic Voice", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Psychic Scream by 30 sec."
    }

    setTalent(caster) {
        /*TODO: caster.abilities["Psychic Scream"].cd -= 60
        caster.abilities["Psychic Scream"].maxCd -= 60*/
    }

    unsetTalent(caster) {
        /*TODO: caster.abilities["Psychic Scream"].cd += 60
        caster.abilities["Psychic Scream"].maxCd += 60*/

    }
}
//------------------------------------------------
class Censure extends Ability {
    constructor() {
        super("Censure", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Holy Word: Chastise stuns the target for 4 sec and is not broken by damage."
    }

    setTalent(caster) {
        caster.abilities["Holy Word: Chastise"].effect[0] = {name:"stun"}
    }

    unsetTalent(caster) {
        caster.abilities["Holy Word: Chastise"].effect[0] = {name:"incapacitate"}
    }
}
//------------------------------------------------
class ShiningForce extends Ability {
    constructor() {
        super("Shining Force", 2.5, 1.5, 0, 45, false, false, false, "holy", 40, 1)
        this.talent = true
        this.effect = [{name:"moveSpeed",val:0.7}]
        this.duration = 3
        this.area = {type:"circle", radius:10, duration: 0.2,data:{type:"applyDebuff",color:"#f8ff81",color2:"rgba(253,255,139,0.38)",cast:false}}
        this.area2 = {type:"circle", radius:10, duration: 0.5,data:{type:"ringofPeace",color:"#f8ff81",color2:"rgba(253,255,139,0.38)",cast:false}}
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Creates a burst of light around a friendly target, knocking away nearby enemies and slowing their movement speed by 70% for 3 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)
            addArea(areas.length,caster,this,this.area2.type,this.area2.duration,this.area2.data,this.castPosition.x,this.castPosition.y,false,this.area2.radius)

            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW5
class SurgeofLight extends Ability {
    constructor() {
        super("Surge of Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 20
        this.maxStacks = 2
    }

    getTooltip() {
        return "Your healing spells and Smite have a 8% chance to make your next Flash Heal instant and cost no mana. Stacks to 2."
    }

    chance(caster) { //TODO: DivineStar, Halo
        if (this.talentSelect && getChance(8)) {
            applyBuff(caster,caster,this,2,true)
        }
    }
}
//------------------------------------------------
class CosmicRipple extends Ability {
    constructor() {
        super("Cosmic Ripple", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.42
        this.targetsHeal = 5
    }

    getTooltip() {
        return "When Holy Word: Serenity or Holy Word: Sanctify finish their cooldown, you emit a burst of light that heals up to 5 injured targets for (42% of Spell power)."
    }

    burst(caster) {
        let tth = 0
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth && this.checkDistance(caster, friendlyTargets[i],undefined,true)) {
                doHeal(caster, friendlyTargets[i], this)
                tth++
                if (tth>=this.targetsHeal) {
                    break
                }
            }
        }
    }
}
//------------------------------------------------
class PrayerCircle extends Ability {
    constructor() {
        super("Prayer Circle", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
        this.duration = 8
    }

    getTooltip() {
        return "Using Circle of Healing reduces the cast time and cost of your Prayer of Healing by 25% for 8 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------
