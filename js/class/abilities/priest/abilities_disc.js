class Discipline_Abilities {
    "Power Word: Shield" = new PowerWordShield()
    "Power Word: Fortitude" = new PowerWordFortitude()
    "Holy Nova" = new HolyNova()
    "Shackle Undead" = new ShackleUndead()
    "Leap of Faith" = new LeapofFaith()
    "Power Infusion" = new PowerInfusion()
    "Purify" = new Purify()
    "Desperate Prayer" = new DesperatePrayer()
    "Resurrection" = new Resurrection()
    "Mass Resurrection" = new MassResurrection()
    "Dispel Magic" = new DispelMagic()
    "Mass Dispel" = new MassDispel()
    "Fade" = new Fade()
    "Shadow Word: Death" = new ShadowWordDeath()
    "Smite" = new Smite()
    "Shadow Word: Pain" = new ShadowWordPain()

    //passive
    "Atonement" = new Atonement()
    "Grace" = new Grace()
    "Weakened Soul" = new WeakenedSoul()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

//------------------------------------------------
class Atonement extends Ability {
    constructor() {
        super("Atonement", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.duration = 15
    }

    getTooltip() { //TODO: Shadow Mend, and Power Word: Radiance
        return "Power Word: Shield, Shadow Mend, and Power Word: Radiance apply Atonement to your target for 15 sec.<br>" +
            "<br>" +
            "Your spell damage heals all targets affected by Atonement for 50% of the damage done."
    }

    getBuffTooltip(caster, target, buff) {
        return "Healed whenever "+caster.name+" damages an enemy."
    }

    heal(caster,target,damage) {
        let heal = damage * 0.5
        doHeal(caster,target,this,undefined,undefined,undefined,undefined,undefined,heal)
    }

}
//------------------------------------------------
class Grace extends Ability {
    constructor() {
        super("Grace", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.mastery = true
    }

    getTooltip() { //TODO:
        return "Your healing and absorption is increased by "+player.stats.mastery.toFixed(1)+"% on targets with Atonement."
    }

}