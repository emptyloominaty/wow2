class HolyPriest_abilities {
    "Flash Heal" = new FlashHeal()
    "Heal" = new Heal()
    "Renew" = new Renew()
    "Holy Fire" = new HolyFire()
    "Smite" = new Smite()
    "Shadow Word: Pain" = new ShadowWordPain()
    "Holy Nova" = new HolyNova()
    "Divine Hymn" = new DivineHymn()
    "Holy Word: Serenity" = new HolyWordSerenity()
    "Circle of Healing" = new CircleofHealing()
    "Holy Word: Sanctify" = new HolyWordSanctify()
    "Holy Word: Chastise" = new HolyWordChastise()
    "Prayer of Healing" = new PrayerofHealing()
    "Prayer of Mending" = new PrayerofMending()
    "Shackle Undead" = new ShackleUndead()
    "Leap of Faith" = new LeapofFaith()
    "Power Infusion" = new PowerInfusion()
    "Purify" = new Purify()
    "Desperate Prayer" = new DesperatePrayer()
    "Resurrection" = new Resurrection()
    "Mass Resurrection" = new MassResurrection()
    "Guardian Spirit" = new GuardianSpirit()

    //passive
    "Echo of Light" = new EchoofLight()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}


class EchoofLight extends Ability {
    constructor() {
        let name = "Echo of Light"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "holy"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 6
        this.effect = []
        this.passive = true
    }
    startCast(caster,target,ability){
        applyHot(caster, target, this,undefined,undefined,ability.spellPower*(caster.stats.mastery/100))
    }
    endCast() {
    }
}