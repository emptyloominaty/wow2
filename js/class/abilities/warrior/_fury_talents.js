let _fury_talents = function(caster) {
    //1
    caster.abilities["War Machine"] = new WarMachine()
    caster.abilities["Sudden Death"] = new SuddenDeath()
    caster.abilities["Fresh Meat"] = new FreshMeat()

    //2
    caster.abilities["Double Time"] = new DoubleTime()
    caster.abilities["Impending Victory"] = new ImpendingVictory()
    caster.abilities["Storm Bolt"] = new StormBolt()

    //3
    caster.abilities["Massacre"] = new Massacre()
    caster.abilities["Frenzy"] = new Frenzy()
    caster.abilities["Onslaught"] = new Onslaught()

    //4
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //5
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //6
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    //7
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

    caster.talents = [["War Machine","Sudden Death","Fresh Meat"],
        ["Double Time","Impending Victory","Storm Bolt"],
        ["Massacre","Frenzy","Onslaught"],
        ["Furious Charge","Bounding Stride","Warpaint"],
        ["Seethe","Frothing Berserker","Cruelty"],
        ["Meat Cleaver","Dragon Roar","Bladestorm"],
        ["Anger Management","Reckless Abandon","Siegebreaker"]
    ]
}
//------------------------------------------------------------------------------------------------ROW1
class WarMachine extends Ability {
    constructor() {
        super("War Machine", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 8
        this.effect = [{name:"moveSpeed",val:0.3}]
    }

    getTooltip() {
        return "Your auto attacks generate 20% more Rage.<br>" +
            "<br>" +
            "Killing an enemy instantly generates 10 Rage, and increases your movement speed by 30% for 8 sec."
    }

    killEnemy(caster,target) {
        if (this.talentSelect) {
            applyBuff(caster,caster,this)
            caster.useEnergy(-10,0)
        }
    }
}
//------------------------------------------------
class SuddenDeath extends Ability {
    constructor() {
        super("Sudden Death", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 10
    }

    getTooltip() {
        return "Your attacks have a chance to reset the cooldown of Execute and make it usable on any target, regardless of their health."
    }
}
//------------------------------------------------
class FreshMeat extends Ability {
    constructor() {
        super("Fresh Meat", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Bloodthirst always Enrages you the first time you strike a target, and it has a 15% increased chance to trigger Enrage."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class DoubleTime extends Ability {
    constructor() {
        super("Double Time", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Increases the maximum number of charges on Charge by 1, and reduces its cooldown by 3 sec."
    }

    setTalent(caster) {
        caster.abilities["Charge"].maxCharges ++
        caster.abilities["Charge"].charges ++
        caster.abilities["Charge"].cd -= 3
        caster.abilities["Charge"].maxCd -= 3
    }

    unsetTalent(caster) {
        caster.abilities["Charge"].maxCharges --
        caster.abilities["Charge"].charges --
        caster.abilities["Charge"].cd += 3
        caster.abilities["Charge"].maxCd += 3
    }
}
//------------------------------------------------
class ImpendingVictory extends Ability {
    constructor() {
        super("Impending Victory", 10, 1.5, 0, 25, false, false, false, "physical", 5, 1)
        this.talent = true
        this.spellPower = 0.5
        this.heal = 0.4
    }

    getTooltip() {
        return "Instantly attack the target, causing (50% of Attack power) damage and healing you for 40% of your maximum health.<br>" +
            "<br>" +
            "Killing an enemy that yields experience or honor resets the cooldown of Impending Victory and makes it cost no Rage." //TODO
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    caster.abilities["WhirlwindBuff"].startCast(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        caster.abilities["WhirlwindBuff"].startCast(caster,caster.targetObj,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Victory Rush") {
                        caster.buffs[i].duration = -1
                    }
                }

                doHeal(caster,caster,this,undefined,undefined,undefined,undefined,undefined,caster.maxHealth*this.heal)
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)

                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    setTalent(caster) {
        caster.abilities["Victory Rush"].canUse = false
        replaceAction(caster, "Victory Rush", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Victory Rush"].canUse = true
        replaceAction(caster,this.name,"Victory Rush")
    }
}
//------------------------------------------------
class StormBolt extends Ability {
    constructor() {
        let name = "Storm Bolt"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 0.1638
        this.effect = [{name:"stun"}]
        this.duration = 4
    }

    getTooltip() {
        return "Hurls your weapon at an enemy, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage and stunning for 4 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                doDamage(caster, caster.castTarget, this)
                applyDebuff(caster,caster.castTarget,this,"stun")
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}

//------------------------------------------------------------------------------------------------ROW3
class Massacre extends Ability {
    constructor() {
        super("Massacre", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Execute is now usable on targets below 35% health, and its cooldown is reduced by 1.5 sec."
    }

    setTalent(caster) {
        caster.abilities["Execute"].cd -= 1.5
        caster.abilities["Execute"].maxCd -= 1.5
        caster.abilities["Execute"].health = 0.35
    }

    unsetTalent(caster) {
        caster.abilities["Execute"].cd += 1.5
        caster.abilities["Execute"].maxCd += 1.5
        caster.abilities["Execute"].health = 0.2
    }
}
//------------------------------------------------
class Frenzy extends Ability {
    constructor() {
        super("Frenzy", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.target = {}
        this.effect = [{name:"increaseStat",stat:"haste",val:2}]
        this.maxStacks = 4
        this.duration = 12
    }

    getTooltip() {
        return "Rampage increases your Haste by 2% for 12 sec, stacking up to 4 times. This effect is reset if you Rampage a different primary target."
    }

    applyBuff(caster,target) {
        if (target===this.target) {
            applyBuff(caster,caster,this,1,true)
        } else {
            this.target=target
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Frenzy") {
                    caster.buffs[i].duration = -1
                }
            }
        }
    }

}
//------------------------------------------------
class Onslaught extends Ability {
    constructor() {
        let name = "Onslaught"
        let cost = -15
        let gcd = 1.5
        let castTime = 0
        let cd = 12
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 1.316
        this.hasteCd = true
    }

    getTooltip() {
        return "Brutally attack an enemy for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Physical damage. Requires Enrage."
    }

    startCast(caster) {
        if (this.checkStart(caster) && checkBuff(caster,caster,"Enrage")) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    caster.abilities["WhirlwindBuff"].startCast(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        caster.abilities["WhirlwindBuff"].startCast(caster,caster.targetObj,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------