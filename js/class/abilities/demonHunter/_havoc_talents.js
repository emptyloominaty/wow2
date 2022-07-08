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
    caster.abilities["Trail of Ruin"] = new TrailofRuin()
    caster.abilities["Unbound Chaos"] = new UnboundChaos()
    caster.abilities["Glaive Tempest"] = new GlaiveTempest()

    //4
    caster.abilities["Soul Rending"] = new SoulRending()
    caster.abilities["Desperate Instincts"] = new DesperateInstincts()
    caster.abilities["Netherwalk"] = new Netherwalk()

    //5
    caster.abilities["Cycle of Hatred"] = new CycleofHatred()
    caster.abilities["First Blood"] = new FirstBlood()
    caster.abilities["Essence Break"] = new EssenceBreak()

    //6
    caster.abilities["Unleashed Power"] = new UnleashedPower()
    caster.abilities["Master of the Glaive"] = new MasteroftheGlaive()
    caster.abilities["Fel Eruption"] = new FelEruption()

    //7
    caster.abilities["Demonic"] = new Demonic()
    caster.abilities["Momentum"] = new Momentum()
    caster.abilities["Fel Barrage"] = new FelBarrage()

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
//------------------------------------------------
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
                "Shear has a chance to reset the cooldown of Felblade.<br>" +
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
class TrailofRuin extends Ability {
    constructor() {
        super("Trail of Ruin", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 4
        this.spellPower = 0.5896
    }

    getTooltip() {
        return "The final slash of Blade Dance inflicts an additional "+spellPowerToNumber(this.spellPower)+" Chaos damage over 4 sec."
    }
}
//------------------------------------------------
class UnboundChaos extends Ability {
    constructor() {
        super("Unbound Chaos", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 20
    }

    getTooltip() {
        return "Activating Immolation Aura increases the damage of your next Fel Rush by 500%. Lasts 20 sec."
    }
}
//------------------------------------------------
class GlaiveTempest extends Ability {
    constructor() {
        super("Glaive Tempest", 30, 1.5, 0, 20, false, false, false, "chaos", 8, 1)
        this.talent = true
        this.spellPower = 0.1518
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Launch two demonic glaives in a whirlwind of energy, causing [14 * (15.3% of Attack power)] Chaos damage over 3 sec to all nearby enemies."
    }
}
//------------------------------------------------------------------------------------------------ROW4
class SoulRending extends Ability {
    constructor() {
        super("Soul Rending", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 10
        this.permanentBuff = true
        this.hiddenBuff = true
        this.effect = [{name:"increaseStat",stat:"leech",val:10}]
    }

    getTooltip() {
        return "Leech increased by 10%.<br>" +
            "<br>" +
            "Gain an additional 20% Leech while Metamorphosis is active."
    }

    setTalent(caster) {
        applyBuff(caster,caster,this)
        caster.abilities["Metamorphosis"].effect.push({name:"increaseStat",stat:"leech",val:20})
    }

    unsetTalent(caster) {
        checkBuff(caster,caster,"Soul Rending",true)
        caster.abilities["Metamorphosis"].effect.pop()
    }

}
//------------------------------------------------
class DesperateInstincts extends Ability {
    constructor() {
        super("Desperate Instincts", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.effect = [{name:"increaseStat",stat:"leech",val:10}]
    }

    getTooltip() {
        return "Blur now reduces damage taken by an additional 10%. <br><br>" +
            "//NOT IMPLEMENTED//Additionally, you automatically trigger Blur with 50% reduced cooldown and duration when you fall below 35% health. This effect can only occur when Blur is not on cooldown."
    } //TODO:

    setTalent(caster) {
        caster.abilities["Blur"].effect[0].val += 0.1
    }

    unsetTalent(caster) {
        caster.abilities["Blur"].effect[0].val -= 0.1
    }

}
//------------------------------------------------
class Netherwalk extends Ability {
    constructor() {
        super("Netherwalk", 0, 1.5, 0, 180, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 6
        this.effect = [{name:"damageReduction",val:1},{name:"moveSpeed",val:1},{name:"interrupt"}]
    }

    getTooltip() {
        return "Slip into the nether, increasing movement speed by 100% and becoming immune to damage, but unable to attack. Lasts 6 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Immune to damage and unable to attack.<br>" +
            "Movement speed increased by 100%."
    }

    setTalent(caster) {
        caster.abilities["Blur"].effect[0].val += 0.1
    }

    unsetTalent(caster) {
        caster.abilities["Blur"].effect[0].val -= 0.1
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW5
class CycleofHatred extends Ability {
    constructor() {
        super("Cycle of Hatred", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "When Chaos Strike refunds Fury, it also reduces the cooldown of Eye Beam by 3 sec."
    }

}
//------------------------------------------------
class FirstBlood extends Ability {
    constructor() {
        super("First Blood", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the Fury cost of Blade Dance by 20 and increases its damage to "+spellPowerToNumber(0.66*2.35)+" against the first target struck."
    }


    setTalent(caster) {
        caster.abilities["Blade Dance"].cost -= 20
    }

    unsetTalent(caster) {
        caster.abilities["Blade Dance"].cost += 20
    }

}
//------------------------------------------------
class EssenceBreak extends Ability {
    constructor() {
        super("Essence Break", 0, 1.5, 0, 20, false, false, false, "chaos", 10, 1)
        this.talent = true
        this.spellPower = 0.590733*1.08
        this.duration = 8
    }

    getTooltip() {
        return "Slash all enemies in front of you for "+spellPowerToNumber(this.spellPower)+" Chaos damage, and increase the damage your Chaos Strike and Blade Dance deal to them by 40% for 8 sec."
    }

    startCast(caster,pet = false) {
        if (this.checkStart(caster)) {

            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,75)) {
                        doDamage(caster, targets[i], this)
                    }
                }
            }
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}
//------------------------------------------------------------------------------------------------ROW6
class UnleashedPower extends Ability {
    constructor() {
        super("Unleashed Power", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Removes the Fury cost of Chaos Nova and reduces its cooldown by 33%."
    }


    setTalent(caster) {
        caster.abilities["Chaos Nova"].cost = 0
        caster.abilities["Chaos Nova"].maxCd /= 1.33
    }

    unsetTalent(caster) {
        caster.abilities["Blade Dance"].cost = 30
        caster.abilities["Chaos Nova"].maxCd *= 1.33
    }

}
//------------------------------------------------
class MasteroftheGlaive extends Ability {
    constructor() {
        super("Master of the Glaive", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
        this.effect = [{name:"moveSpeed",val:0.5}]
    }

    getTooltip() {
        return "Throw Glaive has 2 charges, and snares all enemies hit by 50% for 6 sec."
    }


    setTalent(caster) {
        caster.abilities["Throw Glaive"].charges ++
    }

    unsetTalent(caster) {
        caster.abilities["Throw Glaive"].charges --
    }

}
//------------------------------------------------
class FelEruption extends Ability {
    constructor() {
        super("Fel Eruption", 10, 1.5, 0, 30, false, false, false, "chaos", 20, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.3276
        this.effect = [{name:"stun"}]
        this.duration = 4
    }

    getTooltip() {
        return "Impales the target for "+spellPowerToNumber(this.spellPower)+" Chaos damage and stuns them for 4 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && !caster.castTarget.isDead && this.checkDistance(caster,caster.castTarget)) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                doDamage(caster,caster.castTarget,this)
                applyDebuff(caster, caster.castTarget, this)

                this.setGcd(caster)
                this.setCd()
                caster.useEnergy(this.cost)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW7
class Demonic extends Ability {
    constructor() {
        super("Demonic", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Eye Beam causes you to enter demon form for 6 sec after it finishes dealing damage."
    }

}
//------------------------------------------------
class Momentum extends Ability {
    constructor() {
        super("Momentum", 0, 0, 0, 0, false, false, false, "chaos", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 6
        this.effect = [{name:"increaseDamage",val:0.15}]
    }

    getTooltip() {
        return "Fel Rush increases your damage done by 15% for 6 sec.<br>" +
            "<br>" +
            "Vengeful Retreat's cooldown is reduced by 5 sec, and it generates 80 Fury over 10 sec if it damages at least one enemy."
    }

    setTalent(caster) {
        caster.abilities["Vengeful Retreat"].maxCd -=5
    }

    unsetTalent(caster) {
        caster.abilities["Vengeful Retreat"].maxCd +=5
    }

}
//------------------------------------------------
class FelBarrage extends Ability {
    constructor() {
        super("Fel Barrage", 0, 1.5, 3, 60, true, false, false, "chaos", 8, 1)
        this.talent = true
        this.duration = 3
        this.spellPower = 0.242
    }

    getTooltip() {
        return "Unleash a torrent of Fel energy over 3 sec, inflicting "+spellPowerToNumber(this.spellPower*13)+" Chaos damage to all enemies within 8 yds."
    }

    getBuffTooltip(caster, target, buff) {
        return "Unleashing Fel."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration, timer:0.25/(1 + (caster.stats.haste / 100)), timer2:0.25/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            caster.canMoveWhileCasting = true
            this.setCd()
            this.setGcd(caster)
            let secCost = this.secCost

            caster.useEnergy(this.cost,secCost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        let targets = enemies
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                doDamage(caster, targets[i], this)
            }
        }
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }



}