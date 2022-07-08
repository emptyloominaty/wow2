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
    caster.abilities["Leeching Poison"] = new LeechingPoison()
    caster.abilities["Cheat Death"] = new CheatDeath()
    caster.abilities["Elusiveness"] = new Elusiveness()

    //5
    caster.abilities["Internal Bleeding"] = new InternalBleeding()
    caster.abilities["Iron Wire"] = new IronWire()
    caster.abilities["Prey on the Weak"] = new PreyontheWeak()

    //6
    caster.abilities["Venom Rush"] = new VenomRush()
    caster.abilities["Alacrity"] = new Alacrity()
    caster.abilities["Exsanguinate"] = new Exsanguinate()

    //7
    caster.abilities["Poison Bomb"] = new PoisonBomb()
    caster.abilities["Hidden Blades"] = new HiddenBlades()
    caster.abilities["Crimson Tempest"] = new CrimsonTempest()

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
class LeechingPoison extends Ability {
    constructor() {
        super("Leeching Poison", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Adds a Leeching Poison effect to your Deadly Poison and Wound Poison, granting you 10% Leech."
    }

    setTalent(caster) {
        caster.statsBup.leech += 10
    }

    unsetTalent(caster) {
        caster.statsBup.leech -= 10
    }
}
//------------------------------------------------
class CheatDeath extends Ability {
    constructor() {
        super("Cheat Death", 0, 0, 0, 360, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 3
        this.effect = [{name:"damageReduction",val:0.85}]
    }
    //TODO:DEBUFF 360sec
    getTooltip() {
        return "Fatal attacks instead reduce you to 7% of your maximum health. For 3 sec afterward, you take 85% reduced damage. Cannot trigger more often than once per 6 min."
    }

    cheat(caster) {
        if (this.talentSelect && this.cd>=this.maxCd) {
            caster.health = caster.maxHealth * 0.07
            applyBuff(caster,caster,this)
            this.setCd()
        }
    }
}
//------------------------------------------------
class Elusiveness extends Ability {
    constructor() {
        super("Elusiveness", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Feint also reduces all damage you take from non-area-of-effect attacks by 30% for 6 sec."
    }

    setTalent(caster) {
        caster.abilities["Feint"].effect[1] = {name:"damageReduction",val:0.3}
    }

    unsetTalent(caster) {
        caster.abilities["Feint"].effect[1] = {name:"no"}
    }
}
//------------------------------------------------------------------------------------------------ROW5
class InternalBleeding extends Ability {
    constructor() {
        super("Internal Bleeding", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
        this.spellPower = 0.1872
    }

    getTooltip() {
        return "Kidney Shot also deals up to "+spellPowerToNumber(this.spellPower*5)+" Bleed damage over 6 sec, based on combo points spent."
    }

    applyDot(caster,target) {
        let spellPower = this.spellPower * caster.secondaryResource
        applyDot(caster,target,this,undefined,undefined,spellPower)
    }

}
//------------------------------------------------
class IronWire extends Ability {
    constructor() {
        super("Iron Wire", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Increase the duration of Garrote's silence effect by 3 sec.<br>" +
            "<br>" +
            "Enemies silenced by Garrote deal 15% reduced damage for 8 sec."
    }

}
//------------------------------------------------
class PreyontheWeak extends Ability {
    constructor() {
        super("Prey on the Weak", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
        this.effect = [{name:"damageTaken",val:0.10}]
    }

    getTooltip() {
        return "Enemies disabled by your Cheap Shot or Kidney Shot take 10% increased damage from all sources for 6 sec."
    }

    applyDebuff(caster,target) {
        applyDebuff(caster,target,this)
    }

}
//------------------------------------------------------------------------------------------------ROW6
class VenomRush extends Ability {
    constructor() {
        super("Venom Rush", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Mutilate refunds 8 Energy when used against a poisoned target."
    }
}
//------------------------------------------------
class Alacrity extends Ability {
    constructor() {
        super("Alacrity", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 20
        this.maxStacks = 5
        this.effect = [{name:"increaseStat",stat:"haste",val:2}]
    }

    getTooltip() {
        return "Your finishing moves have a 20 + (20 * ComboPoints)% chance per combo point to grant 2% Haste for 20 sec, stacking up to 5 times."
    }

    applyBuff(caster) {
        let comboPoints = caster.secondaryResource
        if (getChance(20+(20*comboPoints))) {
            applyBuff(caster,caster,this,1,true)
        }
    }
}
//------------------------------------------------
class Exsanguinate extends Ability {
    constructor() {
        super("Exsanguinate", 25, 1, 0, 45, false, false, false, "physical", 5, 1)
        this.talent = true
        this.permanentBuff = true
        this.duration = 10
    }

