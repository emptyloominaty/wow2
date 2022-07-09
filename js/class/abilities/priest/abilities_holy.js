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
    "Fade" = new Fade()
    "Symbol of Hope" = new SymbolofHope()
    "Dispel Magic" = new DispelMagic()
    "Mass Dispel" = new MassDispel()
    "Shadow Word: Death" = new ShadowWordDeath()
    "Power Word: Shield" = new PowerWordShield()
    "Power Word: Fortitude" = new PowerWordFortitude()

    //TODO
    //Psychic Scream
    //Focused Will

    //passive
    "Echo of Light" = new EchoofLight()
    "Spirit of Redemption" = new SpiritofRedemption()
    "Weakened Soul" = new WeakenedSoul()
    "Holy Words" = new HolyWords()
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
        this.mastery = true
    }

    getTooltip() {
        return "Your direct healing spells heal for an additional "+spellPowerToNumber(player.stats.mastery)+" over 6 sec."
    }

    startCast(caster,target,ability){
        applyHot(caster, target, this,undefined,undefined,ability.spellPower*(caster.stats.mastery/100))
    }
}


class SpiritofRedemption extends Ability {
    constructor() {
        let name = "Spirit of Redemption"
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
        this.duration = 15
        this.effect = [{name:"reduceEnergyCost",val:1},{name:"cantDie"},{name:"root"}]
        this.passive = true
        this.used = false
    }

    getTooltip() {
        return "Upon death, you become the Spirit of Redemption for 15 sec. You cannot move, attack, be attacked, or be targeted by any spells or effects," +
            " and your healing spells cost no mana. When the effect ends, you die."
    }

    applyBuff(caster) {
        if (!this.used) {
            applyBuff(caster, caster, this)
            this.used = true
            return true
        }
        return false
    }

    endBuff(target) {
        target.health = -1
        target.die()
    }
}

class HolyWords extends Ability {
    constructor() {
        let name = "Holy Words"
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
        this.passive = true

        this.serenity = 6
        this.sanctify = 6
        this.sanctify2 = 2
        this.chastise = 4
        this.salvation = 30

    }

    getTooltip() {
        return "When you cast Flash Heal or Heal, the remaining cooldown on Holy Word: Serenity is reduced by 6 sec.<br>" +
            "<br>" +
            "When you cast Prayer of Healing, the remaining cooldown on Holy Word: Sanctify is reduced by 6 sec and by 2 sec when you cast Renew.<br>" +
            "<br>" +
            "When you cast Smite, the remaining cooldown on Holy Word: Chastise is reduced by 4 sec."
    }

}

