class restoDruid_abilities {
    "Regrowth" = new Regrowth(true)
    "Rejuvenation" = new Rejuvenation()
    "Wild Growth" = new WildGrowth()
    "Wrath" = new Wrath()
    "Moonfire" = new Moonfire()
    "Sunfire" = new Sunfire()
    "Efflorescence" = new Efflorescence()
    "Swiftmend" = new Swiftmend()
    "Tranquility" = new Tranquility()
    "Innervate" = new Innervate()
    "Barkskin" = new Barkskin()
    "Ironbark" = new Ironbark()
    "Revive" = new Revive()
    "Revitalize" = new Revitalize()
    "Nature's Cure" = new NaturesCure()
    "Rebirth" = new Rebirth()
    "Lifebloom" = new Lifebloom()
    "Nature's Swiftness" = new NaturesSwiftness()
    "Cat Form" = new CatForm()
    "Bear Form" = new BearForm()
    "Growl" = new Growl()
    "Dash" = new Dash()
    "Stampeding Roar" = new StampedingRoar()
    "Entangling Roots" = new EntanglingRoots()

    "Starfire" = new Starfire(true)
    "Starsurge" = new Starsurge(true)
    "Moonkin Form" = new MoonkinForm(true)

    //TODO:
    //Entangling Roots
    //Ursol's Vortex
    //Cyclone
    //Hibernate

    //passive
    "Harmony" = new Harmony()
    "Ysera's Gift" = new YserasGift()
    "Omen of Clarity" = new OmenofClarity()
    "InnervateSelf" = new InnervateSelf()
    "Clearcasting" = new Clearcasting()
    "Soothe" = new Soothe()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}

class Harmony extends Ability {
    constructor() {
        let name = "Harmony"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.mastery = true
    }

    getTooltip() {
        return "Your healing is increased by "+player.stats.mastery.toFixed(1)+"% for each of your Restoration heal over time effects on the target."
    }

}
//-----------------------------------
class YserasGift extends Ability {
    constructor() {
        let name = "Ysera's Gift"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 100
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
        this.timer1 = 0
        this.timer2 = 5
    }

    getTooltip() {
        return "Heals you for 3% of your maximum health every 5 sec. If you are at full health, an injured party or raid member will be healed instead."
    }

    run(caster) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            let val = caster.maxHealth * 0.03
            if (caster.health/caster.maxHealth<1) {
                doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,val)
            } else {
                for (let i = 0; i<friendlyTargets.length; i++) {
                    if (!friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth && this.checkDistance(caster,friendlyTargets[i],undefined,true)) {
                        doHeal(caster,friendlyTargets[i],this,undefined,undefined,false,undefined,undefined,val)
                        break
                    }
                }
            }
            this.timer1 = 0
        }
    }

}

//-----------------------------------
class OmenofClarity extends Ability {
    constructor() {
        let name = "Omen of Clarity"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true
    }

    getTooltip() {
        return "Your healing over time from Lifebloom has a 4% chance to cause a Clearcasting state, making your next Regrowth cost no mana."
    }
}

//-----------------------------------
class Clearcasting extends Ability {
    constructor() {
        super("Clearcasting", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.passive = true
        this.hiddenSB = true
        this.duration = 15
    }

   getBuffTooltip(caster, target, buff) {
       return "Your next Regrowth is free."
   }

}