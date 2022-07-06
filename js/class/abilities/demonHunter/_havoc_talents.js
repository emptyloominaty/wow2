let _havoc_talents = function(caster) {
    //1
    caster.abilities["Blind Fury"] = new BlindFury()
    caster.abilities["Demonic Appetite"] = new DemonicAppetite()
    caster.abilities["Felblade"] = new Felblade()

    //2
    caster.abilities["Insatiable Hunger"] = new InsatiableHunger()
    caster.abilities["Burning Hatred"] = new BurningHatred()
    caster.abilities["Demon Blades"] = new DemonBlades()

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

    caster.talents = [["Blind Fury","Demonic Appetite","Felblade"],
        ["Insatiable Hunger","Burning Hatred","Demon Blades"],
        ["Trail of Ruin","Unbound Chaos","Glaive Tempest"],
        ["Soul Rending","Desperate Instincts","Netherwalk"],
        ["Cycle of Hatred","First Blood","Essence Break"],
        ["Unleashed Power","Master of the Glaive","Fel Eruption"],
        ["Demonic","Momentum","Fel Barrage"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class BlindFury extends Ability {
    constructor() {
        super("Blind Fury", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Eye Beam generates 40 Fury every sec. and its duration is increased by 50%."
    }

    setTalent(caster) {
        caster.abilities["Eye Beam"].duration *= 1.5
    }

    unsetTalent(caster) {
        caster.abilities["Eye Beam"].duration /= 1.5
    }
}
//------------------------------------------------Demonic Appetite
class DemonicAppetite extends Ability {
    constructor() {
        super("Demonic Appetite", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //Approximately [6 + Haste] procs per minute
        return "//NOT IMPLEMENTED// Chaos Strike has a chance to spawn a Lesser Soul Fragment. Consuming any Soul Fragment grants 30 Fury."
    }
}
//------------------------------------------------
class Felblade extends Ability {
    constructor() {
        super("Felblade", -40, 1.5, 0, 15, false, false, false, "fire", 15, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.6669
        this.hasteCd = true

        this.effect = [{name:"moveToTarget",val:7,target:0}]
        this.duration = 1.3
        this.canCastWhileRooted = false

    }

    getTooltip() {
        if (player.spec==="havoc") {
            return "Charge to your target and deal "+spellPowerToNumber(this.spellPower)+" Fire damage.<br>" +
                "Demon's Bite has a chance to reset the cooldown of Felblade.<br> Generates 40 Fury."
        } else {
            return "Charge to your target and deal "+spellPowerToNumber(this.spellPower)+" Fire damage.<br>" +
                "Shear has a chance to reset the cooldown of Felblade.<br>" +  //TODO:  PPM 2 * (1 + TotalHaste)
                "Generates 40 Fury."
        }
    }


    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && !caster.castTarget.isDead && this.checkDistance(caster,caster.castTarget)) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                if (caster.isCasting) {
                    caster.isCasting = false
                }
                caster.isRolling = true
                this.effect[0].target = caster.castTarget.id
                doDamage(caster,caster.castTarget,this)

                this.setGcd(caster)
                this.setCd()
                applyBuff(caster, caster, this)
                caster.useEnergy(this.cost)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    endBuff(caster) {
        doDamage(caster, creatures[this.effect[0].target], this)
        caster.isRolling = false
    }

}
//------------------------------------------------------------------------------------------------ROW2
class InsatiableHunger extends Ability {
    constructor() {
        super("Insatiable Hunger", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Demon's Bite deals 20% more damage and generates 5 to 10 additional Fury."
    }

    setTalent(caster) {
        caster.abilities["Demon's Bite"].spellPower *= 1.2
        caster.abilities["Demon's Bite"].cost -= 8
    }

    unsetTalent(caster) {
        caster.abilities["Demon's Bite"].spellPower /= 1.2
        caster.abilities["Demon's Bite"].cost += 8
    }
}
//------------------------------------------------
class BurningHatred extends Ability {
    constructor() {
        super("Burning Hatred", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Demon's Bite deals 20% more damage and generates 5 to 10 additional Fury."
    }

    setTalent(caster) {
        caster.abilities["Demon's Bite"].spellPower *= 1.2
        caster.abilities["Demon's Bite"].cost -= 8
    }

    unsetTalent(caster) {
        caster.abilities["Demon's Bite"].spellPower /= 1.2
        caster.abilities["Demon's Bite"].cost += 8
    }
}
//------------------------------------------------
class DemonBlades extends Ability {
    constructor() {
        super("Demon Blades", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.1518
    }

    getTooltip() {
        return "Your auto attacks have a 60% chance to deal additional Shadow damage and generate Fury."
    }

    setTalent(caster) {
        caster.abilities["Demon's Bite"].canUse = false
    }

    unsetTalent(caster) {
        caster.abilities["Demon's Bite"].canUse = true
    }

    doDamage(caster,target) {
        if (getChance(60)) {
            let fury = 12+Math.ceil(Math.random()*8)
            doDamage(caster,target,this)
            caster.useEnergy(-fury)
        }
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
