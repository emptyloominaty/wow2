let _restorationDruid_talents = function(caster) {
    //1
    caster.abilities["Abundance"] = new Abundance()
    caster.abilities["Nourish"] = new Nourish()
    caster.abilities["Cenarion Ward"] = new CenarionWard()
    caster.abilities["Cenarion Ward Hot"] = new CenarionWardHot()

    //2
    caster.abilities["Tiger Dash"] = new TigerDash()
    caster.abilities["Renewal"] = new Renewal()
    caster.abilities["Wild Charge"] = new WildCharge()

    //3
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()
    //caster.abilities[""] = new ()

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


    caster.talents = [["Abundance","Nourish","Cenarion Ward"],
        ["Tiger Dash","Renewal","Wild Charge"],
        ["Balance Affinity","Feral Affinity","Guardian Affinity"],
        ["Mighty Bash","Mass Entanglement","Heart of the Wild"],
        ["Soul of the Forest","Cultivation","Incarnation: Tree of Life"],
        ["Inner Peace","Spring Blossoms","Overgrowth"],
        ["Photosynthesis","Germination","Flourish"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Abundance extends Ability {
    constructor() {
        super("Abundance", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "For each Rejuvenation you have active, Regrowth's cost is reduced by 6% and critical effect chance is increased by 6%."
    }

    getCost(caster) {
        if (this.talentSelect) {
            let val = 0
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (!friendlyTargets[i].isDead && this.checkDistance(caster,friendlyTargets[i],100,true)) {
                    let target = friendlyTargets[i]
                    for (let i = 0; i<target.buffs.length; i++) {
                        if (target.buffs[i].name==="Rejuvenation" && target.buffs[i].caster === caster) {
                            val += 6
                        }
                    }
                }
            }
            return val
        }
        return 0
    }
}
//------------------------------------------------
class Nourish extends Ability {
    constructor() {
        let name = "Nourish"
        let cost = 3.6
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 2.23

    }

    getTooltip() {
        return "Heals a friendly target for "+spellPowerToNumber(this.spellPower)+". Receives triple bonus from Mastery: Harmony."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            let spellPower = this.spellPower * (getRestoDruidMastery(caster,caster)*2)
            doHeal(caster,caster,this,undefined,spellPower)
        } else {
            let spellPower = this.spellPower * (getRestoDruidMastery(caster,target)*2)
            doHeal(caster,target,this,undefined,spellPower)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }

}

//------------------------------------------------
class CenarionWard extends Ability {
    constructor() {
        let name = "Cenarion Ward"
        let cost = 1.84
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.79/2
        this.duration = 30
        this.effect = [{name:"cenarionWard"}]
    }

    getTooltip() {
        return "Protects a friendly target for 30 sec. Any damage taken will consume the ward and heal the target for "+spellPowerHotToNumber(this.spellPower*8)+" over 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Taking damage will grant "+spellPowerHotToNumber(this.spellPower)+" healing every 1 sec for 8 sec."

    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            limitBuff(caster,"Cenarion Ward")
            applyBuff(caster,caster,this)
        } else {
            limitBuff(caster,"Cenarion Ward")
            applyBuff(caster,target,this)
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }

}
class CenarionWardHot extends Ability {
    constructor() {
        super("Cenarion Ward ", 0, 0, 0, 0, false, false, false, "nature", 40, 1)
        this.passive = true
        this.hiddenSB = true
        this.duration = 8
        this.spellPower = 0.79/2
    }

    getBuffTooltip(caster, target, buff) {
        return "Taking damage will grant "+spellPowerHotToNumber(this.spellPower)+" healing every 1 sec for 8 sec."
    }
}


//------------------------------------------------------------------------------------------------ROW2
class TigerDash extends Ability {
    constructor() {
        super("Tiger Dash", 0, 1.5, 0, 45, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Shift into Cat Form and increase your movement speed by 200%, reducing gradually over 5 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Increased movement speed by 200% while in Cat Form, reducing gradually over time."
    }
}
//------------------------------------------------
class Renewal extends Ability {
    constructor() {
        let name = "Renewal"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.noGcd = true
        this.canCastForm = "all"
    }

    getTooltip() {
        return "Instantly heals you for 30% of maximum health. Usable in all shapeshift forms."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            this.setCd()
            doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,caster.maxHealth*0.30)
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//------------------------------------------------
class WildCharge extends Ability {
    constructor() {
        let name = "Wild Charge"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 15
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 25
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.canCastForm = "all"
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Grants a movement ability that varies by shapeshift form:\n" +
            "\n" +
            "Non-shapeshifted\n" +
            "Fly to an ally's position.\n" +
            "\n" +
            "Bear Form\n" +
            "Charge to an enemy, immobilizing them for 4 sec.\n" +
            "\n" +
            "Cat Form\n" +
            "Leap behind an enemy, dazing them for 3 sec.\n" +
            "\n" +
            " Balance (Level 21)\n" +
            "Moonkin Form\n" +
            "Bound backward\n" +
            "\n" +
            "Travel Form\n" +
            "Leap forward 20 yds.\n" +
            "\n" +
            "Aquatic Form\n" +
            "Increases swim speed by an additional 150% for 5 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            this.setCd()
            doHeal(caster,caster,this,undefined,undefined,false,undefined,undefined,caster.maxHealth*0.30)
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW3
//------------------------------------------------
//------------------------------------------------
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