    getTooltip() {
        return "Twist your blades into the target's wounds, causing your Bleed effects on them to bleed out 100% faster."
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
                        applyDebuff(caster,caster.targetObj,this)
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
                this.cd = 0
                return true
            }

        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW7
class PoisonBomb extends Ability {
    constructor() {
        super("Poison Bomb", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 2
        this.spellPower = (0.44/2)*1.51
        this.chance = 4
        this.area = {type:"circle", radius:4, duration: 2,data:{type:"dot", maxTargets:"all", spellPower:this.spellPower, timer:1/*sec*/,color:"#8dff80",color2:"rgba(47,133,51,0.09)"},cast:false}
    }

    getTooltip() {
        return "Envenom and Rupture have a 4% chance per combo point spent to smash a vial of poison at the target's location, creating a pool of acidic death that deals " +spellPowerToNumber(this.spellPower*2)+
            " Nature damage over 2 sec to all enemies within it."
    }

    smashVial(caster,target) {
        if (getChance(this.chance*caster.secondaryResource)) {
            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,target.x,target.y,true,this.area.radius)
        }
    }

}
//------------------------------------------------
class HiddenBlades extends Ability {
    constructor() {
        super("Hidden Blades", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.permanentBuff = true
        this.duration = 10
        this.maxStacks = 20
        this.timer1 = 0
        this.timer2 = 2
    }

    run(caster) {
        if (this.talentSelect) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                applyBuff(caster,caster,this,1,true)
                this.timer1 = 0
            }
        }
    }

    getTooltip() {
        return "Every 2 sec, gain 20% increased damage for your next Fan of Knives, stacking up to 20 times."
    }

    unsetTalent(caster) {
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Hidden Blades") {
                caster.buffs[i].duration = -1
            }
        }
    }

}
//------------------------------------------------
class CrimsonTempest extends Ability {
    constructor() {
        let name = "Crimson Tempest"
        let cost = 35
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true

        this.spellPower = 0.0468*1.51
        this.spellPowerDot = 0.117*1.51
        this.secCost = "all"

    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)))
        let spellPowerDot = ((player.stats.primary * this.spellPowerDot) * (1 + (player.stats.vers / 100)) * (1 + (player.stats.haste / 100)))
        return "Finishing move that slashes all enemies within 10 yards, dealing instant damage and causing victims to bleed for additional damage. Lasts longer per combo point." +
            "<br>1 point: "+(spellPower*2).toFixed(0)+"  damage plus " +(spellPowerDot*2).toFixed(0)+" over 4 sec"+
            "<br>2 points: "+(spellPower*3).toFixed(0)+"  damage plus " +(spellPowerDot*3).toFixed(0)+" over 6 sec"+
            "<br>3 points: "+(spellPower*4).toFixed(0)+"  damage plus " +(spellPowerDot*4).toFixed(0)+" over 8 sec"+
            "<br>4 points: "+(spellPower*5).toFixed(0)+"  damage plus " +(spellPowerDot*5).toFixed(0)+" over 10 sec"+
            "<br>5 points: "+(spellPower*6).toFixed(0)+"  damage plus " +(spellPowerDot*6).toFixed(0)+" over 12 sec"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.duration = 2 + (2*caster.secondaryResource)
            let spellPower = this.spellPower * (1+caster.secondaryResource)
            let spellPowerDot = this.spellPower * (1+caster.secondaryResource)

            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                    doDamage(caster, enemies[i], this,undefined,spellPower)
                    applyDot(caster,enemies[i],this,undefined,spellPowerDot)
                }
            }

            if (caster.abilities["Elaborate Planning"].talentSelect) {
                applyBuff(caster,caster,caster.abilities["Elaborate Planning"])
            }

            if (caster.abilities["Alacrity"].talentSelect) {
                caster.abilities["Alacrity"].applyBuff(caster)
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
