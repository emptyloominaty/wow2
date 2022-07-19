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
    caster.abilities["Furious Charge"] = new FuriousCharge()
    caster.abilities["Bounding Stride"] = new BoundingStride()
    caster.abilities["Warpaint"] = new Warpaint()

    //5
    caster.abilities["Seethe"] = new Seethe()
    caster.abilities["Frothing Berserker"] = new FrothingBerserker()
    caster.abilities["Cruelty"] = new Cruelty()

    //6
    caster.abilities["Meat Cleaver"] = new MeatCleaver()
    caster.abilities["Dragon Roar"] = new DragonRoar()
    caster.abilities["Bladestorm"] = new Bladestorm()

    //7
    caster.abilities["Anger Management"] = new AngerManagement()
    caster.abilities["Reckless Abandon"] = new RecklessAbandon()
    caster.abilities["Siegebreaker"] = new Siegebreaker()

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
        this.spellPower = 0.5*1.29
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
        this.spellPower = 0.1638*1.29
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
        this.spellPower = 1.316*1.29
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
class FuriousCharge extends Ability {
    constructor() {
        super("Furious Charge", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
    }

    getTooltip() {
        return "Charge also increases the healing from your next Bloodthirst by 250%."
    }

}
//------------------------------------------------
class BoundingStride extends Ability {
    constructor() {
        super("Bounding Stride", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.effect = [{name:"moveSpeed",val:0.7}]
        this.duration = 3
    }

    getTooltip() {
        return "Reduces the cooldown on Heroic Leap by 15 sec, and Heroic Leap now also increases your run speed by 70% for 3 sec."
    }

    setTalent(caster) {
        caster.abilities["Heroic Leap"].cd -= 15
        caster.abilities["Heroic Leap"].maxCd -= 15
    }

    unsetTalent(caster) {
        caster.abilities["Heroic Leap"].cd += 15
        caster.abilities["Heroic Leap"].maxCd += 15
    }

}
//------------------------------------------------
class Warpaint extends Ability {
    constructor() {
        super("Warpaint", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "You take 10% reduced damage while Enrage is active."
    }

    setTalent(caster) {
        caster.abilities["Enrage"].effect[2] = {name:"damageReduction",val:0.1}
    }

    unsetTalent(caster) {
        caster.abilities["Enrage"].effect[2] = {}
    }

}
//------------------------------------------------------------------------------------------------ROW5
class Seethe extends Ability {
    constructor() {
        super("Seethe", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:CRIT
        return "Bloodthirst generates 2 more Rage, or 4 more Rage when it critically strikes your primary target."
    }

    setTalent(caster) {
        caster.abilities["Bloodthirst"].cost -= 2
    }

    unsetTalent(caster) {
        caster.abilities["Bloodthirst"].cost += 2
    }

}
//------------------------------------------------
class FrothingBerserker extends Ability {
    constructor() {
        super("Frothing Berserker", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Rampage has a 20% chance to immediately refund 20 Rage."
    }

}
//------------------------------------------------
class Cruelty extends Ability {
    constructor() {
        super("Cruelty", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "While Enraged, Raging Blow deals 20% more damage and has a 30% chance to instantly reset its own cooldown."
    }

}
//------------------------------------------------------------------------------------------------ROW6
class MeatCleaver extends Ability {
    constructor() {
        super("Meat Cleaver", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Whirlwind deals 25% more damage and now affects your next 4 single-target melee attacks, instead of the next 2 attacks."
    }

    setTalent(caster) {
        caster.abilities["Whirlwind"].spellPower *= 1.25
        caster.abilities["Whirlwind"].stacks = 4
        caster.abilities["Whirlwind"].maxStacks = 4

    }

    unsetTalent(caster) {
        caster.abilities["Whirlwind"].spellPower /= 1.25
        caster.abilities["Whirlwind"].stacks = 2
        caster.abilities["Whirlwind"].maxStacks = 2
    }

}
//------------------------------------------------
class DragonRoar extends Ability {
    constructor() {
        let name = "Dragon Roar"
        let cost = -10 //TODO: -20 prot war
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 12
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 1.70*1.2
    }

