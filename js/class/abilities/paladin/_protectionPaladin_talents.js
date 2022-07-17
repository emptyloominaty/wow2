let _protectionPaladin_talents = function(caster) {
    //1
    caster.abilities["Holy Shield"] = new HolyShield()
    caster.abilities["Redoubt"] = new Redoubt()
    caster.abilities["Blessed Hammer"] = new BlessedHammer()

    //2
    caster.abilities["First Avenger"] = new FirstAvenger()
    caster.abilities["Crusader's Judgment"] = new CrusadersJudgment()
    caster.abilities["Moment of Glory"] = new MomentofGlory()

    //3
    caster.abilities["Fist of Justice"] = new FistofJustice()
    caster.abilities["Repentance"] = new Repentance()
    caster.abilities["Blinding Light"] = new BlindingLight()

    //4
    caster.abilities["Unbreakable Spirit"] = new UnbreakableSpirit()
    caster.abilities["Cavalier"] = new Cavalier()
    caster.abilities["Blessing of Spellwarding"] = new BlessingofSpellwarding()

    //5
    caster.abilities["Divine Purpose"] = new DivinePurpose()
    caster.abilities["Holy Avenger"] = new HolyAvenger()
    caster.abilities["Seraphim"] = new Seraphim()

    //6
    caster.abilities["Hand of the Protector"] = new HandoftheProtector()
    caster.abilities["Consecrated Ground"] = new ConsecratedGround()
    caster.abilities["Judgment of Light"] = new JudgmentofLight()

    //7
    caster.abilities["Sanctified Wrath"] = new SanctifiedWrath()
    caster.abilities["Righteous Protector"] = new RighteousProtector()
    caster.abilities["Final Stand"] = new FinalStand()


    caster.talents = [["Holy Shield","Redoubt","Blessed Hammer"],
        ["First Avenger","Crusader's Judgment","Moment of Glory"],
        ["Fist of Justice","Repentance","Blinding Light"],
        ["Unbreakable Spirit","Cavalier","Blessing of Spellwarding"],
        ["Divine Purpose","Holy Avenger","Seraphim"],
        ["Hand of the Protector","Consecrated Ground","Judgment of Light"],
        ["Sanctified Wrath","Righteous Protector","Final Stand"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class HolyShield extends Ability {
    constructor() {
        super("Holy Shield", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.passive = true
        this.spellPower = 0.09828
    }

    getTooltip() {//TODO:you are able to block spells
        return "Your block chance is increased by 15%, you are able to block spells, and your successful blocks deal "+spellPowerToNumber(this.spellPower)+" Holy damage to your attacker."
    }

    setTalent(caster) {
        caster.statsBup.block += 15
    }

    unsetTalent(caster) {
        caster.statsBup.block -= 15
    }

}
//------------------------------------------------
class Redoubt extends Ability {
    constructor() {
        super("Redoubt", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.talent = true
        this.passive = true
        this.duration = 10
        this.maxStacks = 3
        this.effect = [{name:"increaseStat",stat:"primary",val:2,percent:true},{name:"increaseStat",stat:"stamina",val:2,percent:true}]
    }

    getTooltip() {
        return "Shield of the Righteous increases your Strength and Stamina by 2% for 10 sec, stacking up to 3."
    }

    getBuffTooltip(caster, target, buff) {
        return  "Strength and Stamina increased by "+2*buff.stacks+"%."
    }
}
//------------------------------------------------
class BlessedHammer extends Ability {
    constructor() {
        super("Blessed Hammer", 0, 1.5, 0, 6, false, false, false, "holy", 8, 3)
        this.talent = true

        this.hasteCd = true
        this.duration = 10
        this.secCost = -1
        this.spellPower = 0.1
        this.duration = 5
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Throws a Blessed Hammer that spirals outward, dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to enemies and reducing the next damage they deal to you by (Attack power * 30 / 100).<br>" +
            "<br>" +
            "Generates 1 Holy Power."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class FirstAvenger extends Ability {
    constructor() {
        super("First Avenger", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
        this.passive = true
        this.duration = 8
        this.effect = [{name:"absorb",val:0}]
    }

    getTooltip() {
        return "Avenger's Shield hits 2 additional targets, and grants you an absorb shield for 100% of all damage it deals."
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbing "+buff.effect[0].val+" damage."
    }

    setTalent(caster) {
        caster.abilities["Avenger's Shield"].jumptargets += 2
    }

    unsetTalent(caster) {
        caster.abilities["Avenger's Shield"].jumptargets -= 2
    }

    applyAbsorb(caster,damage) {
        this.effect[0].val = damage
        applyBuff(caster,caster,this)
    }
}
//------------------------------------------------
class CrusadersJudgment extends Ability {
    constructor() {
        super("Crusader's Judgment", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.passive = true
    }

    getTooltip() {
        return "Judgment now has 2 charges, and Grand Crusader now also grants a charge of Judgment."
    }

    setTalent(caster) {
        caster.abilities["Judgment"].charges = 2
        caster.abilities["Judgment"].maxCharges = 2
    }

    unsetTalent(caster) {
        caster.abilities["Judgment"].charges = 1
        caster.abilities["Judgment"].maxCharges = 1
    }
}
//------------------------------------------------
class MomentofGlory extends Ability {
    constructor() {
        super("Moment of Glory", 0, 0, 0, 90, false, false, false, "physical", 5, 1)
        this.talent = true
        this.noGcd = true
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Reset the cooldown of Avenger's Shield. Your next 3 Avenger's Shields have no cooldown and deal 20% additional damage."
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next 3 Avenger's Shields have no cooldown and deal 20% additional damage."
    }

}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
class BlessingofSpellwarding extends Ability {
    constructor() {
        super("Blessing of Spellwarding", 3, 1.5, 0, 180, false, false, false, "holy", 40, 1)
        this.talent = true
        this.duration = 10
        this.effect = [{name:"magicDamageReduction",val:1},{name:"immuneToMagic"}]
    }

    getTooltip() {
        return "Blesses a party or raid member, granting immunity to magical damage and harmful effects for 10 sec.<br>" +
            "<br>" +
            "Cannot be used on a target with Forbearance. Causes Forbearance for 30 sec." //TODO
    }

    getBuffTooltip(caster, target, buff) {
        return "Immune to magical damage and harmful effects."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            this.setCd()
            this.setGcd(caster)
            let target = caster.castTarget
            if (target==="" || Object.keys(target).length === 0 || this.isEnemy(caster,target) || target.isDead) {
                applyBuff(caster,caster,this)
            } else {
                applyBuff(caster,target,this)
            }
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    setTalent(caster) {
        caster.abilities["Blessing of Protection"].canUse = false
        replaceAction(caster, "Blessing of Protection", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Blessing of Protection"].canUse = true
        replaceAction(caster,this.name,"Blessing of Protection")
    }

}
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class HandoftheProtector extends Ability {
    constructor() {
        super("Hand of the Protector", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Word of Glory's healing is increased by the target's missing health, on any target."
    }

}
//------------------------------------------------
class ConsecratedGround extends Ability {
    constructor() {
        super("Consecrated Ground", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Your Consecration is 15% larger, and enemies within it have 50% reduced movement speed."
    }

    setTalent(caster) {
        caster.abilities["Consecration"].area.radius *= 1.15
        caster.abilities["Consecration"].duration = 2
        caster.abilities["Consecration"].effect = [{name:"moveSpeed",val:-0.5}] //TODO:DEBUFF
    }

    unsetTalent(caster) {
        caster.abilities["Consecration"].area.radius /= 1.15
        caster.abilities["Consecration"].duration = 0
        caster.abilities["Consecration"].effect = []
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
class RighteousProtector extends Ability {
    constructor() {
        super("Righteous Protector", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Each Holy Power spent reduces the remaining cooldown on Avenging Wrath and Guardian of Ancient Kings by 1 sec."
    }

}
//------------------------------------------------
class FinalStand extends Ability {
    constructor() {
        super("Final Stand", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//During Divine Shield, all targets within 15 yards are taunted."
    }

}