let _arms_talents = function(caster) {
    //1
    caster.abilities["War Machine"] = new WarMachine()
    caster.abilities["Sudden Death"] = new SuddenDeath()
    caster.abilities["Skullsplitter"] = new Skullsplitter()

    //2
    caster.abilities["Double Time"] = new DoubleTime()
    caster.abilities["Impending Victory"] = new ImpendingVictory()
    caster.abilities["Storm Bolt"] = new StormBolt()

    //3
    caster.abilities["Massacre"] = new Massacre()
    caster.abilities["Fervor of Battle"] = new FervorofBattle()
    caster.abilities["Rend"] = new Rend()

    //4
    caster.abilities["Second Wind"] = new SecondWind()
    caster.abilities["Bounding Stride"] = new BoundingStride()
    caster.abilities["Defensive Stance"] = new DefensiveStance()

    //5
    caster.abilities["Collateral Damage"] = new CollateralDamage()
    caster.abilities["Warbreaker"] = new Warbreaker()
    caster.abilities["Cleave"] = new Cleave()

    //6
    //caster.abilities["In For The Kill"] = new InForTheKill()
    //caster.abilities["Avatar"] = new Avatar()
    //caster.abilities["Deadly Calm"] = new DeadlyCalm()

    //7
    caster.abilities["Anger Management"] = new AngerManagement()
    //caster.abilities["Dreadnaught"] = new Dreadnaught()
    //caster.abilities["Ravager"] = new Ravager()


    caster.talents = [["War Machine","Sudden Death","Skullsplitter"],
        ["Double Time","Impending Victory","Storm Bolt"],
        ["Massacre","Fervor of Battle","Rend"],
        ["Second Wind","Bounding Stride","Defensive Stance"],
        ["Collateral Damage","Warbreaker","Cleave"],
        ["In For The Kill","Avatar","Deadly Calm"],
        ["Anger Management","Dreadnaught","Ravager"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
//------------------------------------------------
//------------------------------------------------
class Skullsplitter extends Ability {
    constructor() {
        super("Skullsplitter", -20, 1.5, 0, 21, false, false, false, "physical", 5, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Bash an enemy's skull, dealing (101.6% of Attack power) Physical damage."
    }
}
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
class FervorofBattle extends Ability {
    constructor() {
        super("Fervor of Battle", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
        this.passive = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Whirlwind also Slams your primary target."
    }
}
//------------------------------------------------
class Rend extends Ability {
    constructor() {
        super("Rend", 30, 1.5, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 15
        this.spellPower = 0.321
        this.spellPowerDot = 1.33
    }

    getTooltip() {
        return "Wounds the target, causing (32.1% of Attack power) Physical damage instantly and an additional (133% of Attack power) Bleed damage over 15 sec.<br>" +
            "<br>" +
            "Increases critical damage you deal to the enemy by 10%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            let target = caster.castTarget
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster, caster.castTarget, this)
                    applyDot(caster, caster.castTarget, this,undefined,undefined, this.spellPowerDot)
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
                    target = caster.targetObj
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        applyDot(caster, caster.targetObj, this,undefined,undefined, this.spellPowerDot)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.spec==="arms" && checkBuff(caster,caster,"Sweeping Strikes")) {
                    caster.abilities["Sweeping Strikes"].cleave(caster,target,this)
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
class SecondWind extends Ability {
    constructor() {
        super("Second Wind", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.passive = true
        this.timer1 = 0
        this.timer2 = 2
    }

    getTooltip() {
        return "Restores 4% health every 2 sec."
    }

    run(caster) {
        if (this.talentSelect) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                this.timer1 = 0
                doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,caster.maxHealth*0.04)
            }
        }
    }
}
//------------------------------------------------
//------------------------------------------------
class DefensiveStance extends Ability {
    constructor() {
        super("Defensive Stance", 0, 0, 0, 6, false, false, false, "physical", 5, 1)
        this.talent = true
        this.permanentBuff = true
        this.duration = 10
        this.effect = [{name:"damageReduction",val:0.2},{name:"increaseDamage",val:-0.1}]
        this.noGcd = true
    }

    getTooltip() {
        return "A defensive combat state that reduces all damage you take by 20%, and all damage you deal by 10%. Lasts until canceled."
    }

    startCast(caster) {
        if (checkBuff(caster,caster,"Defensive Stance",true)) {
            return true
        } else {
            if (this.checkStart(caster)) {
                this.setCd()
                this.setGcd(caster)
                applyBuff(caster,caster,this)
                caster.useEnergy(this.cost)
                return true
            }
            return false
        }
    }
}
//------------------------------------------------------------------------------------------------ROW5
class CollateralDamage extends Ability {
    constructor() {
        super("Collateral Damage", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.talent = true
        this.passive = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//When Sweeping Strikes ends, your next Whirlwind deals 25% increased damage for each ability used during Sweeping Strikes that damaged a second target."
    }
}
//------------------------------------------------
class Warbreaker extends Ability {
    constructor() {
        super("Warbreaker", 0, 1.5, 0, 45, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1.815
        this.duration = 10
    }

    getTooltip() {
        return "Smash the ground and shatter the armor of all enemies within 8 yds, dealing "+spellPowerToNumber(this.spellPower)+" Physical damage and increasing damage you deal to them by 30% for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    doDamage(caster, enemies[i], this)
                    applyDebuff(caster, enemies[i], this)
                }
            }

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    setTalent(caster) {
        caster.abilities["Colossus Smash"].canUse = false
        replaceAction(caster, "Colossus Smash", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Colossus Smash"].canUse = true
        replaceAction(caster,this.name,"Colossus Smash")
    }
}
//------------------------------------------------
class Cleave extends Ability {
    constructor() {
        let name = "Cleave"
        let cost = 20

        let gcd = 1.5
        let castTime = 0
        let cd = 6
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.7*1.13
        this.hasteCd = true
    }

    getTooltip() {
        return "Strikes all enemies in front of you for "+spellPowerToNumber(this.spellPower)+" Physical damage, inflicting Deep Wounds. Cleave will consume your Overpower effect to deal increased damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let spellPower = this.spellPower
            if (checkBuffStacks(caster,caster,"Overpower")) {
                spellPower *= 1.2
            }
            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this,undefined,spellPower)
                        applyDot(caster,targets[i],caster.abilities["Deep Wounds"])
                    }
                }
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
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------