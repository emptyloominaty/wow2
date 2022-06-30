let _assassination_talents = function(caster) {
    //1
    caster.abilities["Master Poisoner"] = new MasterPoisoner()
    caster.abilities["Elaborate Planning"] = new ElaboratePlanning()
    caster.abilities["Blindside"] = new Blindside()

    //2
    caster.abilities["Nightstalker"] = new Nightstalker()
    caster.abilities["Subterfuge"] = new Subterfuge()
    caster.abilities["Master Assassin"] = new MasterAssassin()

    //3
    caster.abilities["Vigor"] = new Vigor()
    caster.abilities["Deeper Stratagem"] = new DeeperStratagem()
    caster.abilities["Marked for Death"] = new MarkedforDeath()

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

    caster.talents = [["Master Poisoner","Elaborate Planning","Blindside"],
        ["Nightstalker","Subterfuge","Master Assassin"],
        ["Vigor","Deeper Stratagem","Marked for Death"],
        ["Leeching Poison","Cheat Death","Elusiveness"],
        ["Internal Bleeding","Iron Wire","Prey on the Weak"],
        ["Venom Rush","Alacrity","Exsanguinate"],
        ["Poison Bomb","Hidden Blades","Crimson Tempest"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class MasterPoisoner extends Ability {
    constructor() {
        super("Master Poisoner", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Increases the damage done by your weapon poisons by 30% and their non-damaging effects by 20%."
    }

    setTalent(caster) {
        caster.abilities["Deadly Poison"].effectValue.spellPower *= 1.3
        caster.abilities["Deadly Poison"].spellPower *= 1.3
        caster.abilities["Deadly Poison"].effectValue.spellPowerDot *= 1.3
        caster.abilities["Deadly Poison"].spellPowerDot *= 1.3
    }

    unsetTalent(caster) {
        caster.abilities["Deadly Poison"].effectValue.spellPower /= 1.3
        caster.abilities["Deadly Poison"].spellPower /= 1.3
        caster.abilities["Deadly Poison"].effectValue.spellPowerDot /= 1.3
        caster.abilities["Deadly Poison"].spellPowerDot /= 1.3
    }
}
//------------------------------------------------
class ElaboratePlanning extends Ability {
    constructor() {
        super("Elaborate Planning", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"increaseDamage",val:0.1}]
        this.duration = 4
    }
    //TODO: CrimsonTempest
    getTooltip() {
        return "Your finishing moves grant 10% increased damage done for 4 sec."
    }
}
//------------------------------------------------
class Blindside extends Ability {
    constructor() {
        super("Blindside", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 10
    }

    getTooltip() {
        return "Mutilate has a 20% chance to make your next Ambush free and usable without Stealth. Chance increased to 40% if the target is under 35% health."
    }

    endBuff(caster) {
        caster.abilities["Ambush"].canUseWithoutStealth = false
    }

}
//------------------------------------------------------------------------------------------------ROW2
class Nightstalker extends Ability {
    constructor() {
        super("Nightstalker", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.permanentBuff = true
        this.effect = [{name:"moveSpeed",val:0.2},{name:"increaseDamage",val:0.5},{name:"endWithStealth"}]
        this.duration = 10
    }

    getTooltip() { //TODO: SUB: or Shadow Dance
        return "While Stealth is active, you move 20% faster and your abilities deal 50% more damage."
    }

}
//------------------------------------------------
class Subterfuge extends Ability {
    constructor() {
        super("Subterfuge", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 3
    }

    getTooltip() { //TODO:SUB: SHADOW DANCE
        let tooltip = "Your abilities requiring Stealth can still be used for 3 sec after Stealth breaks."
        if (player.spec==="subtlety") {
            tooltip += "Also increases the duration of Shadow Dance by 1 sec"
        } else {
            tooltip += "Also causes Garrote to deal 80% increased damage and have no cooldown when used from Stealth and for 3 sec after breaking Stealth"
        }
        return tooltip
    }

}

//------------------------------------------------
class MasterAssassin extends Ability {
    constructor() {
        super("Master Assassin", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.effect = [{name:"increaseStat",stat:"crit",val:50}]
        this.duration = 3
    }

    getTooltip() {
        return "While Stealth is active and for 3 sec after breaking Stealth, your critical strike chance is increased by 50%."
    }

}
//------------------------------------------------------------------------------------------------ROW3
class Vigor extends Ability {
    constructor() {
        super("Vigor", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Increases your maximum Energy by 50 and your Energy regeneration by 10%."
    }

    setTalent(caster) {
        caster.energy += 50
        caster.maxEnergy += 50
        caster.energyRegen += 1
    }

    unsetTalent(caster) {
        caster.energy -= 50
        caster.maxEnergy -= 50
        caster.energyRegen -= 1
    }
}
//------------------------------------------------
class DeeperStratagem extends Ability {
    constructor() {
        super("Deeper Stratagem", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "You may have a maximum of 6 combo points, your finishing moves consume up to 6 combo points, and your finishing moves deal 5% increased damage."
    }

    setTalent(caster) {
        caster.maxSecondaryResource += 1
    }

    unsetTalent(caster) {
        caster.maxSecondaryResource -= 1
    }
}
//------------------------------------------------
class MarkedforDeath extends Ability {
    constructor() {
        super("Marked for Death", 0, 0, 0, 60, false, false, false, "physical", 30, 1)
        this.talent = true
        this.dontBreakStealth = true
        this.secCost -= 5
        this.duration = 60
    }

    getTooltip() {
        return "Marks the target, instantly generating 5 combo points. Cooldown reset if the target dies within 1 min."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    applyDebuff(caster,caster.castTarget,this)
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
                        applyDebuff(caster,caster.castTarget,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    onDeath(caster,target,buff) {
        this.cd = this.maxCd
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
