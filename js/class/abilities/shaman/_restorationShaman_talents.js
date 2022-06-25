let _restorationShaman_talents = function(caster) {
    caster.abilities["Torrent"] = new Torrent()
    caster.abilities["Undulation"] = new Undulation()
    caster.abilities["Unleash Life"] = new UnleashLife()

    caster.abilities["Echo of the Elements"] = new EchooftheElements()
    caster.abilities["Deluge"] = new Deluge()
    caster.abilities["Surge of Earth"] = new SurgeofEarth()

    caster.abilities["Spirit Wolf"] = new SpiritWolf()
    caster.abilities["Earthgrab Totem"] = new EarthgrabTotem()
    caster.abilities["Static Charge"] = new StaticCharge()

    caster.abilities["Ancestral Vigor"] = new AncestralVigor()
    caster.abilities["Earthen Wall Totem"] = new EarthenWallTotem()
    caster.abilities["Ancestral Protection Totem"] = new AncestralProtectionTotem()

    caster.abilities["Nature's Guardian "] = new NaturesGuardianShaman()
    caster.abilities["Graceful Spirit"] = new GracefulSpirit()
    caster.abilities["Wind Rush Totem"] = new WindRushTotem()

    caster.abilities["Flash Flood"] = new FlashFlood()
    caster.abilities["Downpour"] = new Downpour()
    caster.abilities["Cloudburst Totem"] = new CloudburstTotem()

    caster.abilities["High Tide"] = new HighTide()
    caster.abilities["Wellspring"] = new Wellspring()
    caster.abilities["Ascendance"] = new Ascendance()

    caster.talents = [["Torrent","Undulation","Unleash Life"],
        ["Echo of the Elements","Deluge","Surge of Earth"],
        ["Spirit Wolf","Earthgrab Totem","Static Charge"],
        ["Ancestral Vigor","Earthen Wall Totem","Ancestral Protection Totem"],
        ["Nature's Guardian ","Graceful Spirit","Wind Rush Totem"],
        ["Flash Flood","Downpour","Cloudburst Totem"],
        ["High Tide","Wellspring","Ascendance"]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
class Torrent extends Ability {
    constructor() {
        super("Torrent", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Increases the initial heal from Riptide by 20%."
    }

    setTalent(caster) {
        caster.abilities["Riptide"].spellPower *= 1.2
    }

    unsetTalent(caster) {
        caster.abilities["Riptide"].spellPower /= 1.2
    }
}
//------------------------------------------------
class Undulation extends Ability {
    constructor() {
        super("Undulation", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
        this.maxStacks = 3
    }

    getTooltip() {
        return "Every third Healing Wave or Healing Surge heals for an additional 50%."
    }

    checkBuff(caster) {
        let y = false
        let buff = false
        if (this.talentSelect) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Undulation") {
                    buff = true
                    if (caster.buffs[i].stacks>1) {
                        y = true
                        caster.buffs[i].duration = -1
                    } else {
                        caster.buffs[i].stacks++
                    }
                }
            }
            if (!buff) {
                applyBuff(caster,caster,this)
            }
        }
        if (y) {
            return 0.5
        } else {
            return 0
        }
    }
}
//------------------------------------------------
class UnleashLife extends Ability {
    constructor() {
        super("Unleash Life", 0.8, 1.5, 0, 15, false, false, false, "nature", 40, 1)
        this.talent = true
        this.spellPower = 1.9
        this.duration = 10
    }

    getBuffTooltip(caster, target, buff) {
        return "Your next direct heal will be 35% more effective"
    }

    getTooltip() {
        return "Unleashes elemental forces of Life, healing a friendly target for "+spellPowerToNumber(this.spellPower)+" and increasing the effect of the Shaman's next direct heal by 35%."
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

    //HealingWave, HealingSurge, Riptide, ChainHeal
    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            doHeal(caster,caster,this)
        } else {
            doHeal(caster,target,this)
        }
        this.setCd()
        applyBuff(caster,caster,this)
        caster.useEnergy(this.cost)
    }

    checkBuff(caster) {
        let y = false
        if (this.talentSelect) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Unleash Life")  {
                    caster.buffs[i].duration = -1
                    y = true
                }
            }
        }
        if (y) {
            return 0.35
        } else {
            return 0
        }
    }

}
//------------------------------------------------------------------------------------------------ROW2
class EchooftheElements extends Ability {
    constructor() {
        super("Echo of the Elements", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
    }

    getTooltip() {
        return "Riptide, Healing Stream Totem, and Lava Burst now have 2 charges. Effects that reset their remaining cooldown will instead grant 1 charge."
    }

    setTalent(caster) {
        if (caster.spec==="restorationShaman") {
            caster.abilities["Riptide"].charges += 1
            caster.abilities["Riptide"].maxCharges += 1
            caster.abilities["Healing Stream Totem"].charges += 1
            caster.abilities["Healing Stream Totem"].maxCharges += 1
            caster.abilities["Cloudburst Totem"].charges += 1
            caster.abilities["Cloudburst Totem"].maxCharges += 1
        }
        caster.abilities["Lava Burst"].charges += 1
        caster.abilities["Lava Burst"].maxCharges += 1
    }

    unsetTalent(caster) {
        if (caster.spec==="restorationShaman") {
            caster.abilities["Riptide"].charges -= 1
            caster.abilities["Riptide"].maxCharges -= 1
            caster.abilities["Healing Stream Totem"].charges -= 1
            caster.abilities["Healing Stream Totem"].maxCharges -= 1
            caster.abilities["Cloudburst Totem"].charges -= 1
            caster.abilities["Cloudburst Totem"].maxCharges -= 1
        }
        caster.abilities["Lava Burst"].charges -= 1
        caster.abilities["Lava Burst"].maxCharges -= 1
    }
}
//------------------------------------------------
class Deluge extends Ability {
    constructor() {
        super("Deluge", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Healing Wave, Healing Surge, and Chain Heal heal for an additional 20% on targets affected by your Healing Rain or Riptide."
    }

    checkBuff(caster,target) {
        let y = false
        if (this.talentSelect) {
            for (let i = 0; i<target.buffs.length; i++) {
                if ((target.buffs[i].name==="Riptide" || target.buffs[i].name==="Healing Rain") && target.buffs[i].caster === caster)  {
                    y = true
                }
            }
        }
        if (y) {
            return 0.2
        } else {
            return 0
        }
    }
}
//------------------------------------------------
class SurgeofEarth extends Ability {
    constructor() {
        super("Surge of Earth", 2, 1.5, 0, 20, false, false, false, "nature", 40, 1)
        this.talent = true
        this.spellPower = 0.8333
    }

