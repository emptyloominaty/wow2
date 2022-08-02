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

    //passive
    "Weakened Soul" = new WeakenedSoul()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}