    getTooltip() {
        return "Roar explosively, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage to enemies within 12 yds. Deals reduced damage to secondary targets. Dragon Roar critically strikes for 3 times normal damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            let spellPower = this.spellPower*(1+((caster.stats.crit/100)*3)) //3times CRIT FIX

            let e = []
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],undefined,true)) {
                    e.push(enemies[i])
                }
            }

            if (e.length>1) {
                spellPower = spellPower / (e.length/1.5)
            }

            for (let i = 0; i<e.length; i++) {
                doDamage(caster, e[i], this, undefined, spellPower)
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
            }

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
//------------------------------------------------
class Bladestorm extends Ability {
    constructor() {
        let name = "Bladestorm"
        let cost = -20
        let gcd = 1.5
        let castTime = 4
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1*1.21
        this.duration = 4
    }

    getTooltip() {
        return "Become an unstoppable storm of destructive force, striking all nearby enemies for "+spellPowerToNumber(this.spellPower*5)+"Physical damage over 4 sec." +
            "You are immune to movement impairing and loss of control effects, but can use defensive abilities and avoid attacks." //TODO:IMMUNE TO snare,CC
    }

    getBuffTooltip(caster, target, buff) {
        return  "Dealing damage to all nearby enemies every 1 sec.<br>" +
            "Immune to crowd control."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0.8/(1 + (caster.stats.haste / 100)), timer2:0.8/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            caster.canMoveWhileCasting = true


            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        for (let i = 0; i<enemies.length; i++) {
            if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],undefined,true)) {
                doDamage(caster, enemies[i], this)
            }
        }
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }

}
//------------------------------------------------------------------------------------------------ROW7
class AngerManagement extends Ability {
    constructor() {
        super("Anger Management", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.rageSpent = 0
        this.rageNeed = 20
    }

    getTooltip() {
        if (player.spec==="fury") {
            return "Every 20 Rage you spend reduces the remaining cooldown on Recklessness by 1 sec."
        }
        //         Protection
        //         Every 10 Rage you spend reduces the remaining cooldown on Avatar and Shield Wall by 1 sec.
        //
        //         Fury
        //         Every 20 Rage you spend reduces the remaining cooldown on Recklessness by 1 sec.
        //
        //         Arms
        //         Every 20 Rage you spend reduces the remaining cooldown on Warbreaker and BladestormColossus Smash and Bladestorm by 1 sec.
    }

    spendRage(caster,val) {
        if (this.talentSelect) {
            this.rageSpent += val
            let a = true
            while(a) {
                if(this.rageSpent>this.rageNeed) {
                    this.rageSpent-=this.rageNeed
                    if(caster.spec==="fury") {
                        caster.abilities["Recklessness"].cd ++
                    }
                } else {
                    a = false
                }
            }
        }
    }

}

//------------------------------------------------
class RecklessAbandon extends Ability {
    constructor() {
        super("Reckless Abandon", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        //this.talentSelect = true
    }

    getTooltip() {
        return "Recklessness generates 50 Rage and greatly empowers Bloodthirst and Raging Blow."
    }

    setTalent(caster) {
        caster.abilities["Recklessness"].cost -= 50
        caster.abilities["Bloodthirst"].canUse = false
        caster.abilities["Raging Blow"].canUse = false
        caster.abilities["Bloodbath"].canUse = true
        caster.abilities["Crushing Blow"].canUse = true

        replaceAction(caster, "Bloodthirst","Bloodbath")
        replaceAction(caster, "Raging Blow","Crushing Blow")
    }

    unsetTalent(caster) {
        caster.abilities["Recklessness"].cost += 50
        caster.abilities["Bloodthirst"].canUse = true
        caster.abilities["Raging Blow"].canUse = true
        caster.abilities["Bloodbath"].canUse = false
        caster.abilities["Crushing Blow"].canUse = false

        replaceAction(caster, "Bloodbath","Bloodthirst")
        replaceAction(caster, "Crushing Blow","Raging Blow")
    }

}
//------------------------------------------------
class Siegebreaker extends Ability {
    constructor() {
        super("Siegebreaker", -10, 1.5, 0, 30, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.8*1.29
        //this.effect = [{}] +15% damage
        this.duration = 10
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Break the enemy's defenses, dealing (80% of Attack power) Physical damage, and increasing your damage done to the target by 15% for 10 sec."
    }
}