    getTooltip() {
        return "Consume up to 3 charges of Earth Shield to heal up to 3 allies near your Earth Shield target for "+spellPowerToNumber(this.spellPower)+" per charge consumed."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget) && this.talentSelect) {
            let target = caster.castTarget
            if (!this.isEnemy(caster,target) || !target.isDead || target!=="" || Object.keys(target).length !== 0) {
                let charges = 0
                for (let i = 0; i<target.buffs.length; i++) {
                    if ((target.buffs[i].name==="Earth Shield") && target.buffs[i].caster === caster)  {
                        charges = target.buffs[i].stacks
                        if (charges>2) {
                            charges = 3
                            target.buffs[i].stacks -= 3
                        } else {
                            target.buffs[i].duration = -1
                        }
                    }
                }


                doHeal(caster,target,this,undefined,charges*this.spellPower)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost)
                this.setGcd(caster)
                return true
            }
            return false
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW3
class SpiritWolf extends Ability {
    constructor() {
        super("Spirit Wolf", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.timer = 0
        this.timer2 = 1
        this.stacks = 0
        this.effect = [{name:"moveSpeed",val:0.05},{name:"damageReductionStacks",val:0.05}]
        this.duration = 1.2
        this.maxStacks = 4
    }

    getTooltip() {
        return "While transformed into a Ghost Wolf, you gain 5% increased movement speed and 5% damage reduction every 1 sec, stacking up to 4 times."
    }
}
//------------------------------------------------
class EarthgrabTotem extends Ability {
    constructor() {
        let name = "Earthgrab Totem"
        let cost = 0.5
        let gcd = 1
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 35
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.effect = [{name:"root"}]
        this.duration = 8
        this.area = {type:"circle", radius:8, duration:20,data:{type:"applyDebuff",color:"#4eff40",color2:"rgba(103,163,255,0.3)"},cast:false}
        this.petData = {
            name:"Earthgrab Totem",
            abilities:{},
            color:"rgb(23,76,152)",
            size:3,
            do:[]
        }
        this.petDuration = 20
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return  "Summons a totem at the target location for 20 sec. The totem pulses every 2 sec, rooting all enemies within 8 yards for 8 sec. Enemies previously rooted by the totem instead suffer 50% movement speed reduction."
    }

