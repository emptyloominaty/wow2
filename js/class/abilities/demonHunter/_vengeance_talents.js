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
    caster.abilities["Concentrated Sigils"] = new ConcentratedSigils()
    caster.abilities["Quickened Sigils"] = new QuickenedSigils()
    caster.abilities["Sigil of Chains"] = new SigilofChains()

    //6
    caster.abilities["Void Reaver"] = new VoidReaver()
    caster.abilities["Demonic"] = new Demonic()
    caster.abilities["Soul Barrier"] = new SoulBarrier()

    //7
    caster.abilities["Last Resort"] = new LastResort()
    caster.abilities["Ruinous Bulwark"] = new RuinousBulwark()
    caster.abilities["Bulk Extraction"] = new BulkExtraction()

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
class ConcentratedSigils extends Ability {
    constructor() {
        super("Concentrated Sigils", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//All Sigils are now targeted at your location, and the duration of their effects is increased by 2 sec."
    }

}
//------------------------------------------------
class QuickenedSigils extends Ability {
    constructor() {
        super("Quickened Sigils", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "All Sigils activate 1 second faster, and their cooldowns are reduced by 20%."
    }

    setTalent(caster) {
        caster.abilities["Sigil of Flame"].cd *= 0.8
        caster.abilities["Sigil of Flame"].maxCd *= 0.8
        caster.abilities["Sigil of Flame"].area.duration --
        caster.abilities["Sigil of Silence"].cd *= 0.8
        caster.abilities["Sigil of Silence"].maxCd *= 0.8
        caster.abilities["Sigil of Silence"].area.duration --
        //TODO:
        //caster.abilities["Sigil of Chains"].cd *= 0.8
        //caster.abilities["Sigil of Chains"].maxCd *= 0.8
        //caster.abilities["Sigil of Chains"].area.duration --
        //caster.abilities["Sigil of Misery"].cd *= 0.8
        //caster.abilities["Sigil of Misery"].maxCd *= 0.8
        //caster.abilities["Sigil of Misery"].area.duration --

    }

    unsetTalent(caster) {
        caster.abilities["Sigil of Flame"].cd /= 0.8
        caster.abilities["Sigil of Flame"].maxCd /= 0.8
        caster.abilities["Sigil of Flame"].area.duration ++
        caster.abilities["Sigil of Silence"].cd /= 0.8
        caster.abilities["Sigil of Silence"].maxCd /= 0.8
        caster.abilities["Sigil of Silence"].area.duration ++
        //TODO:
        //caster.abilities["Sigil of Chains"].cd /= 0.8
        //caster.abilities["Sigil of Chains"].maxCd /= 0.8
        //caster.abilities["Sigil of Chains"].area.duration ++
        //caster.abilities["Sigil of Misery"].cd /= 0.8
        //caster.abilities["Sigil of Misery"].maxCd /= 0.8
        //caster.abilities["Sigil of Misery"].area.duration ++
    }
}
//------------------------------------------------
class SigilofChains extends Ability {
    constructor() {
        super("Sigil of Chains", 0, 1.5, 0, 90, false, false, false, "physical", 30, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED// Place a Sigil of Chains at the target location that activates after 2 sec.<br>" +
            "<br>" +
            "All enemies affected by the sigil are pulled to its center and are snared, reducing movement speed by 70% for 6 sec."
    }

}
//------------------------------------------------------------------------------------------------ROW6
class VoidReaver extends Ability {
    constructor() {
        super("Void Reaver", 0, 0, 0, 0, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.duration = 12
    }

    getTooltip() {
        return "Enemies struck by Soul Cleave deal 6% less damage to you for 12 sec."
    }

}
//------------------------------------------------
//------------------------------------------------
class SoulBarrier extends Ability {
    constructor() {
        super("Soul Barrier", 0, 1.5, 0, 30, false, false, false, "physical", 40, 1)
        this.talent = true
        this.duration = 12
        this.effect = [{name:"absorb",val:0}]
    }

    getTooltip() {
        return "Shield yourself for 12 sec, absorbing "+5*player.stats.primary.toFixed(0)+"  damage.<br>" +
            "<br>" +
            "Consumes all Soul Fragments within 25 yds to add "+player.stats.primary.toFixed(0)+" to the shield per fragment."
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val.toFixed(0)+" damage."
    }

    startCast(caster) { //TODO:It's not mentioned in the tooltip, but while the shield is up, each consecutive Soul Fragment you spend adds to the shield value,
        if (this.checkStart(caster)) {
            let consumed = caster.abilities["Consume Soul"].consume(caster,2)

            this.effect[0].val = (caster.stats.primary * 5) + (caster.stats.primary * consumed)

            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }


}
//------------------------------------------------------------------------------------------------ROW7
class LastResort extends Ability {
    constructor() {
        super("Last Resort", 0, 0, 0, 480, false, false, false, "physical", 40, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 480
    }

    getTooltip() {
        return "Sustaining fatal damage instead transforms you to Metamorphosis form.<br>" +
            "<br>" +
            "This may occur once every 8 min."
    }

    cheat(caster) {
        if (this.talentSelect && this.cd>=this.maxCd) {
            caster.health = caster.maxHealth * 0.3
            applyBuff(caster,caster,caster.abilities["Metamorphosis"])
            applyDebuff(caster,caster,this)
            this.setCd()
        }
    }
}
//------------------------------------------------
class RuinousBulwark extends Ability {
    constructor() {
        super("Ruinous Bulwark", 0, 0, 0, 0, false, false, false, "fire", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Fel Devastation heals for an additional 15%, and 50% of its overhealing is converted into an absorb shield for 10 sec."
    }

}
//------------------------------------------------
class BulkExtraction extends Ability {
    constructor() {
        super("Bulk Extraction", 0, 1.5, 0, 90, false, false, false, "fire", 40, 1)
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//Demolish the spirit of all those around you, dealing (30% of Attack power) Fire damage to nearby enemies and extracting up to 5 Lesser Soul Fragments," +
            " drawing them to you for immediate consumption."
    }

}