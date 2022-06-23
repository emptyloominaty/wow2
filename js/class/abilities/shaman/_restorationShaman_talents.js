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

    caster.talents = [["Torrent","Undulation","Unleash Life"],
        ["Echo of the Elements","Deluge","Surge of Earth"],
        ["Spirit Wolf","Earthgrab Totem","Static Charge"],
        ["Ancestral Vigor","Earthen Wall Totem","Ancestral Protection Totem"],
        ["Nature's Guardian","Graceful Spirit","Wind Rush Totem"],
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
        this.talentSelect = true
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
        this.talentSelect = true
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

    //TODO:CLOUDBURST TOTEM
    setTalent(caster) {
        caster.abilities["Riptide"].charges += 1
        caster.abilities["Riptide"].maxCharges += 1
        caster.abilities["Healing Stream Totem"].charges += 1
        caster.abilities["Healing Stream Totem"].maxCharges += 1
        caster.abilities["Lava Burst"].charges += 1
        caster.abilities["Lava Burst"].maxCharges += 1
    }

    unsetTalent(caster) {
        caster.abilities["Riptide"].charges -= 1
        caster.abilities["Riptide"].maxCharges -= 1
        caster.abilities["Healing Stream Totem"].charges -= 1
        caster.abilities["Healing Stream Totem"].maxCharges -= 1
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
        this.talentSelect = true
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
        this.talentSelect = true
        this.spellPower = 0.8333
    }

    getTooltip() {
        return "Consume up to 3 charges of Earth Shield to heal up to 3 allies near your Earth Shield target for "+spellPowerToNumber(this.spellPower)+" per charge consumed."
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
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
        if (this.checkStart(caster)) {
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
        this.talentSelect = true
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
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW5
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW6
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW7

















/*
let _restorationShaman_talents = function(caster) {
    caster.abilities[""] = new ()


    caster.talents = [["","",""],
        ["","",""],
        ["","",""],
        ["","",""],
        ["","",""],
        ["","",""],
        ["","",""]
    ]
}

//------------------------------------------------------------------------------------------------ROW1
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------------------------------------------------------ROW2
//------------------------------------------------
//------------------------------------------------
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

 */