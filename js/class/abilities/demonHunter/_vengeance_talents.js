let _vengeance_talents = function(caster) {
    caster.abilities["Frailty"] = new Frailty()

    //1
    caster.abilities["Abyssal Strike"] = new AbyssalStrike()
    caster.abilities["Agonizing Flames"] = new AgonizingFlames()
    caster.abilities["Felblade"] = new Felblade()

    //2
    caster.abilities["Feast of Souls"] = new FeastofSouls()
    caster.abilities["Fallout"] = new Fallout()
    caster.abilities["Burning Alive"] = new BurningAlive()

    //3
    caster.abilities["Infernal Armor"] = new InfernalArmor()
    caster.abilities["Charred Flesh"] = new CharredFlesh()
    caster.abilities["Spirit Bomb"] = new SpiritBomb()


    //4
    caster.abilities["Soul Rending"] = new SoulRending()
    caster.abilities["Feed the Demon"] = new FeedtheDemon()
    caster.abilities["Fracture"] = new Fracture()

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

    caster.talents = [["Abyssal Strike","Agonizing Flames","Felblade"],
        ["Feast of Souls","Fallout","Burning Alive"],
        ["Infernal Armor","Charred Flesh","Spirit Bomb"],
        ["Soul Rending","Feed the Demon","Fracture"],
        ["Concentrated Sigils","Quickened Sigils","Sigil of Chains"],
        ["Void Reaver","Demonic","Soul Barrier"],
        ["Last Resort","Ruinous Bulwark","Bulk Extraction"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class AbyssalStrike extends Ability {
    constructor() {
        super("Abyssal Strike", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Infernal Strike creates a Sigil of Flame when you land and its cooldown is reduced by 8 sec."
    }

    setTalent(caster) {
        caster.abilities["Infernal Strike"].cd -= 8
        caster.abilities["Infernal Strike"].maxCd -= 8
    }
    unsetTalent(caster) {
        caster.abilities["Infernal Strike"].cd += 8
        caster.abilities["Infernal Strike"].maxCd += 8
    }
}
//------------------------------------------------
class AgonizingFlames extends Ability {
    constructor() {
        super("Agonizing Flames", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Immolation Aura increases your movement speed by 20% and its duration is increased by 50%."
    }

    setTalent(caster) {
        caster.abilities["Immolation Aura"].effect = [{name:"moveSpeed",val:0.2}]
        caster.abilities["Immolation Aura"].duration *= 1.5
        caster.abilities["Infernal Armor"].duration *= 1.5
    }

    unsetTalent(caster) {
        caster.abilities["Immolation Aura"].effect = []
        caster.abilities["Immolation Aura"].duration /= 1.5
        caster.abilities["Infernal Armor"].duration /= 1.5
    }
}
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
class FeastofSouls extends Ability {
    constructor() {
        super("Feast of Souls", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.54
        this.duration = 6
    }

    getTooltip() {
        return "Soul Cleave heals you for an additional "+spellPowerHotToNumber(this.spellPower)+" over 6 sec."
    }

}
//------------------------------------------------
class Fallout extends Ability {
    constructor() {
        super("Fallout", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Immolation Aura's initial burst has a 60% chance to shatter Lesser Soul Fragments from enemies."
    }

}
//------------------------------------------------
class BurningAlive extends Ability {
    constructor() {
        super("Burning Alive", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Every 2 sec, Fiery Brand spreads to one nearby enemy."
    }

}
//------------------------------------------------------------------------------------------------ROW3
class InfernalArmor extends Ability {
    constructor() {
        super("Infernal Armor", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
        this.effect = [{name:"increaseStat",stat:"armor",val:20}]
    }

    getTooltip() {
        return "Immolation Aura increases your armor by 20% and causes melee attackers to suffer (5% of Attack power) Fire damage." //TODO:melee attackers
    }

}
//------------------------------------------------
class CharredFlesh extends Ability {
    constructor() {
        super("Charred Flesh", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Immolation Aura damage increases the duration of your Fiery Brand by 0.50 sec."
    }

}
//------------------------------------------------
class SpiritBomb extends Ability {
    constructor() {
        super("Spirit Bomb", 30, 1.5, 0, 0, false, false, false, "fire", 25, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.22113
    }

    getTooltip() {
        return "Consume up to 5 Soul Fragments within 25 yds and then explode, afflicting nearby enemies with Frailty for 20 sec and damaging them for "+spellPowerToNumber(this.spellPower)+" Fire per fragment.<br>" +
            "<br>" +
            "You heal for 10% of all damage you deal to enemies with Frailty."
    }

    startCast(caster) {
        if (this.checkStart(caster) && checkBuff(caster,caster,"Soul Fragment")) {
            let consumed = caster.abilities["Consume Soul"].consume(caster,5)
            let spellPower = this.spellPower * consumed
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    applyDebuff(caster,targets[i],caster.abilities["Frailty"])
                    doDamage(caster, targets[i], this,undefined,spellPower)
                }
            }
            
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
class Frailty extends Ability {
    constructor() {
        super("Frailty", 0, 0, 0, 0, false, false, false, "fire", 40, 1)
        this.passive = true
        this.hiddenSB = true
        this.duration = 20
    }

}
//------------------------------------------------------------------------------------------------ROW4
//------------------------------------------------
class FeedtheDemon extends Ability {
    constructor() {
        super("Feed the Demon", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Consuming a Soul Fragment reduces the remaining cooldown of Demon Spikes by 0.5 sec."
    }

}
//------------------------------------------------
class Fracture extends Ability {
    constructor() {
        super("Fracture", -25, 1.5, 0, 4.5, false, false, false, "physical", 5, 2)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1.2
        this.fragments = 2
    }

    getTooltip() {
        return "Rapidly slash your target for [(40% of Attack power)% + (80% of Attack power)%] Physical damage, and shatter 2 Lesser Soul Fragments from them.\n"
    }

    setTalent(caster) {
        caster.abilities["Shear"].canUse = false
        replaceAction(caster, "Shear", this.name)
    }

    unsetTalent(caster) {
        caster.abilities["Shear"].canUse = true
        replaceAction(caster,this.name,"Shear")
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
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
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                if (caster.abilities["Felblade"].talentSelect) {
                    if (getChance(10*(1+(caster.stats.haste/100)))) {
                        caster.abilities["Felblade"].cd = caster.abilities["Felblade"].maxCd
                    }
                }
                caster.abilities["Soul Fragment"].gainSoul(caster,this.fragments)
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
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7