    //TODO:Enemies previously rooted by the totem instead suffer 50% movement speed
    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
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

            spawnPet(caster,"totem",this.petData.name,this.castPosition.x,this.castPosition.y,this)

            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}

//------------------------------------------------
class StaticCharge extends Ability {
    constructor() {
        super("Static Charge", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Capacitor Totem by 5 sec for each enemy it stuns, up to a maximum reduction of 20 sec."
    }
    //TODO: 5sec per target
    setTalent(caster) {
        caster.abilities["Capacitor Totem"].cd -= 20
        caster.abilities["Capacitor Totem"].maxCd -= 20
    }

    unsetTalent(caster) {
        caster.abilities["Capacitor Totem"].cd += 20
        caster.abilities["Capacitor Totem"].maxCd += 20
    }
}
//------------------------------------------------------------------------------------------------ROW4
class AncestralVigor extends Ability {
    constructor() {
        super("Ancestral Vigor", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.effect = [{name:"increaseHealth",val:0.1}]
        this.duration = 10
    }

    getTooltip() {
        return "Targets you heal with Healing Wave, Healing Surge, Chain Heal, or Riptide's initial heal gain 10% increased health for 10 sec."
    }

    applyBuff(caster,target) {
        if (this.talentSelect) {
            applyBuff(caster, target, this)
        }
    }

}
//------------------------------------------------
class EarthenWallTotem extends Ability {
    constructor() {
        let name = "Earthen Wall Totem"
        let cost = 2.2
        let gcd = 1
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 0.35
        this.area = {type:"circle", radius:10, duration:15,data:{type:"applyBuff",timer:1,color:"#794123",color2:"rgba(124,79,49,0.06)"},cast:false}
        this.petData = {
            name:"Earthen Wall Totem",
            abilities:{},
            color:"rgb(135,84,45)",
            size:3,
            do:[]
        }
        this.petDuration = 15
        this.castPosition = {x:0,y:0}
        this.effect = [{name:"redirectDamage",fullDamage:false,returnTo:"ability",spellPower:this.spellPower,healthA:0,healthB:0,used:false}]
        this.health = 0

        this.areaId = 0
        this.destroyed = false
    }

    getTooltip() {
        return  "Summons a totem with "+Math.round(player.maxHealth)+" health for 15 sec. "+spellPowerToNumber(this.spellPower)+" damage from each attack against allies within 10 yards of the totem is redirected to the totem."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
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
            this.destroyed = false
            spawnPet(caster,"totem",this.petData.name,this.castPosition.x,this.castPosition.y,this)
            this.health = caster.maxHealth+1
            this.areaId = addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    destroyArea() {
        if (this.health<=0) {
            areas[this.areaId].time = 99
            return true
        }
        return false
    }

}
//------------------------------------------------
class AncestralProtectionTotem extends Ability {
    constructor() {
        let name = "Ancestral Protection Totem"
        let cost = 2.2
        let gcd = 1
        let castTime = 0
        let cd = 300
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 0.35
        this.duration = 1
        this.area = {type:"circle2", radius:20, duration:30,data:{type:"applyBuff",timer:1,color:"#275e79",color2:"rgba(47,69,124,0.19)"},cast:false}
        this.petData = {
            name: "Ancestral Protection Totem",
            abilities:{},
            color:"rgb(67,231,64)",
            size:3,
            do:[]
        }
        this.petDuration = 30
        this.castPosition = {x:0,y:0}
        this.effect = [{name:"resurrect"},{name:"increaseHealth",val:0.1}]
        this.health = 0

        this.areaId = 0
        this.petId = 0
    }

