let _restorationDruid_talents = function(caster) {
    //1
    caster.abilities["Abundance"] = new Abundance()
    caster.abilities["Nourish"] = new Nourish()
    caster.abilities["Cenarion Ward"] = new CenarionWard()
    caster.abilities["Cenarion Ward Hot"] = new CenarionWardHot()

    //2
    caster.abilities["Tiger Dash"] = new TigerDash()
    caster.abilities["Renewal"] = new Renewal()
    caster.abilities["Wild Charge"] = new WildCharge()

    //3
    caster.abilities["Balance Affinity"] = new BalanceAffinity()
    caster.abilities["Feral Affinity"] = new FeralAffinity()
    caster.abilities["Guardian Affinity"] = new GuardianAffinity()

    //4
    caster.abilities["Mighty Bash"] = new MightyBash()
    caster.abilities["Mass Entanglement"] = new MassEntanglement()
    caster.abilities["Heart of the Wild"] = new HeartoftheWild()

    //5
    caster.abilities["Soul of the Forest"] = new SouloftheForest()
    caster.abilities["Cultivation"] = new Cultivation()
    caster.abilities["Incarnation: Tree of Life"] = new IncarnationTreeofLife()

    //6
    caster.abilities["Inner Peace"] = new InnerPeace()
    caster.abilities["Spring Blossoms"] = new SpringBlossoms()
    caster.abilities["Overgrowth"] = new Overgrowth()

    //7
    caster.abilities["Photosynthesis"] = new Photosynthesis()
    caster.abilities["Germination"] = new Germination()
    caster.abilities["Flourish"] = new Flourish()


    caster.talents = [["Abundance","Nourish","Cenarion Ward"],
        ["Tiger Dash","Renewal","Wild Charge"],
        ["Balance Affinity","Feral Affinity","Guardian Affinity"],
        ["Mighty Bash","Mass Entanglement","Heart of the Wild"],
        ["Soul of the Forest","Cultivation","Incarnation: Tree of Life"],
        ["Inner Peace","Spring Blossoms","Overgrowth"],
        ["Photosynthesis","Germination","Flourish"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Abundance extends Ability {
    constructor() {
        super("Abundance", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "For each Rejuvenation you have active, Regrowth's cost is reduced by 6% and critical effect chance is increased by 6%."
    }

    getCost(caster) {
        if (this.talentSelect) {
            let val = 0
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (!friendlyTargets[i].isDead && this.checkDistance(caster,friendlyTargets[i],100,true)) {
                    let target = friendlyTargets[i]
                    for (let i = 0; i<target.buffs.length; i++) {
                        if (target.buffs[i].name==="Rejuvenation" && target.buffs[i].caster === caster) {
                            val += 6
                        }
                    }
                }
            }
            return val
        }
        return 0
    }
}
//------------------------------------------------
class Nourish extends Ability {
    constructor() {
        let name = "Nourish"
        let cost = 3.6
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 2.23

    }

    getTooltip() {
        return "Heals a friendly target for "+spellPowerToNumber(this.spellPower)+". Receives triple bonus from Mastery: Harmony."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            let spellPower = this.spellPower * (getRestoDruidMastery(caster,caster)*2)
            doHeal(caster,caster,this,undefined,spellPower)
        } else {
            let spellPower = this.spellPower * (getRestoDruidMastery(caster,target)*2)
            doHeal(caster,target,this,undefined,spellPower)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }

}

//------------------------------------------------
class CenarionWard extends Ability {
    constructor() {
        let name = "Cenarion Ward"
        let cost = 1.84
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.79/2
        this.duration = 30
        this.effect = [{name:"cenarionWard"}]
    }

    getTooltip() {
        return "Protects a friendly target for 30 sec. Any damage taken will consume the ward and heal the target for "+spellPowerHotToNumber(this.spellPower*8)+" over 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Taking damage will grant "+spellPowerHotToNumber(this.spellPower)+" healing every 1 sec for 8 sec."

    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            limitBuff(caster,"Cenarion Ward")
            applyBuff(caster,caster,this)
        } else {
            limitBuff(caster,"Cenarion Ward")
            applyBuff(caster,target,this)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }

}
class CenarionWardHot extends Ability {
    constructor() {
        super("Cenarion Ward ", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.passive = true
        this.hiddenSB = true
        this.duration = 8
        this.spellPower = 0.79/2
    }

    getBuffTooltip(caster, target, buff) {
        return "Taking damage will grant "+spellPowerHotToNumber(this.spellPower)+" healing every 1 sec for 8 sec."
    }
}


//------------------------------------------------------------------------------------------------ROW2
class TigerDash extends Ability {
    constructor() {
        super("Tiger Dash", 0, 1.5, 0, 45, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Shift into Cat Form and increase your movement speed by 200%, reducing gradually over 5 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Increased movement speed by 200% while in Cat Form, reducing gradually over time."
    }
}
//------------------------------------------------
class Renewal extends Ability {
    constructor() {
        let name = "Renewal"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.noGcd = true
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Instantly heals you for 30% of maximum health. Usable in all shapeshift forms."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            this.setCd()
            doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,caster.maxHealth*0.30)
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//------------------------------------------------
class WildCharge extends Ability {
    constructor() {
        let name = "Wild Charge"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 25
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.canCastForm = "all"
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Grants a movement ability that varies by shapeshift form:\n" +
            "\n" +
            "Non-shapeshifted\n" +
            "Fly to an ally's position.\n" +
            "\n" +
            "Bear Form\n" +
            "Charge to an enemy, immobilizing them for 4 sec.\n" +
            "\n" +
            "Cat Form\n" +
            "Leap behind an enemy, dazing them for 3 sec.\n" +
            "\n" +
            " Balance (Level 21)\n" +
            "Moonkin Form\n" +
            "Bound backward\n" +
            "\n" +
            "Travel Form\n" +
            "Leap forward 20 yds.\n" +
            "\n" +
            "Aquatic Form\n" +
            "Increases swim speed by an additional 150% for 5 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            this.setCd()
            doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,caster.maxHealth*0.30)
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW3
class BalanceAffinity extends Ability {
    constructor() {
        super("Balance Affinity", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.permanentBuff = true
        this.duration = 10
    }

    getTooltip() {//TODO:
        return "You gain:<br>" +
            "<br>" +
            " Astral Influence<br>" +
            "Increases the range of all of your abilities by 5 yards.<br>" +
            "<br>" +
            "You also learn:<br>" +
            "<br>" +
            " Moonkin Form<br>" +
            " Starsurge<br>" +
            " Starfire<br>" +
            "Typhoon"
    }

    setTalent(caster) {
        caster.abilities["Starfire"].canUse = true
        caster.abilities["Starsurge"].canUse = true
        caster.abilities["Moonkin Form"].canUse = true
        //TODO: caster.abilities["Typhoon"].canUse = true
        Object.keys(caster.abilities).forEach((key)=> {
            caster.abilities[key].range += 5
        })
    }

    unsetTalent(caster) {
        caster.abilities["Starfire"].canUse = false
        caster.abilities["Starsurge"].canUse = false
        caster.abilities["Moonkin Form"].canUse = false
        //TODO: caster.abilities["Typhoon"].canUse = false
        Object.keys(caster.abilities).forEach((key)=> {
            caster.abilities[key].range -= 5
        })
    }
}
//------------------------------------------------
class FeralAffinity extends Ability {
    constructor() {
        super("Feral Affinity", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"moveSpeed",val:0.15}]
        this.hiddenBuff = true
    }

    getTooltip() {//TODO:
        return "You gain:<br>" +
            "<br>" +
            " Feline Swiftness<br>" +
            "Increases your movement speed by 15%.<br>" +
            "<br>" +
            "You also learn:<br>" +
            "<br>" +
            " Rake<br>" +
            " Rip<br>" +
            " Swipe<br>" +
            " Maim<br>" +
            "<br>" +
            "Your energy regeneration is increased by 35%." //TODO: energy regen
    }

    getBuffTooltip(caster, target, buff) {
        return "Increases your movement speed by 15%."
    }

    setTalent(caster) {
        //caster.abilities["Rake"].canUse = true
        //caster.abilities["Rip"].canUse = true
        //caster.abilities["Swipe"].canUse = true
        //TODO: caster.abilities["Maim"].canUse = true
        applyBuff(caster,caster,this)
    }

    unsetTalent(caster) {
        //caster.abilities["Rake"].canUse = false
        //caster.abilities["Rip"].canUse = false
        //caster.abilities["Swipe"].canUse = false
        //TODO: caster.abilities["Maim"].canUse = false
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Feral Affinity") {
                caster.buffs[i].duration = -1
            }
        }
    }
}
//------------------------------------------------
class GuardianAffinity extends Ability {
    constructor() {
        super("Guardian Affinity", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"damageReduction",val:0.06}]
        this.hiddenBuff = true
    }

    getTooltip() {//TODO:
        return "You gain:<br>" +
            "<br>" +
            " Thick Hide<br>" +
            "Reduces all damage taken by 6%.<br>" +
            "<br>" +
            "You also learn:<br>" +
            "<br>" +
            " Thrash<br>" +
            " Frenzied Regeneration<br>" +
            " Incapacitating Roar"
    }

    getBuffTooltip(caster, target, buff) {
        return "Reduces all damage taken by 6%."
    }

    setTalent(caster) {
        //caster.abilities["Thrash"].canUse = true
        //caster.abilities["Frenzied Regeneration"].canUse = true
        //caster.abilities["Incapacitating Roar"].canUse = true
        applyBuff(caster,caster,this)
    }

    unsetTalent(caster) {
        //caster.abilities["Thrash"].canUse = false
        //caster.abilities["Frenzied Regeneration"].canUse = false
        //caster.abilities["Incapacitating Roar"].canUse = false
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Guardian Affinity") {
                caster.buffs[i].duration = -1
            }
        }
    }
}
//------------------------------------------------------------------------------------------------ROW4
class MightyBash extends Ability {
    constructor() {
        let name = "Mighty Bash"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.canCastForm = "all"
        this.duration = 4
        this.effect = [{name:"stun"}]
    }

    getTooltip() {
        return "Invokes the spirit of Ursoc to stun the target for 4 sec. Usable in all shapeshift forms."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                applyDebuff(caster,caster.castTarget,this)
                this.setCd()
                this.setGcd(caster)
                caster.useEnergy(this.cost)
                return true
            }
        }
        return false
    }
}
//------------------------------------------------
class MassEntanglement extends Ability {
    constructor() {
        let name = "Mass Entanglement"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.canCastForm = "all"
        this.duration = 30
        this.effect = [{name:"root"}]
        //TODO:	Apply Aura: Periodic Damage
        // Interval: 2 seconds (SP mod: 0.5)
    }

