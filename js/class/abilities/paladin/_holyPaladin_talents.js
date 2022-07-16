let _holyPaladin_talents = function(caster) {
    //1
    caster.abilities["Crusader's Might"] = new CrusadersMight()
    caster.abilities["Bestow Faith"] = new BestowFaith()
    caster.abilities["Light's Hammer"] = new LightsHammer()

    //2
    caster.abilities["Saved by the Light"] = new SavedbytheLight()
    caster.abilities["Judgment of Light"] = new JudgmentofLight()
    caster.abilities["Holy Prism"] = new HolyPrism()

    //3
    caster.abilities["Fist of Justice"] = new FistofJustice()
    caster.abilities["Repentance"] = new Repentance()
    caster.abilities["Blinding Light"] = new BlindingLight()

    //4
    caster.abilities["Unbreakable Spirit"] = new UnbreakableSpirit()
    caster.abilities["Cavalier"] = new Cavalier()
    caster.abilities["Rule of Law"] = new RuleofLaw()

    //5
    caster.abilities["Divine Purpose"] = new DivinePurpose()
    caster.abilities["Holy Avenger"] = new HolyAvenger()
    caster.abilities["Seraphim"] = new Seraphim()

    //6
    caster.abilities["Sanctified Wrath"] = new SanctifiedWrath()
    caster.abilities["Avenging Crusader"] = new AvengingCrusader()
    caster.abilities["Awakening"] = new Awakening()

    //7
    caster.abilities["Glimmer of Light"] = new GlimmerofLight()
    caster.abilities["Beacon of Faith"] = new BeaconofFaith()
    caster.abilities["Beacon of Virtue"] = new BeaconofVirtue()


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
class SavedbytheLight extends Ability {
    constructor() {
        super("Saved by the Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//When an ally with your Beacon of Light is damaged below 30% health, they absorb the next [Spell power * 4 * (1 + Versatility)] damage.<br>" +
            "<br>" +
            "You cannot shield the same person this way twice within 1 min."
    }
}
//------------------------------------------------
class JudgmentofLight extends Ability {
    constructor() {
        super("Judgment of Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.07
        this.maxStacks = 25
        this.duration = 30
        this.effect = [{name:"judgmentofLight",val:25}]
    }

    getTooltip() {
        return "Judgment causes the next 25 successful attacks against the target to heal the attacker for "+spellPowerToNumber(this.spellPower)+"."
    }
}
//------------------------------------------------
class HolyPrism extends Ability {
    constructor() {
        super("Holy Prism", 2.6, 1.5, 0, 20, false, false, false, "holy", 40, 1)
        this.talent = true
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Fires a beam of light that scatters to strike a clump of targets.\n" +
            "\n" +
            "If the beam is aimed at an enemy target, it deals (75% of Spell power) Holy damage and radiates (70% of Spell power) healing to 5 allies within 15 yards.\n" +
            "\n" +
            "If the beam is aimed at a friendly target, it heals for (140% of Spell power) and radiates (45% of Spell power) Holy damage to 5 enemies within 15 yards."
    }
}
//------------------------------------------------------------------------------------------------ROW3
class FistofJustice extends Ability {
    constructor() {
        super("Fist of Justice", 0, 0, 0, 0, false, false, false, "holy", 0, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Each Holy Power spent reduces the remaining cooldown on Hammer of Justice by 2 sec."
    }
}
//------------------------------------------------
class Repentance extends Ability {
    constructor() {
        super("Repentance", 1.2, 1.5, 1.7, 15, false, true, false, "holy", 30, 1)
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"incapacitate"}]
        this.duration = 60
    }

    getTooltip() {
        return "Forces an enemy target to meditate, incapacitating them for 1 min.<br>" +
            "<br>" +
            "Usable against Humanoids, Demons, Undead, Dragonkin, and Giants."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.checkDistance(caster,target) && !target.isDead) {
            applyDebuff(caster,target,this)
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
        }
    }

}
//------------------------------------------------
class BlindingLight extends Ability {
    constructor() {
        super("Blinding Light", 1.2, 1.5, 0, 90, false, false, false, "holy", 10, 1)
        this.talent = true
        this.duration = 6
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Emits dazzling light in all directions, blinding enemies within 10 yards, causing them to wander disoriented for 6 sec. Non-Holy damage will break the disorient effect."
    }

}
//------------------------------------------------------------------------------------------------ROW4
class UnbreakableSpirit extends Ability {
    constructor() {
        super("Unbreakable Spirit", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
    }

    getTooltip() {
        if (player.spec==="holyPaladin") {
            return "Reduces the cooldown of your Divine Shield, Divine Protection and Lay on Hands by 30%."
        } else if (player.spec==="retribution") {
            return "Reduces the cooldown of your Divine Shield, Shield of Vengeance, Divine Protection and Lay on Hands by 30%."
        } else if (player.spec==="protectionPaladin") {
            return "Reduces the cooldown of your Divine Shield, Ardent Defender, Divine Protection and Lay on Hands by 30%."
        }
    }

    setTalent(caster) {
        caster.abilities["Divine Shield"].cd *= 0.7
        caster.abilities["Divine Shield"].maxCd *= 0.7
        caster.abilities["Lay on Hands"].cd *= 0.7
        caster.abilities["Lay on Hands"].maxCd *= 0.7

        if (caster.spec==="retribution") {
            caster.abilities["Shield of Vengeance"].cd *= 0.7
            caster.abilities["Shield of Vengeance"].maxCd *= 0.7
        } else if (caster.spec==="protectionPaladin") {
            caster.abilities["Ardent Defender"].cd *= 0.7
            caster.abilities["Ardent Defender"].maxCd *= 0.7
        }
    }

    unsetTalent(caster) {
        caster.abilities["Divine Shield"].cd /= 0.7
        caster.abilities["Divine Shield"].maxCd /= 0.7
        caster.abilities["Lay on Hands"].cd /= 0.7
        caster.abilities["Lay on Hands"].maxCd /= 0.7

        if (caster.spec==="retribution") {
            caster.abilities["Shield of Vengeance"].cd /= 0.7
            caster.abilities["Shield of Vengeance"].maxCd /= 0.7
        } else if (caster.spec==="protectionPaladin") {
            caster.abilities["Ardent Defender"].cd /= 0.7
            caster.abilities["Ardent Defender"].maxCd /= 0.7
        }
    }

}
//------------------------------------------------
class Cavalier extends Ability {
    constructor() {
        super("Cavalier", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Divine Steed now has 2 charges."
    }

    setTalent(caster) {
        caster.abilities["Divine Steed"].charges ++
        caster.abilities["Divine Steed"].maxCharges ++
    }

    unsetTalent(caster) {
        caster.abilities["Divine Steed"].charges --
        caster.abilities["Divine Steed"].maxCharges --
    }

}
//------------------------------------------------
class RuleofLaw extends Ability {
    constructor() {
        super("Rule of Law", 0, 0, 0, 30, false, false, false, "holy", 5, 2)
        this.talent = true
        this.noGcd = true
        this.duration = 10
    }

    getTooltip() {
        return "Increase the range of your heals and the reach of Mastery: Lightbringer by 50% for 10 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Range of heals and reach of Lightbringer increased by 50%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)

            caster.abilities["Lightbringer"].minVal = 20
            caster.abilities["Lightbringer"].maxVal = 60

            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Lightbringer"].minVal = 10
        caster.abilities["Lightbringer"].maxVal = 40
    }

}
//------------------------------------------------------------------------------------------------ROW5
class DivinePurpose extends Ability {
    constructor() {
        super("Divine Purpose", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 12

    }

    getTooltip() { //TODO:TemplarsVerdict, DivineStorm, ExecutionSentence, JusticarsVengeance,  ShieldOfTheRighteous, FinalVerdict
        return "Holy Power abilities have a 15% chance to make your next Holy Power ability free and deal 20% increased damage and healing."
    }

}
//------------------------------------------------
class HolyAvenger extends Ability {
    constructor() {
        super("Holy Avenger", 0, 0, 0, 180, false, false, false, "holy", 5, 1)
        this.talent = true
        this.duration = 20

    }

    getTooltip() {
        return "Your Holy Power generation is tripled for 20 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your Holy Power generation is tripled."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(0)
            return true
        }
        return false
    }

}
//------------------------------------------------
class Seraphim extends Ability {
    constructor() {
        super("Seraphim", 0, 1.5, 0, 45, false, false, false, "holy", 5, 1)
        this.talent = true
        this.duration = 15
        this.secCost = 3
        this.effect = [{name:"increaseStat",stat:"haste",val:8},{name:"increaseStat",stat:"crit",val:8},{name:"increaseStat",stat:"mastery",val:12}]

    }

    getTooltip() {
        if (player.spec==="holyPaladin") {
            return "The Light magnifies your power for 15 sec, granting 8% Haste, Critical Strike, and Versatility, and 12% Mastery."
        } else if (player.spec==="retribution") {
            return "The Light magnifies your power for 15 sec, granting 8% Haste, Critical Strike, and Versatility, and 12.8% Mastery."
        } else if (player.spec==="protectionPaladin") {
            return "The Light magnifies your power for 15 sec, granting 8% Haste, Critical Strike, and Versatility, and 8% Mastery."
        }
    }

    getBuffTooltip(caster, target, buff) {
        if (player.spec==="holyPaladin") {
            return "Haste, Critical Strike, and Versatility increased by 8%, and Mastery increased by 12%."
        } else if (player.spec==="retribution") {
            return "Haste, Critical Strike, and Versatility increased by 8%, and Mastery increased by 12.8%."
        } else if (player.spec==="protectionPaladin") {
            return "Haste, Critical Strike, and Versatility increased by 8%, and Mastery increased by 8%."
        }
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.spec==="retribution") {
                this.effect[3].val = 12.8
            } else if (caster.spec==="protectionPaladin") {
                this.effect[3].val = 8
            }
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(0)
            return true
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW6
class SanctifiedWrath extends Ability {
    constructor() {
        super("Sanctified Wrath", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        if (player.spec==="holyPaladin") {
            return "Avenging Wrath lasts 25% longer and also reduces Holy Shock's cooldown by 40%."
        } else {
            return "Avenging Wrath lasts 25% longer and causes Judgment to generate 1 additional Holy Power."
        }

    }

    setTalent(caster) {
        caster.abilities["Avenging Wrath"].duration *= 1.2
    }

    unsetTalent(caster) {
        caster.abilities["Avenging Wrath"].duration /= 1.2
    }


}
//------------------------------------------------
class AvengingCrusader extends Ability {
    constructor() {
        super("Avenging Crusader", 10, 0, 0, 120, false, false, false, "holy", 5, 1)
        this.talent = true
        this.duration = 20
        this.noGcd = true

    }

    getTooltip() {
        return "You become the ultimate crusader of light, increasing your Crusader Strike, Judgment, and auto-attack damage by 30%.<br>" +
            "<br>" +
            "Crusader Strike and Judgment cool down 30% faster and heal up to 3 injured allies for 250% of the damage they deal. Lasts 20 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Crusader Strike, Judgment and auto-attack damage increased by 30%.<br>" +
            "<br>" +
            "Crusader Strike and Judgment cool down 30% faster.<br>" +
            "<br>" +
            "3 nearby allies will be healed for 250% of the damage done."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            caster.abilities["Crusader Strike"].spellPower *= 1.3
            caster.abilities["Judgment"].spellPower *= 1.3
            //TODO:AUTOATTACK

            caster.abilities["Crusader Strike"].cd *= 1.3
            caster.abilities["Judgment"].cd *= 1.3
            caster.abilities["Crusader Strike"].maxCd *= 1.3
            caster.abilities["Judgment"].maxCd *= 1.3

            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(0)
            return true
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Crusader Strike"].spellPower /= 1.3
        caster.abilities["Judgment"].spellPower /= 1.3

        caster.abilities["Crusader Strike"].cd /= 1.3
        caster.abilities["Judgment"].cd /= 1.3
        caster.abilities["Crusader Strike"].maxCd /= 1.3
        caster.abilities["Judgment"].maxCd /= 1.3
    }

}
//------------------------------------------------
class Awakening extends Ability {
    constructor() {
        super("Awakening", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Word of Glory and Light of Dawn have a 15% chance to grant you Avenging Wrath for 10 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW7
class GlimmerofLight extends Ability {
    constructor() {
        super("Glimmer of Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.16
        this.spellPowerHeal = 0.3
        this.duration = 30
    }

    getTooltip() {
        return "Holy Shock leaves a Glimmer of Light on the target for 30 sec.  When you Holy Shock, all targets with Glimmer of Light are damaged for (16% of Spell power) or healed for (38% of Spell power)."
    }
}
//------------------------------------------------
class BeaconofFaith extends Ability {
    constructor() {
        super("Beacon of Faith", 0.625, 1.5, 0, 0, false, false, false, "holy", 60, 1)
        this.talent = true
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Mark a second target as a Beacon, mimicking the effects of Beacon of Light. Your heals will now heal both of your Beacons, but at 30% reduced effectiveness."
    }

    getBuffTooltip(caster, target, buff) {
        return "Healed whenever the "+caster.name+" directly heals a nearby ally."
    }
}
//------------------------------------------------
class BeaconofVirtue extends Ability {
    constructor() {
        super("Beacon of Virtue", 2, 1.5, 0, 15, false, false, false, "holy", 40, 1)
        this.talent = true
        this.duration = 8
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Apply a Beacon of Light to your target and 3 injured allies within 30 yards for 8 sec.\n" +
            "\n" +
            "All affected allies will be healed for 50% of the amount of your other healing done.\n" +
            "\n" +
            "Your Flash of Light and Holy Light on these targets will also grant 1 Holy Power"
    }

    getBuffTooltip(caster, target, buff) {
        return "Healed whenever the "+caster.name+" heals a nearby ally."
    }
}