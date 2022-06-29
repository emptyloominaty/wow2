let _brewmaster_talents = function(caster) {
    //1
    caster.abilities["Eye of the Tiger"] = new EyeoftheTiger()
    caster.abilities["Chi Wave"] = new ChiWave(caster.spec)
    caster.abilities["Chi Burst"] = new ChiBurst(caster.spec)

    //2
    caster.abilities["Chi Torpedo"] = new ChiTorpedo()
    caster.abilities["Celerity"] = new Celerity()
    caster.abilities["Tiger's Lust"] = new TigersLust()

    //3
    caster.abilities["Light Brewing"] = new LightBrewing()
    caster.abilities["Spitfire"] = new Spitfire()
    caster.abilities["Black Ox Brew"] = new BlackOxBrew()

    //4
    caster.abilities["Tiger Tail Sweep"] = new TigerTailSweep()
    caster.abilities["Summon Black Ox Statue"] = new SummonBlackOxStatue()
    caster.abilities["Ring of Peace"] = new RingofPeace()


    //5
    caster.abilities["Bob and Weave"] = new BobandWeave()
    caster.abilities["Healing Elixir"] = new HealingElixir()
    caster.abilities["Dampen Harm"] = new DampenHarm()

    //6
    caster.abilities["Special Delivery"] = new SpecialDelivery()
    caster.abilities["Rushing Jade Wind"] = new RushingJadeWind(true)
    caster.abilities["Exploding Keg"] = new ExplodingKeg()

    //7
    caster.abilities["High Tolerance"] = new HighTolerance()
    caster.abilities["Celestial Flames"] = new CelestialFlames()
    caster.abilities["Blackout Combo"] = new BlackoutCombo()


    caster.talents = [["Eye of the Tiger","Chi Wave","Chi Burst"],
        ["Celerity","Chi Torpedo","Tiger's Lust"],
        ["Light Brewing","Spitfire","Black Ox Brew"],
        ["Tiger Tail Sweep","Summon Black Ox Statue","Ring of Peace"],
        ["Bob and Weave","Healing Elixir","Dampen Harm"],
        ["Special Delivery","Rushing Jade Wind","Exploding Keg"],
        ["High Tolerance","Celestial Flames","Blackout Combo"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
class LightBrewing extends Ability {
    constructor() {
        super("Light Brewing", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Reduces the cooldown of Purifying Brew and Celestial Brew by 20%."
    }

    setTalent(caster) {
        caster.abilities["Purifying Brew"].cd *= 0.8
        caster.abilities["Purifying Brew"].maxCd *= 0.8
        caster.abilities["Celestial Brew"].cd *= 0.8
        caster.abilities["Celestial Brew"].maxCd *= 0.8
    }

    unsetTalent(caster) {
        caster.abilities["Purifying Brew"].cd /= 0.8
        caster.abilities["Purifying Brew"].maxCd /= 0.8
        caster.abilities["Celestial Brew"].cd /= 0.8
        caster.abilities["Celestial Brew"].maxCd /= 0.8
    }
}
//------------------------------------------------
class Spitfire extends Ability {
    constructor() {
        super("Spitfire", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Tiger Palm has a 25% chance to reset the cooldown of Breath of Fire."
    }

}
//------------------------------------------------
class BlackOxBrew extends Ability {
    constructor() {
        let name = "Black Ox Brew"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.noGcd = true
    }

    getTooltip() {
        return  "Chug some Black Ox Brew, which instantly refills your Energy, Purifying Brew charges, and resets the cooldown of Celestial Brew."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            caster.energy = caster.maxEnergy

            caster.abilities["Purifying Brew"].charges = caster.abilities["Purifying Brew"].maxCharges
            caster.abilities["Purifying Brew"].cd = caster.abilities["Purifying Brew"].maxCd

            caster.abilities["Celestial Brew"].cd = caster.abilities["Celestial Brew"].maxCd
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
class SummonBlackOxStatue extends Ability {
    constructor() {
        super("Summon Black Ox Statue", 0, 1, 0, 10, false, false, false, "physical", 40, 1)
        this.talent = true
    }

    getTooltip() {
        return  "//NOT IMPLEMENTED//Summons a Black Ox Statue at the target location for 15 min, pulsing threat to all enemies within 20 yards.\n" +
            "You may cast Provoke on the statue to taunt all enemies near the statue."
    }

}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
class BobandWeave extends Ability {
    constructor() {
        super("Bob and Weave", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return  "Increases the duration of Stagger by 3.0 sec."
    }

    setTalent(caster) {
        caster.abilities["Stagger"].duration += 3
    }

    unsetTalent(caster) {
        caster.abilities["Stagger"].duration -= 3
    }

}
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
class SpecialDelivery extends Ability {
    constructor() {
        super("Special Delivery", 0, 0, 0, 0, false, false, false, "physical", 8, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.6552
        this.timer1 = 0
        this.timer2 = 3
        this.timerRun = false
        this.caster = {}
    }
    run() {
        if (this.timerRun) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                this.timer1 = 0
                for (let i = 0; i<enemies.length; i++) {
                    if (!enemies[i].isDead && this.checkDistance(this.caster,enemies[i],undefined,true)) {
                        doDamage(this.caster,enemies[i],this)
                    }
                }
            }
        }
    }

    getTooltip() {
        return  "Drinking from your Brews has a 100% chance to toss a keg high into the air that lands nearby after 3 sec, dealing "+spellPowerToNumber(this.spellpower)+"" +
            " damage to all enemies within 8 yards and reducing their movement speed by 50% for 15 sec."
    }

    drinkBrew(caster) {
        this.timerRun = true
        this.caster = caster
    }

}
//------------------------------------------------
//------------------------------------------------
class ExplodingKeg extends Ability { //TODO
    constructor() {
        super("Exploding Keg", 0, 1, 0, 60, false, false, false, "fire", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return  "//NOT IMPLEMENTED//Hurls a flaming keg at the target location, dealing (189% of Attack power) Fire damage to nearby enemies and causing them to miss their melee attacks for the next 3 sec."
    }
}


//------------------------------------------------------------------------------------------------ROW7
class HighTolerance extends Ability {
    constructor() {
        super("High Tolerance", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true

        this.permanentBuff = true
        this.effect = [{name:"increaseStat",stat:"haste",val:8}]

    }

    getTooltip() {
        return  "Stagger is 5% more effective at delaying damage.<br>" +
            "You gain up to 15% Haste based on your current level of Stagger."
    }

    setTalent(caster) {
        caster.abilities["Stagger"].physDamageReduce += 0.05
        caster.abilities["Stagger"].magicDamageReduce += 0.05
    }

    unsetTalent(caster) {
        caster.abilities["Stagger"].physDamageReduce -= 0.05
        caster.abilities["Stagger"].magicDamageReduce -= 0.05

        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="High Tolerance") {
                caster.buffs[i].duration = -1
            }
        }

    }

    applyBuff(caster) {
        for (let i = 0; i<caster.debuffs.length; i++) {
            if (caster.debuffs[i].type === "stagger") {
                if (caster.debuffs[i].name==="Light Stagger") {
                    this.effect[0].val = 8
                } else if (caster.debuffs[i].name==="Moderate Stagger") {
                    this.effect[0].val = 12
                } else if (caster.debuffs[i].name==="Heavy Stagger") {
                    this.effect[0].val = 15
                }
            }
        }
        applyBuff(caster,caster,this)
    }

}
//------------------------------------------------
class CelestialFlames extends Ability { //TODO
    constructor() {
        super("Celestial Flames", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return  "//NOT IMPLEMENTED//Drinking from Brews has a 30% chance to coat the Monk with Celestial Flames for 6 sec. <br>" +
            "While Celestial Flames is active, Spinning Crane Kick applies Breath of Fire and Breath of Fire reduces the damage affected enemies deal to you by an additional 5%."
    }
}
//------------------------------------------------
class BlackoutCombo extends Ability { //TODO
    constructor() {
        super("Blackout Combo", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return  "//NOT IMPLEMENTED//" +
            "Blackout Kick also empowers your next ability:<br>" +
            "<br>" +
            "Tiger Palm: Damage increased by 100%.<br>" +
            "Breath of Fire: Cooldown reduced by 3 sec.<br>" +
            "Keg Smash: Reduces the remaining cooldown on your Brews by 2 additional sec.<br>" +
            "Celestial Brew: Pauses Stagger damage for 3 sec.<br>"

    }
}