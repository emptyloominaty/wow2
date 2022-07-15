let _holyPaladin_talents = function(caster) {
    //1
    caster.abilities["Crusader's Might"] = new CrusadersMight()
    caster.abilities["Bestow Faith"] = new BestowFaith()
    caster.abilities["Light's Hammer"] = new LightsHammer()

    //2
    //caster.abilities["Saved by the Light"] = new SavedbytheLight()
    //caster.abilities["Judgment of Light"] = new JudgmentofLight()
    //caster.abilities["Holy Prism"] = new HolyPrism()

    //3
    //caster.abilities["Fist of Justice"] = new FistofJustice()
    //caster.abilities["Repentance"] = new Repentance()
    //caster.abilities["Blinding Light"] = new BlindingLight()

    //4
    //caster.abilities["Unbreakable Spirit"] = new UnbreakableSpirit()
    //caster.abilities["Cavalier"] = new Cavalier()
    //caster.abilities["Rule of Law"] = new RuleofLaw()

    //5
    //caster.abilities["Divine Purpose"] = new DivinePurpose()
    //caster.abilities["Holy Avenger"] = new HolyAvenger()
    //caster.abilities["Seraphim"] = new Seraphim()

    //6
    //caster.abilities["Sanctified Wrath"] = new SanctifiedWrath()
    //caster.abilities["Avenging Crusader"] = new AvengingCrusader()
    //caster.abilities["Awakening"] = new Awakening()

    //7
    //caster.abilities["Glimmer of Light"] = new GlimmerofLight()
    //caster.abilities["Beacon of Faith"] = new BeaconofFaith()
    //caster.abilities["Beacon of Virtue"] = new BeaconofVirtue()


    caster.talents = [["Crusader's Might","Bestow Faith","Light's Hammer"],
        ["Saved by the Light","Judgment of Light","Holy Prism"],
        ["Fist of Justice","Repentance","Blinding Light"],
        ["Unbreakable Spirit","Cavalier","Rule of Law"],
        ["Divine Purpose","Holy Avenger","Seraphim"],
        ["Sanctified Wrath","Avenging Crusader","Awakening"],
        ["Glimmer of Light","Beacon of Faith","Beacon of Virtue"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class CrusadersMight extends Ability {
    constructor() {
        super("Crusader's Might", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Crusader Strike reduces the cooldown of Holy Shock by 1.5 sec."
    }
}
//------------------------------------------------
class BestowFaith extends Ability {
    constructor() {
        super("Bestow Faith", 1.2, 1.5, 0, 12, false, false, false, "holy", 40, 1)
        this.talent = true
        this.spellPower = 2.1
        this.duration = 5
        this.caster = {}
    }

    getTooltip() {
        return "Begin mending the wounds of a friendly target, healing them for "+spellPowerToNumber(this.spellPower)+" after 5 sec.<br>" +
            "<br>" +
            "Generates 1 Holy Power upon healing."
    }

    getBuffTooltip(caster, target, buff) {
        return "Will be healed for "+((caster.stats.primary * this.spellPower) * (1 + (caster.stats.vers / 100))).toFixed(0)+" upon expiration."
    }
    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            this.setCd()
            this.setGcd(caster)
            this.caster = caster
            let target = caster.castTarget
            if (target === "" || Object.keys(target).length === 0 || this.isEnemy(caster, target) || target.isDead) {
                applyBuff(caster, caster, this)
            } else {
                applyBuff(caster, target, this)
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
    }

    endBuff(target) {
        doHeal(this.caster,target,this)
        this.caster.useEnergy(0,-1)
    }
}
//------------------------------------------------
class LightsHammer extends Ability {
    constructor() {
        super("Light's Hammer", 3.6, 1.5, 0, 60, false, false, false, "holy", 40, 1)
        this.talent = true
        this.spellPower = 0.205
        this.spellPowerHeal = 0.25
        this.duration = 5
        this.area = {type:"circle", radius:10, duration:14,data:{type:"dot", maxTargets:"all", spellPower:this.spellPower, timer:2/*sec*/,moving:false,speed:20,color:"#ffeb8e",color2:"rgba(255,254,151,0.06)"}}
        this.area2 = {type:"circle", radius:10, duration:14,data:{type:"hot", maxTargets:6, spellPower:this.spellPowerHeal, timer:2/*sec*/,moving:false,speed:20,color:"#ffeb8e",color2:"rgba(255,254,151,0.06)"}}
    }

    getTooltip() {
        return "Hurls a Light-infused hammer to the ground, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to nearby enemies" +
            " and healing up to 6 nearby allies for "+spellPowerToNumber(this.spellPowerHeal)+", every 2 sec for 14 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,true,this.area.radius)
            addArea(areas.length,caster,this,this.area2.type,this.area2.duration,this.area2.data,caster.x,caster.y,false,this.area2.radius)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost,this.secCost)
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
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
