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
    caster.abilities["Soul of the Forest"] = new SouloftheForestGuardian()
    caster.abilities["Galactic Guardian"] = new GalacticGuardian()
    caster.abilities["Incarnation: Guardian of Ursoc"] = new IncarnationGuardianofUrsoc()

    //6
    caster.abilities["Earthwarden"] = new Earthwarden()
    caster.abilities["Survival of the Fittest"] = new SurvivaloftheFittest()
    caster.abilities["Guardian of Elune"] = new GuardianofElune()

    //7
    caster.abilities["Rend and Tear"] = new RendandTear()
    caster.abilities["Tooth and Claw"] = new ToothandClaw()
    caster.abilities["Pulverize"] = new Pulverize()

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
        this.talentSelect = true
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
class SouloftheForestGuardian extends Ability {
    constructor() {
        super("Soul of the Forest", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Mangle generates 5 more Rage and deals 25% more damage."
    }

    setTalent(caster) {
        caster.abilities["Mangle"].cost -= 5
        caster.abilities["Mangle"].spellPower *= 1.25
    }
    unsetTalent(caster) {
        caster.abilities["Mangle"].cost += 5
        caster.abilities["Mangle"].spellPower /= 1.25
    }
}
//------------------------------------------------
class GalacticGuardian extends Ability {
    constructor() {
        super("Galactic Guardian", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:Proc chance: 5%
        return "//NOT IMPLEMENTED//Your damage has a 5% chance to trigger a free automatic Moonfire on that target.\n" +
            "\n" +
            "When this occurs, the next Moonfire you cast generates 8 Rage, and deals 300% increased direct damage."
    }

}
//------------------------------------------------
class IncarnationGuardianofUrsoc extends Ability {
    constructor() {
        super("Incarnation: Guardian of Ursoc", 0, 0, 0, 180, false, false, false, "arcane", 5, 1)
        this.talent = true
        this.canCastForm = "Bear Form"
        this.duration = 30
        this.effect = [{name:"increaseHealth",val:0.3}]
    }

    getTooltip() { //TODO:causes Mangle to hit up to 3 targets
        return "An improved Bear Form that grants the benefits of Berserk, causes Mangle to hit up to 3 targets, and increases maximum health by 30%.<br>" +
            "<br>" +
            "Lasts 30 sec. You may freely shapeshift in and out of this improved Bear Form for its duration."
    }

    getBuffTooltip(caster, target, buff) {
        return "Cooldowns of Mangle, Thrash, Growl, and Frenzied Regeneration are reduced by 50%.<br>" +
            "Ironfur cost reduced by 50%.<br>" +
            "Mangle hits up to 3 targets.<br>" +
            "Health increased by 30%."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            caster.abilities["Mangle"].maxCd /= 2
            caster.abilities["Thrash"].maxCd /= 2
            caster.abilities["Growl"].maxCd /= 2
            caster.abilities["Frenzied Regeneration"].maxCd /= 2
            caster.abilities["Ironfur"].cost /= 2
            applyBuff(caster,caster,this)
            caster.health += (caster.stats.stamina*20) * 0.3
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }


    setTalent(caster) {
        caster.abilities["Berserk"].canUse = false
        replaceAction(caster, "Berserk", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Berserk"].canUse = true
        replaceAction(caster,this.name,"Berserk")
    }

    endBuff(caster) {
        caster.abilities["Mangle"].maxCd *= 2
        caster.abilities["Thrash"].maxCd *= 2
        caster.abilities["Growl"].maxCd *= 2
        caster.abilities["Frenzied Regeneration"].maxCd *= 2
        caster.abilities["Ironfur"].cost *= 2
    }

}
//------------------------------------------------------------------------------------------------ROW6
class Earthwarden extends Ability {
    constructor() {
        super("Earthwarden", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.maxStacks = 3
        this.duration = 10
        this.effect = [{name:"damageReductionStacks",val:0.02}]
    }

    getTooltip() { //When you deal direct damage with Thrash, you gain a charge of Earthwarden, reducing the damage of the next auto attack you take by 30%. Earthwarden may have up to 3 charges.
        return "When you deal direct damage with Thrash, you gain a charge of Earthwarden, reducing all damage taken by 2% for 10 seconds. Earthwarden may have up to 3 stacks."
    }
    getBuffTooltip(caster, target, buff) {
        return "Damage reduced by "+buff.stacks*2+"%."
    }

}
//------------------------------------------------
class SurvivaloftheFittest extends Ability {
    constructor() {
        super("Survival of the Fittest", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldowns of Barkskin and Survival Instincts by 33%."
    }

    setTalent(caster) {
        caster.abilities["Barkskin"].cd *= 0.67
        caster.abilities["Barkskin"].maxCd *= 0.67
        caster.abilities["Survival Instincts"].cd *= 0.67
        caster.abilities["Survival Instincts"].maxCd *= 0.67
    }
    unsetTalent(caster) {
        caster.abilities["Barkskin"].cd /= 0.67
        caster.abilities["Barkskin"].maxCd /= 0.67
        caster.abilities["Survival Instincts"].cd /= 0.67
        caster.abilities["Survival Instincts"].maxCd /= 0.67
    }

}
//------------------------------------------------
class GuardianofElune extends Ability {
    constructor() {
        super("Guardian of Elune", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Mangle increases the duration of your next Ironfur by 2 sec, or the healing of your next Frenzied Regeneration by 20%."
    }

}
//------------------------------------------------------------------------------------------------ROW7
class RendandTear extends Ability {
    constructor() {
        super("Rend and Tear", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"damageReductionStacks",val:0.02},{name:"increaseDamage",val:0.02}] //TODO: NOT ALL
        this.duration = 15
        this.maxStacks = 3
    }

    getTooltip() {
        return "Each stack of Thrash reduces the target's damage to you by 2% and increases your damage to them by 2%."
    }

}
//------------------------------------------------
class ToothandClaw extends Ability {
    constructor() {
        super("Tooth and Claw", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Autoattacks have a 20% chance to empower your next Maul, stacking up to 2 times.\n" +
            "\n" +
            "Empowered Maul deals 40% increased damage and reduces the target's damage to you by 15% for 6 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next Maul deals 40% more damage and reduces the target's damage to you by 15%~ for 6 sec."
    }

}
//------------------------------------------------
class Pulverize extends Ability {
    constructor() {
        super("Pulverize", 0, 1.5, 0, 45, false, false, false, "physical", 5, 1)
        this.talent = true
        this.duration = 10
        this.spellPower = 0.969306
        this.canCastForm = "Bear Form"
    }

    getTooltip() {
        return "A devastating blow that consumes 2 stacks of your Thrash on the target to deal "+spellPowerToNumber(this.spellPower)+" Physical damage and reduce the damage they deal to you by 35% for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    applyDebuff(caster,caster.castTarget,this)
                    done = true
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}