    getTooltip() {
        return  "Summons a totem at the target location for 30 sec. All allies within 20 yards of the totem gain 10% increased health. If an ally dies, the totem will be consumed to allow them to Reincarnate with 20% health and mana. Cannot reincarnate an ally who dies to massive damage."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
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
            this.petId = spawnPet(caster,"totem",this.petData.name,this.castPosition.x,this.castPosition.y,this)
            this.areaId = addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    destroyArea(caster) {
        areas[this.areaId].time = 999
        caster.pets[this.petId].time = 999
        return true
    }

}
//------------------------------------------------------------------------------------------------ROW5
class NaturesGuardianShaman extends Ability {
    constructor() {
        super("Nature's Guardian ", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.talentSelect = true
        this.permanentBuff = true
        this.duration = 10
        this.hiddenBuff = true
        this.effect = [{name:"healWhenBelow",below:0.35,heal:0.2,time:0,time2:45}]
    }

    getTooltip() {
        return "When your health is brought below 35%, you instantly heal for 20% of your maximum health.  Cannot occur more than once every 45 sec."
    }

    setTalent(caster) {
        applyBuff(caster,caster,this)
    }

    unsetTalent(caster) {
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Nature's Guardian") {
                caster.buffs[i].duration = -1
            }
        }
    }
}
//------------------------------------------------
class GracefulSpirit extends Ability {
    constructor() {
        super("Graceful Spirit", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
    }

    getTooltip() {
        return "Reduces the cooldown of Spiritwalker's Grace by 60 sec and increases your movement speed by 20% while it is active."
    }

    setTalent(caster) {
        caster.abilities["Spiritwalker's Grace"].cd -= 60
        caster.abilities["Spiritwalker's Grace"].maxCd -= 60
        caster.abilities["Spiritwalker's Grace"].effect[1].val = 0.2
    }

    unsetTalent(caster) {
        caster.abilities["Spiritwalker's Grace"].cd += 60
        caster.abilities["Spiritwalker's Grace"].maxCd += 60
        caster.abilities["Spiritwalker's Grace"].effect[1].val = 0
    }
}
//------------------------------------------------
class WindRushTotem extends Ability {
    constructor() {
        let name = "Wind Rush Totem"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.area = {type:"circle", radius:10, duration:10,data:{type:"applyBuff",timer:0.5,color:"#794123",color2:"rgba(112,124,116,0.06)"},cast:false}
        this.petData = {
            name:"Earthen Wall Totem",
            abilities:{},
            color:"rgb(135,84,45)",
            size:3,
            do:[]
        }
        this.petDuration = 10
        this.castPosition = {x:0,y:0}
        this.effect = [{name:"moveSpeed",val:0.6}]
        this.duration = 0.6
        this.health = 0

    }

    getTooltip() {
        return "Summons a totem at the target location for 15 sec, continually granting all allies who pass within 10 yards 60% increased movement speed for 5 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
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
            spawnPet(caster,"totem",this.petData.name,this.castPosition.x,this.castPosition.y,this)
            addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,this.castPosition.x,this.castPosition.y,true,this.area.radius)

            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}
//------------------------------------------------------------------------------------------------ROW6
class FlashFlood extends Ability {
    constructor() {
        super("Flash Flood", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.talent = true
        this.duration = 15
        this.reduceCastTime = 0.2
    }

    applyBuff(caster) {
        if (this.talentSelect) {
            applyBuff(caster,caster,this)
        }
    }

    checkBuff(caster) {
        if (this.talentSelect) {
            for (let i = 0; i<caster.buffs.length;i++) {
                if (caster.buffs[i].name==="Flash Flood") {
                    caster.buffs[i].duration = -1
                    return true
                }
            }
        }
        return false
    }

    getTooltip() {
        return "When you consume Tidal Waves, the cast time of your next heal is reduced by 20%."
    }

}
//------------------------------------------------
class Downpour extends Ability {
    constructor() {
        let name = "Downpour"
        let cost = 3
        let gcd = 1.5
        let castTime = 1.5
        let cd = 5
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.talent = true
        this.spellPower = 1.75
        this.maxtargets = 5
        this.healRange = 12
    }

