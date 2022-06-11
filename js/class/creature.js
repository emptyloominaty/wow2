creatures = []

class Creature {
    id = 0
    name = ""
    health = 0
    maxHealth = 0
    resourceName = "Mana"
    energy = 0 //mana
    maxEnergy = 0
    secondaryResource = 0
    maxSecondaryResource = 0
    secondaryResourceName = "Combo"
    energyRegen = 0.8 // 1sec

    //        plate-mail-leather-cloth
    //armor:  108 -  72 -  49  -  28
    //        1  - 0.66 - 0.45 - 0.25
    stats = {primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, speed:0, stamina:100}
    statsBup = {primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, speed:0, stamina:100}

    moveSpeed = 1
    x = 0
    y = 0
    direction = 0
    enemy = false
    mousePos = {x:0,y:0}

    //-------
    isStunned = false
    isStunnable = true
    isRooted = false
    isMoving = false
    isCasting = false
    isChanneling = false
    canMoveWhileCasting = false
    channeling = {name:"", time:0, time2:0}
    isRolling = false
    casting = {name:"", time:0, time2:0}
    isDead = false
    playerCharacter = false
    gcd = 0
    form = ""
    formEffects = []
    spellHistory = []

    buffs = []
    debuffs = []

    healingIncrease = 1
    moveSpeedIncrease = 1

    target = ""
    targetObj = {}
    castTarget = {}
    tabIdx = 0

    healingDone = 0
    damageDone = 0
    aggroMultiplier = 1

    damageReduction = 0
    healthIncreased = 0
    magicDamageReduction = 0
    reduceEnergyCost = 1

    constructor(name,enemy,health,energy,x,y,direction,spec) {
        this.id = creatures.length
        creatures.push(this)
        this.enemy = enemy
        this.name = name
        this.health = health
        this.maxHealth = health
        this.baseHealth = health
        this.energy = energy
        this.maxEnergy = energy
        this.direction = direction
        this.x = x
        this.y = y

        if (!enemy) {
            this.floatingTexts = new FloatingText2(x,y,"","heal","creature"+this.id)
            this.id2 = friendlyTargets.length
            friendlyTargets.push(this)
        } else {
            this.floatingTexts = new FloatingText2(x,y,"","damage","creature"+this.id)
            this.id2 = enemyTargets.length
            enemyTargets.push(this)
        }

        if (!this.playerCharacter) {
            this.ai = new Ai(this)
        }

        this.abilities = {}
        this.class = ""
        this.spec = spec
        this.melee = false
        this.role = ""
        if (spec==="mistweaver") { //----------------------------------------Mistweaver
            this.class = "Monk"
            this.abilities = new Mw_Abilities()
            this.melee = true
            this.role = "healer"
        } else if (spec==="windwalker") {//----------------------------------------Windwalker
            this.class = "Monk"
            this.abilities = new Ww_abilities()
            this.melee = true
            this.role = "dps"
            this.energyRegen = 10
            this.resourceName = "Energy"
            this.secondaryResourceName = "Chi"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
        } else if (spec==="brewmaster") {//----------------------------------------Brewmaster
            this.class = "Monk"
            this.abilities = new Bm_abilities()
            this.melee = true
            this.role = "tank"
            this.stats.armor = 95 //TEST
            this.statsBup.armor = 95 //TEST
            this.energyRegen = 10
            this.resourceName = "Energy"
        } else if (spec==="restorationShaman") {//----------------------------------------Resto Sham
            this.class = "Shaman"
            this.abilities = new RestoSham_abilities()
            this.melee = false
            this.role = "healer"
        } else if (spec==="holyPriest") {//----------------------------------------Holy Priest
            this.class = "Priest"
            this.abilities = new HolyPriest_abilities()
            this.melee = false
            this.role = "healer"
        } else if (spec==="elemental") {//----------------------------------------Elemental
            this.class = "Shaman"
            this.melee = false
            this.role = "dps"
        } else if (spec==="assassination") { //----------------------------------------Assa
            this.class = "Rogue"
            this.abilities = new assassination_abilities()
            this.melee = true
            this.role = "dps"
            this.energyRegen = 10
            this.resourceName = "Energy"
            this.secondaryResourceName = "Combo Points"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
        } else if (spec==="restorationDruid") { //----------------------------------------Resto Druid
            this.class = "Druid"
            this.abilities = new restoDruid_abilities()
            this.melee = false
            this.role = "healer"
        } else if (spec==="balance") {//----------------------------------------Balance
            this.class = "Druid"
            this.abilities = new balanceDruid_abilities()
            this.melee = false
            this.resourceName = "Astral Power"
            this.role = "dps"
        } else if (spec==="arcane") {//----------------------------------------Arcane
            this.class = "Mage"
            this.abilities = new Arcane_abilities()
            this.melee = false
            this.role = "dps"

            this.energyRegen = 0.8 * (1 + (this.stats.mastery / 100))
            this.energy = 100 * (1 + (this.stats.mastery / 100))
            this.maxEnergy = 100 * (1 + (this.stats.mastery / 100))

            this.secondaryResourceName = "Arcane Charges"
            this.secondaryResource = 0
            this.maxSecondaryResource = 4
        } else if (spec==="havoc") {//----------------------------------------Havoc
            this.class = "Demon Hunter"
            this.melee = true
            this.abilities = new Havoc_Abilities()
            this.resourceName = "Fury"
            this.role = "dps"
        } else if (spec==="fury") {//----------------------------------------Fury
            this.class = "Warrior"
            this.melee = true
            this.abilities = new Fury_Abilities()
            this.resourceName = "Rage"
            this.energy = 0
            this.role = "dps"
        }  else if (spec==="bossTest") {//----------------------------------------Boss Test
            this.class = "Boss"
            this.abilities = new BossTestAbilities()
            this.isStunnable = false
            this.melee = true
        } else if (spec==="addTest") {//----------------------------------------Add Test
            this.class = "Add"
            this.abilities = new BossTestAbilities()
            this.melee = true
        }


        this.abilities["Auto Attack"] = new AutoAttack()
        this.abilities["Leech"] = new Leech()

        if (this.role==="tank") {
            this.aggroMultiplier = 10
        }

        if (this.enemy) {
            this.stats.armor = 0
        }
    }

