class Bm_abilities {
    "Tiger Palm" =  new TigerPalm(false,true)
    "Blackout Kick" =  new BlackoutKick(false,true)
    "Provoke" =  new Provoke()
    "Spinning Crane Kick" = new SpinningCraneKick(false,true)
    "Roll" = new Roll()
    "Fortifying Brew" = new FortifyingBrew(true)
    "Expel Harm" = new ExpelHarm(false,true)
    "Celestial Brew" = new CelestialBrew()
    "Purifying Brew" = new PurifyingBrew()
    "Keg Smash" = new KegSmash()
    "Spear Hand Strike" = new SpearHandStrike()
    "Zen Meditation" = new ZenMeditation()
    "Touch of Death" = new TouchofDeath(false,true)
    "Leg Sweep" = new LegSweep()
    "Resuscitate" = new Resuscitate()

    //passive
    "Mystic Touch" = new MysticTouch()
    "Elusive Brawler" = new ElusiveBrawler()
    "Stagger" = new Stagger()
    "Shuffle" = new Shuffle()
    "Gift of the Ox" = new GiftoftheOx()
    "Brewmaster's Balance" = new BrewmastersBalance()
    "Celestial Fortune" = new CelestialFortune()
    "" = {startCast:function(xd){return false},run:function(caster){},incCd:function(caster){}}