    getTooltip() {
        return "A burst of water at the target location heals up to six injured allies within 12 yards for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+". Cooldown increased by 5 sec for each target effectively healed."
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let castTime = this.castTime
            if (caster.abilities["Flash Flood"].checkBuff(caster)) {
                castTime = castTime * (1-caster.abilities["Flash Flood"].reduceCastTime)
            }

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
        let target = caster.casting.target
        this.setCd()

        if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
            //heal self
            doHeal(caster,caster,this,)
            target = caster
        } else {
            //heal target
            doHeal(caster,target,this)
        }

        let ttt = 0
        let lastTarget = target
        let targets = sortFriendlyTargetsByHealth(true)
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(lastTarget, targets[i],this.healRange,true)) {
                lastTarget = targets[i]
                doHeal(caster, targets[i], this)
                ttt++
                if (ttt>=this.maxtargets) {
                    break
                }
            }
        }
        this.maxCd = 5+(ttt*5)
        caster.useEnergy(this.cost)
    }
}
//------------------------------------------------
class CloudburstTotem extends Ability {
    constructor() {
        let name = "Cloudburst Totem"
        let cost = 0
        let gcd = 1
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
        this.petData = {
            name:"Cloudburst Totem",
            abilities:{},
            color:"rgb(135,84,45)",
            size:4,
            do:[]
        }
        this.petDuration = 15
        this.petId = 0
        this.healing = 0
        this.ct = false
        this.timer1 = 0
        this.timer2 = 15
    }

    getTooltip() {
        return "Summons a totem at your feet for 15 sec that collects power from all of your healing spells. When the totem expires or dies, the stored power is released, healing all injured allies within 40 yards for 30% of all healing done while it was active, divided evenly among targets. Casting this spell a second time recalls the totem and releases the healing."
    }

    run(caster) {
        if (this.ct) {
            if (this.timer1>this.timer2) {
                this.releaseHealing(caster)
            } else {
                this.timer1 += progressInSec
            }

        }
    }


    setTalent(caster) {
        caster.abilities["Healing Stream Totem"].canUse = false
    }

    unsetTalent(caster) {
        caster.abilities["Healing Stream Totem"].canUse = true
    }

    startCast(caster) {
        if (this.ct && this.abilityCd>=this.abilityMaxCd && this.checkGcd(caster)) {
           this.releaseHealing(caster)
        } else {
            if (this.checkStart(caster) && this.talentSelect) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.petId = spawnPet(caster, "totem", this.petData.name, caster.x, caster.y, this)
                this.ct = true

                this.setCd()
                caster.useEnergy(this.cost)
                this.setGcd(caster)
                return true
            } else if (this.canSpellQueue(caster)) {
                spellQueue.add(this, caster.gcd)
            }
        }
        return false
    }

    releaseHealing(caster) {
        let targets = sortFriendlyTargetsByHealth(true)

        for (let i = 0; i<targets.length; i++) {
            if (targets[i].health>=targets[i].maxHealth) {
                targets.splice(i,1)
                i--
            }
        }

        let healing = this.healing/targets.length

        for (let i = 0; i<targets.length; i++) {
            if (this.checkDistance(caster,targets[i],undefined,true)) {
                doHeal(caster,targets[i],this,undefined,undefined,false,undefined,undefined,healing)
            }
        }
        if (caster.pets[this.petId]!==undefined) {
            caster.pets[this.petId].time = 99
        }
        this.timer1 = 0
        this.ct = false
        this.abilityCd = 0
    }

