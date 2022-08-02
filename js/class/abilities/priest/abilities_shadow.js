class Shadow_Abilities {
    "Power Word: Shield" = new PowerWordShield(true)
    "Power Word: Fortitude" = new PowerWordFortitude(true)
    "Shackle Undead" = new ShackleUndead()
    "Leap of Faith" = new LeapofFaith(true)
    "Power Infusion" = new PowerInfusion()
    "Desperate Prayer" = new DesperatePrayer()
    "Resurrection" = new Resurrection(true)
    "Dispel Magic" = new DispelMagic(true)
    "Mass Dispel" = new MassDispel(true)
    "Fade" = new Fade()
    "Shadow Word: Death" = new ShadowWordDeath(true)
    "Shadow Word: Pain" = new ShadowWordPain(true)
    "Shadow Mend" = new ShadowMend()
    "Shadowfiend" = new Shadowfiend()
    "Mind Blast" = new MindBlast()
    "Purify Disease" = new PurifyDisease()
    "Silence" = new Silence()
    "Vampiric Touch" = new VampiricTouch()
    "Devouring Plague" = new DevouringPlague()
    "Void Eruption" = new VoidEruption()
    "Shadowform" = new Shadowform()
    "Void Bolt" = new VoidBolt()
    "Mind Flay" = new MindFlay()
    "Mind Sear" = new MindSear()
    "Vampiric Embrace" = new VampiricEmbrace()
    "Dispersion" = new Dispersion()

    //passive
    "Voidform" = new Voidform()
    "Weakened Soul" = new WeakenedSoul()
    "Shadow Weaving" = new ShadowWeaving()
    "Hallucinations" = new Hallucinations()
    "Shadowy Apparitions" = new ShadowyApparitions()
    "Dark Thought" = new DarkThought()
    "Dark Thoughts" = new DarkThoughts()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}
//---------------------------------------
class ShadowWeaving extends Ability {
    constructor() {
        super("Shadow Weaving", 0, 0, 0, 0, false, false, false, "shadow", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return  "Your damage is increased by "+player.stats.mastery.toFixed(1)+"% for each of Shadow Word: Pain, Vampiric Touch and Devouring Plague on the target." +
            " During Voidform, all targets receive the maximum effect."
    }

}
//---------------------------------------
class Hallucinations extends Ability {
    constructor() {
        super("Hallucinations", 0, 0, 0, 0, false, false, false, "shadow", 40, 1)
        this.passive = true
    }

    getTooltip() {//TODO:Vampiric Embrace
        return "Your successful Dispel Magic, Mass Dispel, Purify Disease, Vampiric Embrace, and Power Word: Shield casts generate 6 Insanity during combat."
    }

}
//---------------------------------------
class ShadowyApparitions extends Ability {
    constructor() {
        super("Shadowy Apparitions", 0, 0, 0, 0, false, false, false, "shadow", 40, 1)
        this.passive = true
        this.spellPower = 0.17
    }

    getTooltip() {
        return "When your Shadow Word: Pain damage over time critically strikes, you also create a shadowy version of yourself that floats towards the target and deals "+spellPowerToNumber(this.spellPower)+" Shadow damage."
    }

}
//---------------------------------------
class DarkThoughts extends Ability {
    constructor() {
        super("Dark Thoughts", 0, 0, 0, 0, false, false, false, "shadow", 40, 1)
        this.passive = true
    }

    getTooltip() {
        return "For each of your Shadow damage over time effects on the target, your Mind Flay and Mind Sear have a 3% chance to trigger a Dark Thought."
    }

}
class DarkThought extends Ability {
    constructor() {
        super("Dark Thought", 0, 0, 0, 0, false, false, false, "shadow", 40, 1)
        this.passive = true
        this.duration = 10
    }

    getTooltip() {
        return "Increases the number of charges of Mind Blast by 1, Mind Blast can be cast instantly, and can be cast while channelling Mind Flay or Mind Sear."
    }
    getBuffTooltip(caster, target, buff) {
        return "Increases the number of charges of Mind Blast by 1, Mind Blast can be cast instantly, and can be cast while channelling Mind Flay or Mind Sear."
    }

    getBuff(caster) {
        if (!checkBuff(caster,caster,"Dark Thought")) {
            caster.abilities["Mind Blast"].charges++
            caster.abilities["Mind Blast"].maxCharges++
        }
        applyBuff(caster,caster,this)
    }

    endBuff(caster) {
        caster.abilities["Mind Blast"].charges--
        caster.abilities["Mind Blast"].maxCharges--
    }

}
//---------------------------------------
class Shadowform extends Ability {
    constructor() {
        let name = "Shadowform"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.duration = 10
        this.permanentBuff = true
        this.effect = [{name:"increaseDamage",val:0.1}]
    }

    getTooltip() {
        return "Assume a Shadowform, increasing your spell damage dealt by 10%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Spell damage dealt increased by 10%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            applyBuff(caster,caster,this)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
