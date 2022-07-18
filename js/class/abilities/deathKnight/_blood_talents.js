let _blood_talents = function(caster) {
    //1
    caster.abilities["Heartbreaker"] = new Heartbreaker()
    caster.abilities["Blooddrinker"] = new Blooddrinker()
    caster.abilities["Tombstone"] = new Tombstone()

    //2
    caster.abilities["Rapid Decomposition"] = new RapidDecomposition()
    caster.abilities["Hemostasis"] = new Hemostasis()
    caster.abilities["Consumption"] = new Consumption()

    //3
    caster.abilities["Foul Bulwark"] = new FoulBulwark()
    caster.abilities["Relish in Blood"] = new RelishinBlood()
    caster.abilities["Blood Tap"] = new BloodTap()

    //4
    caster.abilities["Will of the Necropolis"] = new WilloftheNecropolis()
    caster.abilities["Anti-Magic Barrier"] = new AntiMagicBarrier()
    caster.abilities["Mark of Blood"] = new MarkofBlood()

    //5
    caster.abilities["Grip of the Dead"] = new GripoftheDead()
    caster.abilities["Tightening Grasp"] = new TighteningGrasp()
    caster.abilities["Wraith Walk"] = new WraithWalk()

    //6
    caster.abilities["Voracious"] = new Voracious()
    caster.abilities["Death Pact"] = new DeathPact()
    caster.abilities["Bloodworms"] = new Bloodworms()

    //7
    //caster.abilities["Purgatory"] = new Purgatory()
    //caster.abilities["Red Thirst"] = new RedThirst()
    //caster.abilities["Bonestorm"] = new Bonestorm()


    caster.talents = [["Heartbreaker","Blooddrinker","Tombstone"],
        ["Rapid Decomposition","Hemostasis","Consumption"],
        ["Foul Bulwark","Relish in Blood","Blood Tap"],
        ["Will of the Necropolis","Anti-Magic Barrier","Mark of Blood"],
        ["Grip of the Dead","Tightening Grasp","Wraith Walk"],
        ["Voracious","Death Pact","Bloodworms"],
        ["Purgatory","Red Thirst","Bonestorm"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Heartbreaker extends Ability {
    constructor() {
        super("Heartbreaker", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Heart Strike generates 2 additional Runic Power per target hit."
    }

}
//------------------------------------------------
class Blooddrinker extends Ability {
    constructor() {
        super("Blooddrinker", -10, 1.5, 0, 30, true, false, false, "shadow", 30, 1)
        this.talent = true
        this.duration = 3
        this.secCost = 1
        this.spellPower = 0.5706
    }

    getTooltip() {
        return "Drains "+spellPowerToNumber(this.spellPower*3)+" health from the target over 3 sec.<br>" +
            "<br>" +
            "You can move, parry, dodge, and use defensive abilities while channeling this ability."
    }

    getBuffTooltip(caster, target, buff) {
        return "Draining "+spellPowerToNumber(this.spellPower)+" health from the target every 1 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget) && this.isEnemy(caster,caster.castTarget)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:1/(1 + (caster.stats.haste / 100)), timer2:1/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster, target, this)
                doHeal(caster,caster,this)

            }
        }
    }

}
//------------------------------------------------
class Tombstone extends Ability {
    constructor() {
        super("Tombstone", 0, 1.5, 0, 60, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.duration = 8
        this.effect = [{name:"absorb",val:0}]
    }

    getTooltip() {
        return "Consume up to 5 Bone Shield charges. For each charge consumed, you gain 6 Runic Power and absorb damage equal to 6% of your maximum health for 8 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbing "+buff.effect[0].val+" damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {

            let stacks = 0
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Bone Shield") {
                    if (caster.buffs[i].stacks<6) {
                        stacks = caster.buffs[i].stacks
                        caster.buffs[i].duration = -1
                    } else {
                        caster.buffs[i].stacks -= 5
                        stacks = 5
                    }
                }
            }
            if (stacks===0) {
                return false
            }

            let cost = stacks * -6
            this.effect[0].val = caster.maxHealth*(stacks*0.06)
            applyBuff(caster,caster,this)

            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            this.setCd()
            caster.useEnergy(cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW2
class RapidDecomposition extends Ability {
    constructor() {
        super("Rapid Decomposition", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Your Blood Plague and Death and Decay deal damage 15% more often.<br>" +
            "<br>" +
            "Additionally, your Blood Plague leeches 50% more Health."
    }

}
//------------------------------------------------
class Hemostasis extends Ability {
    constructor() {
        super("Hemostasis", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 15
        this.maxStacks = 5
    }

    getTooltip() {
        return "Each enemy hit by Blood Boil increases the damage and healing done by your next Death Strike by 8%, stacking up to 5 times."
    }
}
//------------------------------------------------
class Consumption extends Ability {
    constructor() {
        super("Consumption", 0, 1.5, 0, 30, false, false, false, "physical", 8, 1)
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Strikes all enemies in front of you with a hungering attack that deals (65.52% of Attack power)% Physical damage and heals you for 150% of that damage. Deals reduced damage beyond 8 targets."
    }

}
//------------------------------------------------------------------------------------------------ROW3
class FoulBulwark extends Ability {
    constructor() {
        super("Foul Bulwark", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Each charge of Bone Shield increases your maximum health by 1%."
    }
}
//------------------------------------------------
class RelishinBlood extends Ability {
    constructor() {
        super("Relish in Blood", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {//TODO:
        return "//NOT IMPLEMENTED//While Crimson Scourge is active, your next Death and Decay heals you for (24% of Attack power) health per Bone Shield charge and you immediately gain 10 Runic Power."
    }
}
//------------------------------------------------
class BloodTap extends Ability {
    constructor() {
        super("Blood Tap", 0, 0, 0, 60, false, false, false, "shadow", 5, 2)
        this.talent = true
        this.talentSelect = true
        this.noGcd = true
        this.secCost = -1
    }

    getTooltip() {
        return "Consume the essence around you to generate 1 Rune.<br>" +
            "<br>" +
            "Recharge time reduced by 2 sec whenever a Bone Shield charge is consumed." //TODO:
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
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
//------------------------------------------------------------------------------------------------ROW4
class WilloftheNecropolis extends Ability {
    constructor() {
        super("Will of the Necropolis", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
}

    getTooltip() {
        return "Damage taken below 30% Health is reduced by 30%."
    }
}
//------------------------------------------------
class AntiMagicBarrier extends Ability {
    constructor() {
        super("Anti-Magic Barrier", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Anti-Magic Shell by 20 sec and increases its duration and amount absorbed by 40%."
    }

    setTalent(caster) {
        caster.abilities["Anti-Magic Shell"].cd -= 20
        caster.abilities["Anti-Magic Shell"].maxCd -= 20
        caster.abilities["Anti-Magic Shell"].duration *= 1.4
    }
    unsetTalent(caster) {
        caster.abilities["Anti-Magic Shell"].cd += 20
        caster.abilities["Anti-Magic Shell"].maxCd += 20
        caster.abilities["Anti-Magic Shell"].duration /= 1.4
    }
}
//------------------------------------------------
class MarkofBlood extends Ability {
    constructor() {
        super("Mark of Blood", 0, 1.5, 0, 6, false, false, false, "shadow", 15, 1)
        this.talent = true
        this.duration = 15
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Places a Mark of Blood on an enemy for 15 sec. The enemy's damaging auto attacks will also heal their victim for 3% of the victim's maximum health."
    }
}
//------------------------------------------------------------------------------------------------ROW5
class GripoftheDead extends Ability {
    constructor() {
        super("Grip of the Dead", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO:
        return "//NOT IMPLEMENTED//Death and Decay reduces the movement speed of enemies within its area by 90%, decaying by 10% every sec."
    }

}
//------------------------------------------------
class TighteningGrasp extends Ability {
    constructor() {
        super("Tightening Grasp", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Reduces the cooldown on Gorefiend's Grasp by 30 sec."
    }

    setTalent(caster) {
        caster.abilities["Gorefiend's Grasp"].cd -= 30
        caster.abilities["Gorefiend's Grasp"].maxCd -= 30
    }
    unsetTalent(caster) {
        caster.abilities["Gorefiend's Grasp"].cd += 30
        caster.abilities["Gorefiend's Grasp"].maxCd += 30
    }
}
//------------------------------------------------
class WraithWalk extends Ability {
    constructor() {
        super("Wraith Walk", 0, 1.5, 0, 60, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.duration = 4
        this.effect = [{name:"moveSpeed",val:0.7}]
    }

    getTooltip() { //TODO:Taking any action cancels the effect.  While active, your movement speed cannot be reduced below 170%
        return "Embrace the power of the Shadowlands, removing all root effects and increasing your movement speed by 70% for 4 sec. Taking any action cancels the effect.<br>" +
            "<br>" +
            "While active, your movement speed cannot be reduced below 170%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Movement speed increased by 70%.<br>" +
            "Cannot be slowed below 170% of normal movement speed.<br>" +
            "Cannot attack."
    }

}
//------------------------------------------------------------------------------------------------ROW6
class Voracious extends Ability {
    constructor() {
        super("Voracious", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 8
        this.effect = [{name:"increaseStat",stat:"leech",val:15}]
    }

    getTooltip() {
        return "Death Strike's healing is increased by 20% and grants you 15% Leech for 8 sec."
    }

}
//------------------------------------------------
class DeathPact extends Ability {
    constructor() {
        super("Death Pact", 0, 0, 0, 120, false, false, false, "shadow", 5, 1)
        this.talent = true
        this.noGcd = true
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//Create a death pact that heals you for 50% of your maximum health, but absorbs incoming healing equal to 30% of your max health for 15 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "The next 0 healing received will be absorbed." //TODO
    }

}
//------------------------------------------------
class Bloodworms extends Ability {
    constructor() {
        super("Bloodworms", 0, 0, 0, 0, false, false, false, "shadow", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() { //TODO
        return "//NOT IMPLEMENTED//Your auto attacks have a chance to summon a Bloodworm.<br>" +
            "<br>" +
            "Bloodworms deal minor damage to your target for 15 sec and then burst, healing you for 15% of your missing health.<br>" +
            "<br>" +
            "If you drop below 50% health, your Bloodworms will immediately burst and heal you."
    }
}
//------------------------------------------------------------------------------------------------ROW7
//------------------------------------------------
//------------------------------------------------