    addHealing(val,ability) {
        if (this.talentSelect && this.ct && ability.name!=="Healing Tide Totem") {
            this.healing += val*0.3
        }
    }
}
//------------------------------------------------------------------------------------------------ROW7
class HighTide extends Ability {
    constructor() {
        super("High Tide", 0, 0, 0, 0, false, false, false, "nature", 5, 1)
        this.passive = true
        this.talent = true
        this.manaSpent = 0
        this.maxManaSpent = 40 //%
        this.duration = 25
        this.maxStacks = 2
    }

    getTooltip() {
        return "Every 40% mana you spend brings a High Tide, making your next 2 Chain Heals heal for an additional 10% and not reduce with each jump."
    }

    spendMana(caster,val) {
        if (this.talentSelect) {
            this.manaSpent += val
            if (this.manaSpent>=this.maxManaSpent) {
                applyBuff(caster,caster,this,2,true)
                this.manaSpent=0
            }
        }
    }

}
//------------------------------------------------
class Wellspring extends Ability {
    constructor() {
        super("Wellspring", 4, 1.5, 1.5, 20, false, true, false, "nature", 30, 1)
        this.talent = true
        this.spellPower = 1.9
        this.maxtargets = 6
    }
    getTooltip() {
        return "Creates a surge of water that flows forward, healing friendly targets in a wide arc in front of you for "+spellPowerToNumber(this.spellPower)+"."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let castTime = this.castTime
            if (caster.abilities["Flash Flood"].checkBuff(caster)) {
                castTime = castTime * (1-caster.abilities["Flash Flood"].reduceCastTime)
            }

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
        let target = caster.casting.target

        let dir = caster.direction
        let ttt = 0
        let lastTarget = target
        let targets = sortFriendlyTargetsByHealth(true)
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(lastTarget, targets[i],this.healRange,true)) {
                let dirToTarget = getDirection(caster,targets[i])
                if (dir+90>dirToTarget && dir-90<dirToTarget) {
                    lastTarget = targets[i]
                    doHeal(caster, targets[i], this)
                    ttt++
                    if (ttt>=this.maxtargets) {
                        break
                    }
                }

            }
        }

        this.setCd()
        caster.useEnergy(this.cost)
    }

}
//------------------------------------------------
class Ascendance extends Ability {
    constructor() {
        super("Ascendance", 0, 1.5, 0, 180, false, false, false, "nature", 20, 1)
        this.talent = true
        this.talentSelect = true
        this.spellPower = 8.76
        this.duration = 15
    }
    getTooltip() {
        return "Transform into a Water Ascendant, duplicating all healing you deal for 15 sec and immediately healing for "+spellPowerToNumber(this.spellPower)+". Ascendant healing is distributed evenly among allies within 20 yds. "
    }
    getBuffTooltip(caster, target, buff) {
        return "Transformed into a powerful Water Ascendant. Healing you deal is duplicated and distributed evenly among nearby allies."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.talentSelect) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            let targets = []
            for (let i = 0; i<friendlyTargets.length; i++) {
                if (this.checkDistance(caster,friendlyTargets[i],undefined,true) && !friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                    targets.push(friendlyTargets[i])
                }
            }

            targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets

            let healing = this.spellPower/targets.length

            for (let i = 0; i<targets.length; i++) {
                doHeal(caster,targets[i],this,undefined,healing,undefined,undefined,"Restorative Mists")
            }

            applyBuff(caster,caster,this)
            this.setCd()
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    heal(caster,val) {
        if (this.talentSelect) {
            if (checkBuff(caster,caster,"Ascendance")) {
                let targets = []
                for (let i = 0; i<friendlyTargets.length; i++) {
                    if (this.checkDistance(caster,friendlyTargets[i],undefined,true) && !friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                        targets.push(friendlyTargets[i])
                    }
                }

                targets = targets.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets

                let healing = val/targets.length

                for (let i = 0; i<targets.length; i++) {
                    doHeal(caster,targets[i],this,undefined,undefined,undefined,undefined,"Restorative Mists",healing)
                }
            }
        }
    }

}