    getTooltip() {
        return  "Roots the target and all enemies within 15 yards in place for 30 sec. Damage may interrupt the effect. Usable in all shapeshift forms."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                applyDebuff(caster,caster.castTarget,this)
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && this.checkDistance(caster.castTarget,enemies[i],15,true)) {
                        applyDebuff(caster,enemies[i],this)
                    }
                }
                this.setCd()
                this.setGcd(caster)
                caster.useEnergy(this.cost)
                return true
            }
        }
        return false
    }
}
//------------------------------------------------
class HeartoftheWild extends Ability {
    constructor() {
        let name = "Heart of the Wild"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 300
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.canCastForm = "all"
        this.duration = 45

        this.affinity = ""
    }

    getTooltip() {
        let tooltip = "//NOT IMPLEMENTED//Abilities associated with your chosen Affinity are substantially empowered for 45 sec.<br><br>"
               if (player.abilities["Restoration Affinity"] && player.abilities["Restoration Affinity"].talentSelect) {
                   tooltip += "Healing of your Restoration spells increased by 30%, and mana costs reduced by 50%"
               } else if (player.abilities["Feral Affinity"] && player.abilities["Feral Affinity"].talentSelect) {
                   tooltip += "Damage of your Feral abilities increased by 30%, and critical strikes with attacks that generate a combo point generate an additional combo point."
               } else if (player.abilities["Balance Affinity"] && player.abilities["Balance Affinity"].talentSelect) {
                   tooltip += "Damage of your Balance abilities increased by 30%, and Starsurge is instant."
               } else if (player.abilities["Guardian Affinity"] && player.abilities["Guardian Affinity"].talentSelect) {
                   tooltip += "Bear Form gives an additional 20% Stamina, multiple uses of Ironfur may overlap, and Frenzied Regeneration has 2 charges."
               }
        return tooltip
    }