    run() {
        this.floatingTexts.run()

        if (this.resourceName==="Energy" || this.resourceName==="Focus") {
            this.energy += (this.energyRegen*(1+(this.stats.haste/100)))/fps
        } else if (this.resourceName==="Mana") {
            this.energy += this.energyRegen/fps
        } //TODO:RUNES

        if (this.energy>this.maxEnergy) {
            this.energy = this.maxEnergy
        }

        if (this.gcd>0) {
            this.gcd -= progressInSec
        }

        //abilities cds
        Object.keys(this.abilities).forEach((key)=> {
            this.abilities[key].run(this)
            this.abilities[key].incCd(this)
        })

        if (this.isStunned) {
            this.casting = {name:"", time:0, time2:0}
            this.isCasting = false
            this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            this.isChanneling = false
            this.gcd = 0
        }

        //casting ability
        if (this.isCasting) {
            if (this.casting.time<this.casting.time2) {
                this.casting.time += progressInSec
            } else {
                this.abilities[this.casting.name].endCast(this)
                this.casting = {name:"", time:0, time2:0}
                this.isCasting = false
            }
        }
        //channeling ability
        if (this.isChanneling) {
            if (this.channeling.time<this.channeling.time2) {
                this.channeling.time += progressInSec
                this.channeling.timer += progressInSec
                if (this.channeling.timer>=this.channeling.timer2) {
                    this.channeling.timer = 0
                    this.abilities[this.channeling.name].cast(this)
                }
            } else {
                if (this.abilities[this.channeling.name].endChanneling) {
                    this.abilities[this.channeling.name].endChanneling(this)
                }
                this.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
                this.isChanneling = false
            }
        }

        //autoattack
        if (this.melee || this.class === "Hunter" && !this.isStunned) {
            this.abilities["Auto Attack"].startCast(this)
        }

        //aggro
        if (this.enemy) {
            this.aggroRun()
        }


        //---------------------------------------------------
        this.healingIncrease = 1
        this.moveSpeedIncrease = 1
        this.attackSpeed = 1
        this.reduceEnergyCost = 1
        this.damageReduction = 0
        this.stats = JSON.parse(JSON.stringify(this.statsBup))
        this.isStunned = false
        this.isRooted = false

        //forms
        for (let i = 0; i<this.formEffects.length; i++) {
            if (this.formEffects[i].name==="moveSpeed") {
                this.moveSpeedIncrease += this.formEffects[i].val
            }
        }

        //buffs
        for (let i = 0; i<this.buffs.length; i++) {
            if (this.buffs[i].type==="hot") {
                if (this.buffs[i].timer<1) {
                    this.buffs[i].timer+= (progressInSec)*(1 + (this.buffs[i].caster.stats.haste / 100))
                } else {
                    doHeal(this.buffs[i].caster,this,this.buffs[i],undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
                    this.buffs[i].timer = 0
                }
            } else if (this.buffs[i].type==="buff") {

            } else if (this.buffs[i].type==="form") {

            }

            if (Array.isArray(this.buffs[i].effect)) {
                //NEW
                for (let j = 0; j<this.buffs[i].effect.length; j++) {
                    if (this.buffs[i].effect[j].name === "move") {
                        this.move((this.buffs[i].effect[j].val*40)/fps)
                    } else if (this.buffs[i].effect[j].name === "healingIncrease") {
                        this.healingIncrease += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "moveSpeed") {
                        this.moveSpeedIncrease += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "incAttackSpeed") {
                        this.attackSpeed *= (1+this.buffs[i].effect[j].val)
                    } else if (this.buffs[i].effect[j].name === "reduceEnergyCost") {
                        this.reduceEnergyCost -= (this.buffs[i].effect[j].val)
                    } else if (this.buffs[i].effect[j].name === "damageReduction") {
                        this.damageReduction += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "increaseStat") {
                        this.stats[this.buffs[i].effect[j].stat] += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "moveToTarget") {
                        if (this.buffs[i].effect[j]._end===undefined) {
                            this.direction = getDirection(this,this.buffs[i].effect[j].target)
                            this.move((this.buffs[i].effect[j].val*40)/fps)
                            if (getDistance(this,this.buffs[i].effect[j].target)<3) {
                                this.buffs[i].effect[j]._end = true
                            }
                        }
                    } else if (this.buffs[i].effect[j].name === "stun") {
                        if (this.isStunnable) {
                            this.isStunned = true
                        }
                    } else if (this.buffs[i].effect[j].name === "root") {
                        this.isRooted = true
                    } else if (this.buffs[i].effect[j].name === "prayerofMending") {
                        let buffPoM = this.buffs[i].effect[j]
                        let buff = this.buffs[i]
                        buffPoM.healthA = this.health
                        if (buffPoM.healthA<buffPoM.healthB && buff.duration+1<buffPoM.lastTime ) {
                            doHeal(buff.caster,this,buff.caster.abilities["Prayer of Mending"])
                            buffPoM.lastTime = buff.duration
                            buffPoM.val--
                            if (buffPoM.val>0) {
                                let target = getRandomFriendlyTargetNear(this,20,"Prayer of Mending",buff.caster)
                                if (target!==false) {
                                    applyBuff(buff.caster,target,buff.caster.abilities["Prayer of Mending"],buffPoM.vals,true,undefined,(buff.duration+0.1))
                                }
                            }
                            buff.duration = -1
                        }
                        buffPoM.healthB = this.health
                    }
                }
            } else {
                //OLD
                if (this.buffs[i].effect==="move") {
                    this.move((this.buffs[i].effectValue*40)/fps)
                } else if (this.buffs[i].effect==="healingIncrease") {
                    this.healingIncrease += this.buffs[i].effectValue
                } else if (this.buffs[i].effect === "moveSpeed") {
                    this.moveSpeedIncrease += this.buffs[i].effectValue
                } else if (this.buffs[i].effect === "incAttackSpeed") {
                    this.attackSpeed *= (1+this.buffs[i].effectValue)
                } else if (this.buffs[i].effect === "reduceEnergyCost") {
                    this.reduceEnergyCost -= this.buffs[i].effectValue
                }
            }

            this.buffs[i].duration -= progressInSec
            if (this.buffs[i].duration<0 || this.buffs[i].stacks<=0) {
                this.buffs[i].ability.endBuff(this)
                this.buffs.splice(i,1)
                i--
            } else {
                this.buffs[i].ability.runBuff(this,this.buffs[i],i)
            }


        }
        //debuffs
        for (let i = 0; i<this.debuffs.length; i++) {
            if (this.debuffs[i].type==="dot") {
                if (this.debuffs[i].timer<1) {
                    this.debuffs[i].timer+= (progressInSec)*(1 + (this.debuffs[i].caster.stats.haste / 100))
                } else {
                    this.debuffs[i].timer = 0
                    doDamage(this.debuffs[i].caster,this,this.debuffs[i].ability,undefined,this.debuffs[i].spellPower,undefined,undefined,true)
                    if (this.isDead) {
                        break
                    }
                }
            }
            if (Array.isArray(this.debuffs[i].effect)) {
                for (let j = 0; j < this.debuffs[i].effect.length; j++) {
                    if (this.debuffs[i].effect[j].name === "stun") {
                        if (this.isStunnable) {
                            this.isStunned = true
                        }
                    } else if (this.debuffs[i].effect[j].name === "root") {
                        this.isRooted = true
                    }
                }
            }


            this.debuffs[i].duration -= progressInSec
            if (this.debuffs[i].duration<0) {
                this.debuffs[i].ability.endBuff(this)
                this.debuffs.splice(i,1)
                i--
            } else {
                this.debuffs[i].ability.runBuff(this,this.debuffs[i],i)
            }
        }

        if (!this.playerCharacter) {
            this.ai.run()
        }

        //death
        if (this.health<0) {
            this.die()
        }
    }

    die() {
        this.floatingTexts.removeAll()
        this.health = 0
        this.isDead = true
        this.debuffs = []
        this.buffs = []
    }

    setMousePos(x,y) {
        this.mousePos.x = x
        this.mousePos.y = y
    }

    useSec(val) {
        if (val==="all") {
            this.secondaryResource = 0
        } else {
            this.secondaryResource -= val
            if (this.secondaryResource>this.maxSecondaryResource) {
                this.secondaryResource = this.maxSecondaryResource
            }
        }

    }

    useEnergy(val,val2 = 0) {
        if (this.reduceEnergyCost<0) {this.reduceEnergyCost=0}
        this.energy -= val * this.reduceEnergyCost
        if (val2!==0 && this.maxSecondaryResource>0) {
            this.useSec(val2)
        }
        if (this.spec==="arcane") {
            this.abilities["Clearcasting"].spendMana(this,val)
        }
    }

    move(val,strafe = 0, forceVal = 0) { //val -0.5 - 1
        let speed = val * this.moveSpeed * this.moveSpeedIncrease
        if (forceVal!==0) {
            speed = forceVal
        }
        let angleInRadian = 0
        if (strafe===0) {
            angleInRadian = (this.direction-180) / 180 * Math.PI
        } else if (strafe===1) {
            angleInRadian = (this.direction-90) / 180 * Math.PI
        } else if (strafe===2) {
            angleInRadian = (this.direction-270) / 180 * Math.PI
        }

        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        if (this.isCasting && this.abilities[this.casting.name].castTime>0 && !this.canMoveWhileCasting) {
            this.isCasting = false
            this.gcd = 0
            this.casting = {name:"", time:0, time2:0}
        }
        if (this.isChanneling && !this.canMoveWhileCasting) {
            this.isChanneling = false
            this.channeling = {name:"", time:0, time2:0}
        }
        if (!this.isStunned && !this.isRooted) {
            this.x += vx
            this.y += vy
        }

/*TODO:
        //----------------------------------------------X
        if (this.x+vx > mapWidth) {
            this.x = (this.x+vx - mapWidth)
        } else if (this.x+vx < 0) {
            this.x = (mapWidth + this.x+vx)
        } else {
            this.x +=  vx
        }
        //----------------------------------------------Y
        if (this.y+vy > mapHeight) {
            this.y = (this.y+vy - mapHeight)
        } else if (this.y+vy < 0) {
            this.y = (mapHeight + this.y+vy)
        } else {
            this.y +=  vy
        }
*/
    }

    rotate(dir) { //0-360
        if (!this.isStunned && !this.isRooted && !this.isRolling) {
            this.direction = dir
            this.direction = this.direction % 360
            if (this.direction < 0) {
                this.direction += 360
            }
        }
    }

    talents = {
        //Mistweaver
        MistWrap:false,
        ChiWave:false,
        ChiBurst:false,
        Celerity:false,
        ChiTorpedo:false,
        TigersLust:false,
        Lifecycles:false,
        SpiritoftheCrane:false,
        ManaTea:false,
        TigerTailSweep:false,
        SongofChiji:false,
        RingofPeace:false,
        HealingElixir:false,
        DiffuseMagic:false,
        DampenHarm:false,
        SummonJadeSerpentStatue:false,
        RefreshingJadeWind:false,
        InvokeChijitheRedCrane:false,
        FocusedThunder:false,
        Upwelling:false,
        RisingMist:true,
        //
    }

}

let friendlyTargets = []
let enemyTargets = []
let enemies = []