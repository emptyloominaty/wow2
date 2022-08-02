class Shadow_Abilities {
    "Power Word: Shield" = new PowerWordShield()
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

    //passive
    "Voidform" = new Voidform()
    "Weakened Soul" = new WeakenedSoul()
    "Shadow Weaving" = new ShadowWeaving()
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
//---------------------------------------
//---------------------------------------
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