   /* "Test1" = new Test1()
    "Test2" = new Test2()
    "Test3" = new Test3()
    "Test4" = new Test4()
    "Test5" = new Test5()
    "Test6" = new Test6()
    "Test7" = new Test7()
    "Test8" = new Test8()
    "Test9" = new Test9()
    "Test10" = new Test10()
    "Test11" = new Test11()
    "Test12" = new Test12()
    "Test13" = new Test13()
    "Test14" = new Test14()
    "Test15" = new Test15()*/
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class Stagger extends Ability {
    constructor() {
        super("Stagger", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.spellPower = 0
        this.passive = true
        this.permanentBuff = true
        this.duration = 10

        this.physDamageReduce = 0.4
        this.magicDamageReduce = 0.35 // 0.4*0.35

        this.effect = [{val:0,dotVal:0,time:0,time2:0.5}]
    }

    reduceDamage(caster,target,ability,damage) {
        let duration = this.duration
        let dr = this.physDamageReduce
        let staggeredDamage = 0
        //Shuffle
        if (checkBuff(target,target,"Shuffle")) {
            dr = dr * 2
        }
        //Fortifying Brew
        if (checkBuff(target,target,"Fortifying Brew")) {
            dr = dr * 1.1
        }

        if (ability.school!=="physical") {
            dr = dr * this.magicDamageReduce
        }

        let drDot = dr
        if (drDot>1) {
            drDot = 1
        }

        dr = (1-dr)
        if (dr<0) {
            dr = 0
        }

        staggeredDamage = damage * drDot
        damage = damage * dr

        let done = false
        for (let i = 0; i<target.debuffs.length; i++) {
            if (target.debuffs[i].type==="stagger") {
                target.debuffs[i].effect[0].val += staggeredDamage
                if (target.debuffs[i].effect[0].val > target.maxHealth*0.6) {
                    target.debuffs[i].name = "Heavy Stagger"
                } else if (target.debuffs[i].effect[0].val > target.maxHealth*0.3) {
                    target.debuffs[i].name = "Moderate Stagger"
                } else {
                    target.debuffs[i].name = "Light Stagger"
                }
                done = true
            }
        }
        if (!done) {
            this.effect[0].val = staggeredDamage
            applyDebuff(target,target,this,"stagger",undefined,undefined,"Light Stagger")
        }
        this.effect[0].dotVal = this.effect[0].val/this.duration
        return damage

    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class Shuffle extends Ability {
    constructor() {
        super("Shuffle", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.spellPower = 0
        this.passive = true
        this.duration = 1
    }

    incBuff(caster,ability) {
        if (ability.name==="Blackout Kick") {
            applyBuff(caster,caster,this,undefined,undefined,undefined,3,true)
        } else if (ability.name==="Spinning Crane Kick") {
            applyBuff(caster,caster,this,undefined,undefined,undefined,1,true)
        } else if (ability.name==="Keg Smash") {
            applyBuff(caster,caster,this,undefined,undefined,undefined,5,true)
        }
    }

}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class BrewmastersBalance extends Ability {
    constructor() {
        super("Brewmaster's Balance", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.permanentBuff = true
        this.hiddenBuff = true
        this.effect = [{name:"increaseStat",stat:"armor",val:25},{name:"increaseStat",stat:"stamina",val:30,percent:true},{name:"damageReduction",val:0.1}]
    }

    apply(caster){
        applyBuff(caster,caster,this)
        setTimeout(()=>{caster.updateHealth()},30)

    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class GiftoftheOx extends Ability {
    constructor() {
        super("Gift of the Ox", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.duration = 30
        this.maxStacks = 100
        this.spellPower = 0
    }

    spawnSphere(caster,damage) {
        if (getChance(((0.75*damage)/caster.maxHealth)*(3-2*(caster.health/caster.maxHealth))*100)) {
            applyBuff(caster,caster,this,1,true,"Healing Sphere")
        }
    }

    heal(caster,healingSpheres) {
        doHeal(caster,caster,this,undefined,1.5*healingSpheres)
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class CelestialFortune extends Ability {
    constructor() {
        super("Celestial Fortune", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
    }

    heal(caster,heal) {
        if (getChance(caster.stats.crit)) {
            doHeal(caster,caster,this,undefined,undefined,undefined,undefined,undefined,heal*0.65)
        }
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class ElusiveBrawler extends Ability {
    constructor() {
        super("Elusive Brawler", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 10
        this.maxStacks = 10
        this.effect = [{name:"increaseStat",stat:"primary",val:8,percent:true},{name:"increaseStat",stat:"dodge",val:0,percent:true}]
    }

    hit(target) {
        let done = false
        for (let i = 0; i<target.buffs.length; i++) {
            if (target.buffs[i].name==="Elusive Brawler") {
                target.buffs[i].effect[1].val += target.stats.mastery
                done = true
            }
        }
        if (!done) {
            this.effect[0].val = target.stats.mastery
            this.effect[1].val = target.stats.mastery
            applyBuff(target,target,this)
        }
    }

    resetStacks(target) {
        for (let i = 0; i<target.debuffs.length; i++) {
            if (target.debuffs[i].name==="Elusive Brawler") {
                target.debuffs[i].effect[1].val = 0
            }
        }
    }

}

//----------------TEST

class Test1 extends Ability {
    constructor() {
        super("Whirlwind", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    startCast(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test2"].test(caster)
    }
}

class Test2 extends Ability {
    constructor() {
        super("Execute", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test3"].test(caster)
    }
}


class Test3 extends Ability {
    constructor() {
        super("Vivify", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test4"].test(caster)
    }
}


class Test4 extends Ability {
    constructor() {
        super("Moonfire", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test5"].test(caster)
    }
}


class Test5 extends Ability {
    constructor() {
        super("Sunfire", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test6"].test(caster)
    }
}

class Test6 extends Ability {
    constructor() {
        super("Revival", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test7"].test(caster)
    }
}

class Test7 extends Ability {
    constructor() {
        super("Mana Tea", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test8"].test(caster)
    }
}


class Test8 extends Ability {
    constructor() {
        super("Starfall", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test9"].test(caster)
    }
}


class Test9 extends Ability {
    constructor() {
        super("Annihilation", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test10"].test(caster)
    }
}


class Test10 extends Ability {
    constructor() {
        super("Clearcasting", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test11"].test(caster)
    }
}


class Test11 extends Ability {
    constructor() {
        super("Rupture", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test12"].test(caster)
    }
}


class Test12 extends Ability {
    constructor() {
        super("Envenom", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test13"].test(caster)
    }
}

class Test13 extends Ability {
    constructor() {
        super("Garrote", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test14"].test(caster)
    }
}


class Test14 extends Ability {
    constructor() {
        super("Mutilate", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Test15"].test(caster)
    }
}

class Test15 extends Ability {
    constructor() {
        super("Slice And Dice", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.duration = 30+(Math.random()*30)
    }
    test(caster) {
        applyBuff(caster,caster,this)
    }
}