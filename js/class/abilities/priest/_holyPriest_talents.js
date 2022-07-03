let _holyPriest_talents = function(caster) {
    //1
    caster.abilities["Enlightenment"] = new Enlightenment()
    caster.abilities["Trail of Light"] = new TrailofLight()
    caster.abilities["Renewed Faith"] = new RenewedFaith()

    //2
    caster.abilities["Angel's Mercy"] = new AngelsMercy()
    caster.abilities["Body and Soul"] = new BodyandSoul()
    caster.abilities["Angelic Feather"] = new AngelicFeather()

    //3
    caster.abilities["Binding Heals"] = new BindingHeals()
    caster.abilities["Guardian Angel"] = new GuardianAngel()
    caster.abilities["Afterlife"] = new Afterlife()

    //4
    caster.abilities["Psychic Voice"] = new PsychicVoice()
    caster.abilities["Censure"] = new Censure()
    caster.abilities["Shining Force"] = new ShiningForce()

    //5
    caster.abilities["Surge of Light"] = new SurgeofLight()
    caster.abilities["Cosmic Ripple"] = new CosmicRipple()
    caster.abilities["Prayer Circle"] = new PrayerCircle()

    //6
    caster.abilities["Benediction"] = new Benediction()
    caster.abilities["Divine Star"] = new DivineStar()
    caster.abilities["Halo"] = new Halo()

    //7
    caster.abilities["Light of the Naaru"] = new LightoftheNaaru()
    caster.abilities["Apotheosis"] = new Apotheosis()
    caster.abilities["Holy Word: Salvation"] = new HolyWordSalvation()

    caster.talents = [["Enlightenment","Trail of Light","Renewed Faith"],
        ["Angel's Mercy","Body and Soul","Angelic Feather"],
        ["Binding Heals","Guardian Angel","Afterlife"],
        ["Psychic Voice","Censure","Shining Force"],
        ["Surge of Light","Cosmic Ripple","Prayer Circle"],
        ["Benediction","Divine Star","Halo"],
        ["Light of the Naaru","Apotheosis","Holy Word: Salvation"]
    ]
}
//------------------------------------------------------------------------------------------------ROW1
class Enlightenment extends Ability {
    constructor() {
        super("Enlightenment", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "You regenerate mana 10% faster."
    }

    setTalent(caster) {
        caster.energyRegen += 0.08
    }

    unsetTalent(caster) {
        caster.energyRegen -= 0.08
    }

}
//------------------------------------------------
class TrailofLight extends Ability {
    constructor() {
        super("Trail of Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.lastTarget = false
    }

    getTooltip() {
        return "When you cast Heal or Flash Heal, 35% of the healing is replicated to the previous target you healed with Heal or Flash Heal."
    }

    heal(caster,target,ability) {
        if (this.talentSelect) {
            if (this.lastTarget && !this.lastTarget.isDead) {
                doHeal(caster,this.lastTarget,ability,undefined,ability.spellPower*0.35)
            }
            this.lastTarget = friendlyTargets[target.id2]
        }
    }

}
//------------------------------------------------
class RenewedFaith extends Ability {
    constructor() {
        super("Renewed Faith", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Your healing is increased by 10% on targets with your Renew."
    }
}
//------------------------------------------------------------------------------------------------ROW2
class AngelsMercy extends Ability {
    constructor() {
        super("Angel's Mercy", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Damage you take reduces the cooldown of Desperate Prayer, based on the amount of damage taken."
    }

    takeDamage(caster,damage) {
        let val = (damage / caster.maxHealth) * 15
        caster.abilities["Desperate Prayer"].incCd(caster,val,false)
    }
}
//------------------------------------------------
class BodyandSoul extends Ability {
    constructor() {
        super("Body and Soul", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 3
        this.effect = [{name:"moveSpeed",val:0.4}]
    }

    getTooltip() {
        return "Power Word: Shield and Leap of Faith increase your target's movement speed by 40% for 3 sec."
    }

}
//------------------------------------------------
class AngelicFeather extends Ability {
    constructor() {
        super("Angelic Feather", 0, 1.5, 0, 20, false, false, false, "holy", 40, 3)
        this.talent = true
        this.talentSelect = true
        this.effect = [{name:"moveSpeed",val:0.4}]
        this.duration = 5
        this.area = {type:"circle", radius:2, duration: 20,data:{type:"applyBuffOneTarget",color:"#f8ff81",color2:"rgba(253,255,139,0.65)",cast:false}}

        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Places a feather at the target location, granting the first ally to walk through it 40% increased movement speed for 5 sec. Only 3 feathers can be placed at one time."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW3
class BindingHeals extends Ability {
    constructor() {
        super("Binding Heals", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "20% of Heal or Flash Heal healing on other targets also heals you."
    }

}
//------------------------------------------------
class GuardianAngel extends Ability {
    constructor() {
        super("Guardian Angel", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Guardian Spirit by 60 sec."
        // TODO: "When Guardian Spirit saves the target from death, it does not expire.<br>" +
       //    "<br>" +
        //    "When Guardian Spirit expires without saving the target from death, reduce its remaining cooldown to 60 seconds."
    }

    setTalent(caster) {
        caster.abilities["Guardian Spirit"].cd -= 60
        caster.abilities["Guardian Spirit"].maxCd -= 60

    }

    unsetTalent(caster) {
        caster.abilities["Guardian Spirit"].cd += 60
        caster.abilities["Guardian Spirit"].maxCd += 60

    }
}
//------------------------------------------------
class Afterlife extends Ability {
    constructor() {
        super("Afterlife", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "//NOT IMPLEMENTED//Increases the duration of Spirit of Redemption by 50% and the range of its spells by 50%.<br>" +
            "<br>" +
            "As a Spirit of Redemption, you may sacrifice your spirit to Resurrect an ally, putting yourself to rest."
    }
}
//------------------------------------------------------------------------------------------------ROW4
class PsychicVoice extends Ability {
    constructor() {
        super("Psychic Voice", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Psychic Scream by 30 sec."
    }

    setTalent(caster) {
        /*TODO: caster.abilities["Psychic Scream"].cd -= 60
        caster.abilities["Psychic Scream"].maxCd -= 60*/
    }

    unsetTalent(caster) {
        /*TODO: caster.abilities["Psychic Scream"].cd += 60
        caster.abilities["Psychic Scream"].maxCd += 60*/

    }
}
//------------------------------------------------
class Censure extends Ability {
    constructor() {
        super("Censure", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Holy Word: Chastise stuns the target for 4 sec and is not broken by damage."
    }

    setTalent(caster) {
        caster.abilities["Holy Word: Chastise"].effect[0] = {name:"stun"}
    }

    unsetTalent(caster) {
        caster.abilities["Holy Word: Chastise"].effect[0] = {name:"incapacitate"}
    }
}
//------------------------------------------------
class ShiningForce extends Ability {
    constructor() {
        super("Shining Force", 2.5, 1.5, 0, 45, false, false, false, "holy", 40, 1)
        this.talent = true
        this.effect = [{name:"moveSpeed",val:0.7}]
        this.duration = 3
        this.area = {type:"circle", radius:10, duration: 0.2,data:{type:"applyDebuff",color:"#f8ff81",color2:"rgba(253,255,139,0.38)",cast:false}}
        this.area2 = {type:"circle", radius:10, duration: 0.5,data:{type:"ringofPeace",color:"#f8ff81",color2:"rgba(253,255,139,0.38)",cast:false}}
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Creates a burst of light around a friendly target, knocking away nearby enemies and slowing their movement speed by 70% for 3 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)
            addArea(areas.length,caster,this,this.area2.type,this.area2.duration,this.area2.data,this.castPosition.x,this.castPosition.y,false,this.area2.radius)

            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------------------------------------------------------ROW5
class SurgeofLight extends Ability {
    constructor() {
        super("Surge of Light", 0, 0, 0, 0, false, false, false, "holy", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.duration = 20
        this.maxStacks = 2
    }

    getTooltip() {
        return "Your healing spells and Smite have a 8% chance to make your next Flash Heal instant and cost no mana. Stacks to 2."
    }

    chance(caster) { //TODO: Halo
        if (this.talentSelect && getChance(8)) {
            applyBuff(caster,caster,this,2,true)
        }
    }
}
//------------------------------------------------
class CosmicRipple extends Ability {
    constructor() {
        super("Cosmic Ripple", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
        this.spellPower = 0.42
        this.targetsHeal = 5
    }

    getTooltip() {
        return "When Holy Word: Serenity or Holy Word: Sanctify finish their cooldown, you emit a burst of light that heals up to 5 injured targets for (42% of Spell power)."
    }

    burst(caster) {
        let tth = 0
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth && this.checkDistance(caster, friendlyTargets[i],undefined,true)) {
                doHeal(caster, friendlyTargets[i], this)
                tth++
                if (tth>=this.targetsHeal) {
                    break
                }
            }
        }
    }
}
//------------------------------------------------
class PrayerCircle extends Ability {
    constructor() {
        super("Prayer Circle", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
        this.duration = 8
    }

    getTooltip() {
        return "Using Circle of Healing reduces the cast time and cost of your Prayer of Healing by 25% for 8 sec."
    }
}
//------------------------------------------------------------------------------------------------ROW6
class Benediction extends Ability {
    constructor() {
        super("Benediction", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Your Prayer of Mending has a 25% chance to leave a Renew on each target it heals."
    }
}
//------------------------------------------------
class DivineStar extends Ability {
    constructor() {
        super("Divine Star", 2, 1.5, 0, 15, false, false, false, "holy", 30, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.56
        this.spellPowerHeal = 0.70
        this.area = {type:"circle", radius:8, duration:3,data:{type:"damage", maxTargets:"all", spellPower:this.spellPower,moving:true,returnBack:true,speed:22.5,color:"#fff08f",color2:"rgba(255,253,156,0.16)"}}
        this.area2 = {type:"circle", radius:8, duration:3,data:{type:"heal", maxTargets:6, spellPower:this.spellPowerHeal,moving:true,returnBack:true,speed:22.5,color:"#fff08f",color2:"rgba(255,253,156,0.16)"}}

    }

    getTooltip() {
        return "Throw a Divine Star forward 24 yds, healing allies in its path for "+spellPowerToNumber(this.spellPowerHeal)+" and dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to enemies." +
            " After reaching its destination, the Divine Star returns to you, healing allies and damaging enemies in its path again. Healing reduced beyond 6 targets."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            caster.abilities["Surge of Light"].chance(caster)

            this.area.data.direction = caster.direction
            this.area2.data.direction = caster.direction
            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,true,this.area.radius) //TODO: drawArea:false
            addArea(areas.length,caster,this,this.area2.type,this.area2.duration,this.area2.data,caster.x,caster.y,false,this.area2.radius)

            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
//------------------------------------------------
class Halo extends Ability {
    constructor() {
        super("Halo", 2.7, 1.5, 1.5, 40, false, true, false, "holy", 30, 1)
        this.talent = true
        this.spellPower = 1.03
        this.spellPowerHeal = 1.15

    }

    getTooltip() { //TODO: ring not implemented (2.15sec)
        return "Creates a ring of Holy energy around you that quickly expands to a 30 yd radius, healing allies for "+spellPowerToNumber(this.spellPowerHeal)+" and dealing "+spellPowerToNumber(this.spellPower)+" Holy damage to enemies."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let castTime = this.castTime

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth && this.checkDistance(caster, friendlyTargets[i],undefined,true)) {
                doHeal(caster, friendlyTargets[i], this,undefined,this.spellPowerHeal)
            }
        }
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true)) {
                doDamage(caster, enemies[i], this)
            }
        }

        this.setCd()
        caster.useEnergy(this.cost)
    }
}
//------------------------------------------------------------------------------------------------ROW7
class LightoftheNaaru extends Ability {
    constructor() {
        super("Light of the Naaru", 0, 0, 0, 0, false, false, false, "holy", 40, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "The cooldowns of your Holy Words are reduced by an additional 33% when you cast the relevant spells."
    }

    setTalent(caster) {
        caster.abilities["Holy Words"].serenity *= 1.33
        caster.abilities["Holy Words"].sanctify *= 1.33
        caster.abilities["Holy Words"].sanctify2 *= 1.33
        caster.abilities["Holy Words"].chastise *= 1.33
    }

    unsetTalent(caster) {
        caster.abilities["Holy Words"].serenity /= 1.33
        caster.abilities["Holy Words"].sanctify /= 1.33
        caster.abilities["Holy Words"].sanctify2 /= 1.33
        caster.abilities["Holy Words"].chastise /= 1.33
    }
}
//------------------------------------------------
class Apotheosis extends Ability {
    constructor() {
        super("Apotheosis", 0, 1.5, 0, 120, false, false, false, "holy", 30, 1)
        this.talent = true
        this.duration = 20

    }

    getTooltip() {
        return "Reset the cooldowns of your Holy Words, and enter a pure Holy form for 20 sec, increasing the cooldown reductions to your Holy Words by 300% and reducing their cost by 100%."
    }

    getBuffTooltip(caster, target, buff) {
        return "Effects that reduce Holy Word cooldowns increased by 300%. Cost of Holy Words reduced by 100%."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            caster.abilities["Holy Words"].serenity *= 4
            caster.abilities["Holy Words"].sanctify *= 4
            caster.abilities["Holy Words"].sanctify2 *= 4
            caster.abilities["Holy Words"].chastise *= 4


            caster.abilities["Holy Word: Chastise"].cd = caster.abilities["Holy Word: Chastise"].maxCd
            caster.abilities["Holy Word: Serenity"].cd = caster.abilities["Holy Word: Serenity"].maxCd
            caster.abilities["Holy Word: Sanctify"].cd = caster.abilities["Holy Word: Sanctify"].maxCd

            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            this.setCd()
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Holy Words"].serenity /= 4
        caster.abilities["Holy Words"].sanctify /= 4
        caster.abilities["Holy Words"].sanctify2 /= 4
        caster.abilities["Holy Words"].chastise /= 4
    }

}
//------------------------------------------------
class HolyWordSalvation extends Ability {
    constructor() {
        super("Holy Word: Salvation", 6, 1.5, 2.5, 720, false, true, false, "holy", 30, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 1.1
    }

    getTooltip() {
        return  "Heals all allies within 40 yards for "+spellPowerToNumber(this.spellPower)+", and applies Renew and 2 stacks of Prayer of Mending to each of them.<br>" +
            "<br>" +
            "Cooldown reduced by 30 sec when you cast Holy Word: Serenity or Holy Word: Sanctify."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            let castTime = this.castTime

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        for (let i = 0; i<friendlyTargets.length ;i++) {
            if (!friendlyTargets[i].isDead && this.checkDistance(caster, friendlyTargets[i],undefined,true)) {
                doHeal(caster, friendlyTargets[i], this,undefined,this.spellPowerHeal)
                applyHot(caster,friendlyTargets[i],caster.abilities["Renew"])
                applyBuff(caster,friendlyTargets[i],caster.abilities["Prayer of Mending"],2,true)
            }
        }
        this.setCd()
        caster.useEnergy(this.cost)
    }
}