    getBuffTooltip(caster, target, buff) {
        return "Abilities associated with your chosen Affinity are substantially empowered."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.abilities["Restoration Affinity"] && caster.abilities["Restoration Affinity"].talentSelect) {
                caster.abilities["Regrowth"].spellPower *= 1.3
                caster.abilities["Regrowth"].cost /= 2
                //TODO: , Rejuvenation, Swiftmend, Wild Growth
                this.affinity = "Restoration"
            } else if (caster.abilities["Feral Affinity"] && caster.abilities["Feral Affinity"].talentSelect) {
                //TODO: Shred, Rake, Rip, FerociousBite
                this.affinity = "Feral"
            } else if (caster.abilities["Balance Affinity"] && caster.abilities["Balance Affinity"].talentSelect) {

                //TODO: Wrath, Sunfire, Starsurge, Starfire, Moonfire
                //TODO: Starsurge cast time = 0
                this.affinity = "Balance"
            } else if (caster.abilities["Guardian Affinity"] && caster.abilities["Guardian Affinity"].talentSelect) {

                this.affinity = "Guardian"
            }
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true

        }
        return false
    }

    endBuff(caster) {
        if (this.affinity==="Restoration") {
            caster.abilities["Regrowth"].spellPower /= 1.3
            caster.abilities["Regrowth"].cost *= 2
        } else if (this.affinity==="Feral") {

        } else if (this.affinity==="Balance") {

        } else if (this.affinity==="Guardian") {

        }
    }

}
//------------------------------------------------------------------------------------------------ROW5
class SouloftheForest extends Ability {
    constructor() {
        super("Soul of the Forest", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return "Swiftmend increases the healing of your next Regrowth or Rejuvenation by 200%, or your next Wild Growth by 75%."
    }

}
//------------------------------------------------
class Cultivation extends Ability {
    constructor() {
        super("Cultivation", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
        this.spellPower = 0.288
    }

    getTooltip() {
        return "When Rejuvenation heals a target below 60% health, it applies Cultivation to the target, healing them for (28.8% of Spell power) over 6 sec."
    }

    applyHot(caster,target) {
        if (this.talentSelect && target.health/target.maxHealth<0.6) {
            applyHot(caster,target,this)
        }
    }
}
//------------------------------------------------
class IncarnationTreeofLife extends Ability {
    constructor() {
        super("Incarnation: Tree of Life", 0, 1.5, 0, 180, false, false, false, "nature", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 30
    }

    getTooltip() {
        return "Shapeshift into the Tree of Life, increasing healing done by 15%, increasing armor by 120%, and granting protection from Polymorph effects." +
            " Functionality of Rejuvenation, Wild Growth, Regrowth, and Entangling Roots is enhanced.<br>" +
            "<br>" +
            "Lasts 30 sec. You may shapeshift in and out of this form for its duration." //TODO: YOU CANT
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true

        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW6
class InnerPeace extends Ability {
    constructor() {
        super("Inner Peace", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 8
        this.effect = [{name:"damageReduction",val:0.2}] //TODO:immune to knockbacks.
        //TODO:Duration (haste)
    }

    getTooltip() {
        return "Reduces the cooldown of Tranquility by 60 sec.<br>" +
            "<br>" +
            "While channeling Tranquility, you take 20% reduced damage and are immune to knockbacks."
    }

    setTalent(caster) {
        caster.abilities["Tranquility"].cd -= 60
        caster.abilities["Tranquility"].maxCd -= 60
    }

    unsetTalent(caster) {
        caster.abilities["Tranquility"].cd += 60
        caster.abilities["Tranquility"].maxCd += 60
    }

}
//------------------------------------------------
class SpringBlossoms extends Ability {
    constructor() {
        super("Spring Blossoms", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 6
        this.spellPower = 0.216
    }

    getTooltip() {
        return "Each target healed by Efflorescence is healed for an additional (21.6% of Spell power) over 6 sec."
    }

}
//------------------------------------------------
class Overgrowth extends Ability {
    constructor() {
        super("Overgrowth", 2.4, 1.5, 0, 60, false, false, false, "nature", 40, 1)
        this.talent = true
    }

    getTooltip() {
        return "Apply Lifebloom, Rejuvenation, Wild Growth, and Regrowth's heal over time effect to an ally."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let target = caster.castTarget
            if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                target = caster
            }
            caster.abilities["Lifebloom"].caster = caster
            applyHot(caster,target,caster.abilities["Lifebloom"])
            applyHot(caster,target,caster.abilities["Rejuvenation"])
            applyHot(caster,target,caster.abilities["Wild Growth"])
            applyHot(caster,target,caster.abilities["Regrowth"],undefined,undefined,caster.abilities["Regrowth"].spellPowerHot)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true

        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW7
class Photosynthesis extends Ability {
    constructor() {
        super("Photosynthesis", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//While your Lifebloom is on yourself, your periodic heals heal 20% faster.<br>" +
            "<br>" +
            "While your Lifebloom is on an ally, your periodic heals on them have a 4% chance to cause it to bloom."
    }

}
//------------------------------------------------
class Germination extends Ability {
    constructor() {
        super("Germination", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 1.45*1.10
        this.duration = 17
    }

    getTooltip() {
        return "You can apply Rejuvenation twice to the same target. Rejuvenation's duration is increased by 2 sec."
    }

    setTalent(caster) {
       caster.abilities["Rejuvenation"].duration += 2
    }

    unsetTalent(caster) {
        caster.abilities["Rejuvenation"].duration += 2
    }
}
//------------------------------------------------
class Flourish extends Ability {
    constructor() {
        super("Flourish", 0, 1.5, 0, 90, false, false, false, "nature", 60, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 8
    }

    getTooltip() {
        return "Extends the duration of all of your heal over time effects on friendly targets within 60 yards by 8 sec, and increases the rate of your heal over time effects by 100% for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Heal over time spells are healing 100% faster."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<friendlyTargets.length; i++) {
                if (!friendlyTargets[i].isDead && this.checkDistance(caster,friendlyTargets[i],undefined,true)) {
                    for (let j = 0; j<friendlyTargets[i].buffs.length; j++) {
                        if (friendlyTargets[i].buffs[j].type === "hot" && friendlyTargets[i].buffs[j].caster === caster) {
                            friendlyTargets[i].buffs[j].duration += 8
                        }
                    }
                }
            }

            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true

        }
        return false
    }

}