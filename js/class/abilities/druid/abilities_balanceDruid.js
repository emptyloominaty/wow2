class balanceDruid_abilities {
    "Regrowth" = new Regrowth()
    "Wrath" = new Wrath(true)
    "Moonfire" = new Moonfire(true)
    "Sunfire" = new Sunfire(true)
    "Starfire" = new Starfire()
    "Starsurge" = new Starsurge()
    "Starfall" = new Starfall()
    "Moonkin Form" = new MoonkinForm()
    "Celestial Alignment" = new CelestialAlignment()
    "Innervate" = new Innervate()
    "Barkskin" = new Barkskin()
    "Revive" = new Revive(false)
    "Rebirth" = new Rebirth(false)
    "Cat Form" = new CatForm()
    "Bear Form" = new BearForm()
    "Growl" = new Growl()
    "Dash" = new Dash()
    "Stampeding Roar" = new StampedingRoar()
    "Entangling Roots" = new EntanglingRoots(false)
    "Soothe" = new Soothe(false)
    "Remove Corruption" = new RemoveCorruption()
    "Solar Beam" = new SolarBeam()

    //passive
    "Eclipse" = new Eclipse()
    "Shooting Stars" = new ShootingStars()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}
}



class ShootingStars extends Ability {
    constructor() {
        let name = "Shooting Stars"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        this.spellPower = 0.36
        this.chance = 6.25
        this.passive = true
    }

    proc(caster,target) {
        if (getChance(this.chance)) {
            doDamage(caster,target,this)
        }
    }

}


class Eclipse extends Ability {
    constructor() {
        let name = "Eclipse"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 15
        this.effect = []
        this.passive = true

        this.solarStacks = 0
        this.lunarStacks = 0
        this.next = "none"
        this.solar = false
        this.lunar = false

        this.time = 0
        this.buffed = 0
        this.canCastForm = "Moonkin Form"
    }

    run(caster) {
        if (this.time>0) {
            this.time -= progressInSec
        } else {
            this.lunar = false
            this.solar = false
        }
    }

    getCastTime(caster,ability) {
        if (this.time>0) {
            if (this.next==="solar" && ability.name==="Starfire") {
                return 0.8
            } else if (this.next==="lunar" && ability.name==="Wrath") {
                return 0.8
            }
        }
        return 1
    }

    getDamage(caster,ability) {
        if (this.time>0) {
             if (this.next==="lunar" && ability.name==="Wrath") {
                return 1+(0.2+((1+this.buffed)*0.06))
            }
        }
        return 1
    }

    getCrit(caster,ability) {
        if (this.time>0) {
            if (this.next==="solar" && ability.name==="Starfire") {
                return 20 + ((1+this.buffed)*6)
            }
        }
        return 0
    }

    incBuff() {
        this.buffed++
    }

    startCast(caster,ability) {
        if ((this.next==="solar" || this.next==="none") && this.time<=0) {
            if (ability.name==="Starfire") {
                this.solarStacks++
            }
        }
        if ((this.next==="lunar" || this.next==="none") && this.time<=0) {
            if (ability.name==="Wrath") {
                this.lunarStacks++
            }
        }


        if(this.solarStacks===2)  {
            applyBuff(caster, caster, this,undefined,undefined,"Eclipse (Solar)")
            this.solar = true
            this.solarStacks = 0
            this.next = "lunar"
            this.time = this.duration
            this.buffed = 0
        } else if (this.lunarStacks===2) {
            applyBuff(caster, caster, this,undefined,undefined,"Eclipse (Lunar)")
            this.lunar = true
            this.lunarStacks = 0
            this.next = "solar"
            this.time = this.duration
            this.buffed = 0
        }

    }
    endCast() {
    }
}