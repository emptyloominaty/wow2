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
    creatureType = "Humanoid" //Aberration, Beast, Demon, Dragonkin, Elemental, Giant, Humanoid, Mechanical, Undead

    //        plate-mail-leather-cloth
    //armor:  108 -  72 -  49  -  28
    //        1  - 0.66 - 0.45 - 0.25
    stats = {primary:2000, haste:25, crit:15, vers:0, mastery:34, leech:1, avoidance:0, dodge:0, armor:10, block:0, speed:0, stamina:2500}

    itemLevel = 270

    autoattackSpeed = 2.6
    autoattackDamage = 0.23

    moveSpeed = 1
    x = 0
    y = 0
    size = 8
    screenPosition = {x:0,y:0}
    direction = 0
    enemy = false
    mousePos = {x:0,y:0}

    //-------
    inCombat = false
    isStunned = false
    isStunnable = true
    isStealthed = false
    isIncapacitated = false
    isSnared = false
    isRooted = false
    isInterrupted = false
    isCasting = false
    isCasting2 = false
    isChanneling = false
    isMoving = false
    canMoveWhileCasting = false
    channeling = {name:"", time:0, time2:0}
    isRolling = false
    casting = {name:"", time:0, time2:0}
    casting2 = {name:"", time:0, time2:0}
    isDead = false
    playerCharacter = false
    gcd = 0
    form = ""
    formEffects = []
    spellHistory = []
    talents = []

    pets = []

    buffs = []
    debuffs = []

    absorb = 0
    magicabsorb = 0
    increaseHealth = 1
    healingIncrease = 1
    damageIncrease = 1
    moveSpeedIncrease = 1

    target = ""
    targetObj = {}
    castTarget = {}
    tabIdx = 0

    healingDone = 0
    damageDone = 0
    damageTaken = 0
    aggroMultiplier = 1

    damageReduction = 0
    magicDamageReduction = 0
    physicalDamageReduction = 0
    reduceEnergyCost = 1

    //
    battleShout = false
    isReflectingSpell = false
    immuneToMagic = false
    cantDie = false
    //

    magicDamageTaken = 1
    physicalDamageTaken = 1
    canRess = false
    canRessBuffId = 0



    healthA = 0
    healthB = 0

    abilitiesCasted = []

    id3 = 99
    constructor(name,enemy,health,energy,x,y,direction,spec,stats) {
        this.stats = stats

        this.id = creatures.length
        creatures.push(this)
        this.enemy = enemy
        this.name = name
        this.health = health
        this.maxHealth = health
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
            _mistweaver_talents(this)

            this.melee = true
            this.role = "healer"
        } else if (spec==="windwalker") {//----------------------------------------Windwalker
            this.class = "Monk"
            this.abilities = new Ww_abilities()
            _windwalker_talents(this)
            this.melee = true
            this.role = "dps"

            this.stats.crit += 5

            this.energyRegen = 10
            this.resourceName = "Energy"
            this.secondaryResourceName = "Chi"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
        } else if (spec==="brewmaster") {//----------------------------------------Brewmaster
            this.class = "Monk"
            this.abilities = new Bm_abilities()
            _brewmaster_talents(this)
            this.melee = true
            this.role = "tank"

            this.abilities["Brewmaster's Balance"].apply(this)
            this.stats.crit += 5

            this.energyRegen = 10
            this.resourceName = "Energy"
            this.secondaryResourceName = "Stagger"
            this.secondaryResource = 0
            this.maxSecondaryResource = this.maxHealth*10
        } else if (spec==="restorationShaman") {//----------------------------------------Resto Sham
            this.class = "Shaman"
            this.abilities = new RestoSham_abilities()
            _restorationShaman_talents(this)
            this.melee = false
            this.role = "healer"
        } else if (spec==="holyPriest") {//----------------------------------------Holy Priest
            this.class = "Priest"
            this.abilities = new HolyPriest_abilities()
            _holyPriest_talents(this)
            this.melee = false
            this.role = "healer"
        } else if (spec==="discipline") {//----------------------------------------Disc Priest
            this.class = "Priest"
            this.abilities = new Discipline_Abilities()
            _discipline_talents(this)
            this.melee = false
            this.role = "healer"
        } else if (spec==="shadow") {//----------------------------------------Shadow Priest
            this.class = "Priest"
            this.abilities = new Shadow_Abilities()
            _shadow_talents(this)
            applyBuff(this,this,this.abilities["Shadowform"])
            this.resourceName = "Insanity"
            this.energy = 0
            this.melee = false
            this.role = "dps"
        } else if (spec==="holyPaladin") {//----------------------------------------Holy Paladin
            this.class = "Paladin"
            this.abilities = new HolyPaladin_Abilities()
            _holyPaladin_talents(this)
            applyBuff(this,this,this.abilities["Devotion Aura"])
            this.secondaryResourceName = "Holy Power"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
            this.melee = true
            this.role = "healer"
        } else if (spec==="protectionPaladin") {//----------------------------------------Prot Paladin
            this.class = "Paladin"
            this.abilities = new ProtectionPaladin_Abilities()
            _protectionPaladin_talents(this)
            applyBuff(this,this,this.abilities["Aegis of Light"])
            applyBuff(this,this,this.abilities["Divine Bulwark"])
            //applyBuff(this,this,this.abilities["Devotion Aura"])
            this.secondaryResourceName = "Holy Power"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
            this.energy = 10
            this.maxEnergy = 10
            this.melee = true
            this.role = "tank"
        } else if (spec==="retribution") {//----------------------------------------Retribution Paladin
            this.class = "Paladin"
            this.abilities = new Retribution_Abilities()
            _retribution_talents(this)

            this.secondaryResourceName = "Holy Power"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
            this.energy = 10
            this.maxEnergy = 10
            this.melee = true
            this.role = "dps"
        } else if (spec==="blood") {//----------------------------------------Blood DK
            this.class = "Death Knight"
            this.abilities = new Blood_Abilities()
            _blood_talents(this)
            applyBuff(this,this,this.abilities["Veteran of the Third War"])

            this.secondaryResourceName = "Runes"
            this.secondaryResource = 6
            this.maxSecondaryResource = 6
            this.resourceName = "Runic Power"
            this.maxEnergy = 125
            this.energy = 0
            this.melee = true
            this.role = "tank"
        } else if (spec==="frostDk") {//----------------------------------------Frost DK
            this.class = "Death Knight"
            this.abilities = new frostDk_Abilities()
            _frostDk_talents(this)
            applyBuff(this,this,this.abilities["Veteran of the Third War"])

            this.secondaryResourceName = "Runes"
            this.secondaryResource = 6
            this.maxSecondaryResource = 6
            this.resourceName = "Runic Power"
            this.maxEnergy = 120
            this.energy = 0
            this.melee = true
            this.role = "dps"
        } else if (spec==="unholy") {//----------------------------------------Unholy DK
            this.class = "Death Knight"
            this.abilities = new Unholy_Abilities()
            _unholy_talents(this)
            applyBuff(this,this,this.abilities["Veteran of the Third War"])
            setTimeout(()=>{this.abilities["Raise Dead"].startCast(this)},settings.start1)
            this.secondaryResourceName = "Runes"
            this.secondaryResource = 6
            this.maxSecondaryResource = 6
            this.resourceName = "Runic Power"
            this.maxEnergy = 100
            this.energy = 0
            this.melee = true
            this.role = "dps"
        }  else if (spec==="elemental") {//----------------------------------------Elemental //enhancement
            this.class = "Shaman"
            this.abilities = new Elemental_Abilities()
            _elemental_talents(this)
            this.melee = false
            this.role = "dps"
            this.energy = 0
            this.resourceName = "Maelstrom"
        } else if (spec==="enhancement") {//----------------------------------------Enhancement
            this.class = "Shaman"
            this.abilities = new Enhancement_Abilities()
            _enhancement_talents(this)
            applyBuff(this,this,this.abilities["Flametongue Weapon"])
            applyBuff(this,this,this.abilities["Windfury Weapon"])

            this.melee = true
            this.role = "dps"
            this.resourceName = "Mana"
        } else if (spec==="assassination") { //----------------------------------------Assa
            this.class = "Rogue"
            this.abilities = new assassination_abilities()
            _assassination_talents(this)

            applyBuff(this,this,this.abilities["Deadly Poison"])

            this.melee = true
            this.role = "dps"
            this.energyRegen = 10
            this.resourceName = "Energy"
            this.secondaryResourceName = "Combo Points"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
        } else if (spec==="outlaw") { //----------------------------------------Outlaw
            this.class = "Rogue"
            this.abilities = new Outlaw_Abilities()
            _outlaw_talents(this)
            applyBuff(this,this,this.abilities["Instant Poison"])
            this.melee = true
            this.role = "dps"
            this.energyRegen = 13.5
            this.resourceName = "Energy"
            this.secondaryResourceName = "Combo Points"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
        } else if (spec==="subtlety") { //----------------------------------------Subtlety
            this.class = "Rogue"
            this.abilities = new Subtlety_Abilities()
            _subtlety_talents(this)
            applyBuff(this,this,this.abilities["Instant Poison"])
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
            _restorationDruid_talents(this)
            this.melee = false
            this.role = "healer"
        } else if (spec==="balance") {//----------------------------------------Balance
            this.class = "Druid"
            this.abilities = new balanceDruid_abilities()
            _balance_talents(this)
            //TODO:   Object.keys(this.abilities).forEach((key)=> {
            //             this.abilities[key].range += 5
            //         })
            changeForm(this,this.abilities["Moonkin Form"])
            this.melee = false
            this.resourceName = "Astral Power"
            this.energy = 0
            this.role = "dps"
        } else if (spec==="guardian") { //----------------------------------------Guardian
            this.class = "Druid"
            this.abilities = new Guardian_Abilities()
            _guardian_talents(this)
            applyBuff(this,this,this.abilities["Nature's Guardian"])
            applyBuff(this,this,this.abilities["Ursine Adept"])
            applyBuff(this,this,this.abilities["Thick Hide"])
            setTimeout(()=>{
                this.abilities["Bear Form"].startCast(this)
                this.gcd = 0
            },settings.start1)
            this.melee = true
            this.energy = 25
            this.role = "tank"
            this.resourceName = "Rage"
        } else if (spec==="feral") {//----------------------------------------Feral
            this.class = "Druid"
            this.abilities = new Feral_Abilities()
            _feral_talents(this)
            applyBuff(this,this,this.abilities["Feline Swiftness"])
            setTimeout(()=>{
                this.abilities["Cat Form"].startCast(this)
                this.gcd = 0
            },settings.start1)
            this.melee = true
            this.resourceName = "Energy"
            this.energy = 100
            this.energyRegen = 10
            this.role = "dps"
            this.secondaryResourceName = "Combo Points"
            this.secondaryResource = 0
            this.maxSecondaryResource = 5
        } else if (spec==="arcane") {//----------------------------------------Arcane
            this.class = "Mage"
            this.abilities = new Arcane_abilities()
            _arcane_talents(this)
            this.melee = false
            this.role = "dps"

            this.energyRegen = 0.8 * (1 + (this.stats.mastery / 100))
            this.energy = 100 * (1 + (this.stats.mastery / 100))
            this.maxEnergy = 100 * (1 + (this.stats.mastery / 100))

            this.secondaryResourceName = "Arcane Charges"
            this.secondaryResource = 0
            this.maxSecondaryResource = 4
        } else if (spec==="destruction") {//----------------------------------------Destruction
            this.class = "Warlock"
            this.abilities = new Destruction_Abilities()
            _destruction_talents(this)

            setTimeout(()=>{
                this.abilities["Healthstone"].onStart(this)
                this.abilities["Summon Imp"].startCast(this)
                this.gcd = 0
            },settings.start1)
            this.melee = false
            this.role = "dps"
            this.secondaryResourceName = "Soul Shards"
            this.secondaryResource = 3
            this.maxSecondaryResource = 5
        } else if (spec==="affliction") {//----------------------------------------Affliction
            this.class = "Warlock"
            this.abilities = new Affliction_Abilities()
            _affliction_talents(this)

            setTimeout(()=>{
                this.abilities["Healthstone"].onStart(this)
                this.abilities["Summon Imp"].startCast(this)
                this.gcd = 0
            },settings.start1)

            this.melee = false
            this.role = "dps"
            this.secondaryResourceName = "Soul Shards"
            this.secondaryResource = 3
            this.maxSecondaryResource = 5
        } else if (spec==="demonology") {//----------------------------------------Demonology
            this.class = "Warlock"
            this.abilities = new Demonology_Abilities()
            _demonology_talents(this)

            setTimeout(()=>{
                this.abilities["Healthstone"].onStart(this)
                this.abilities["Summon Imp"].startCast(this)
                this.gcd = 0
            },settings.start1)

            this.melee = false
            this.role = "dps"
            this.secondaryResourceName = "Soul Shards"
            this.secondaryResource = 3
            this.maxSecondaryResource = 5
        } else if (spec==="marksmanship") {//----------------------------------------Marksmanship
            this.class = "Hunter"
            this.abilities = new Marksmanship_Abilities()
            _marksmanship_talents(this)
            this.melee = false
            this.role = "dps"
            this.energyRegen = 5
            this.resourceName = "Focus"
        } else if (spec==="survival") {//----------------------------------------Survival
            this.class = "Hunter"
            this.abilities = new Survival_Abilities()
            _survival_talents(this)
            this.melee = false
            this.role = "dps"
            this.energyRegen = 5
            this.resourceName = "Focus"
        } else if (spec==="fire") {//----------------------------------------Fire
            this.class = "Mage"
            this.abilities = new Fire_Abilities()
            _fire_talents(this)
            applyBuff(this,this,this.abilities["Critical Mass"])
            this.melee = false
            this.role = "dps"
        } else if (spec==="frostMage") {//----------------------------------------Frost
            this.class = "Mage"
            this.abilities = new FrostMage_Abilities()
            _frost_talents(this)

            this.melee = false
            this.role = "dps"
        }  else if (spec==="havoc") {//----------------------------------------Havoc
            this.class = "Demon Hunter"
            this.melee = true
            this.abilities = new Havoc_Abilities()
            _havoc_talents(this)
            applyBuff(this,this,this.abilities["Demonic Wards"])

            this.energy = 0
            this.maxEnergy += 20

            this.resourceName = "Fury"
            this.role = "dps"
        } else if (spec==="vengeance") {//----------------------------------------Vengeance
            this.class = "Demon Hunter"
            this.melee = true
            this.abilities = new Vengeance_Abilities()
            _vengeance_talents(this)
            applyBuff(this,this,this.abilities["Demonic Wards"])
            applyBuff(this,this,this.abilities["Thick Skin"])
            this.energy = 0
            this.resourceName = "Fury"
            this.role = "tank"
        } else if (spec==="fury") {//----------------------------------------Fury
            this.class = "Warrior"
            this.melee = true
            this.abilities = new Fury_Abilities()
            _fury_talents(this)
            this.resourceName = "Rage"
            this.energy = 0
            this.role = "dps"
        } else if (spec==="arms") {//----------------------------------------Arms
            this.class = "Warrior"
            this.melee = true
            this.abilities = new Arms_Abilities()
            _arms_talents(this)
            this.resourceName = "Rage"
            this.energy = 0
            this.role = "dps"
        } else if (spec==="protectionWarrior") {//----------------------------------------Protection Warrior
            this.class = "Warrior"
            this.melee = true
            this.abilities = new ProtectionWarrior_Abilities()
            _protectionWarrior_talents(this)
            applyBuff(this,this,this.abilities["Critical Block"])
            applyBuff(this,this,this.abilities["Vanguard"])

            this.resourceName = "Rage"
            this.energy = 0
            this.role = "tank"
        } else if (spec==="bossTest") {//----------------------------------------Boss Test
            this.class = "Boss"
            this.abilities = new BossTestAbilities()
            this.isStunnable = false
            this.melee = true
            this.size = 15
        } else if (spec==="addTest") {//----------------------------------------Add Test
            this.class = "Add"
            this.abilities = new BossTestAbilities()
            this.melee = true
            this.size = 11
        }
//---------------------------------------------------------------------------------------

        this.abilities["Auto Attack"] = new AutoAttack()
        if (this.class === "Hunter" && this.spec!=="survival") {
            this.abilities["Auto Attack"].range = 40
        }
        this.abilities["Leech"] = new Leech()
        this.abilities["Exhaustion"] = new Exhaustion()
        this.abilities["Healthstone"] = new Healthstone()

        if (this.role==="tank") {
            this.aggroMultiplier = 10
            setTimeout(()=>{this.updateHealth()},settings.start1)
        }

        if (this.enemy) {
            this.stats.armor = 0
        }

        this.health = this.stats.stamina*20
        this.maxHealth = this.stats.stamina*20

        this.statsBup = JSON.parse(JSON.stringify(this.stats))

        Object.keys(this.abilities).forEach((key)=> {
            if (this.abilities[key].talentSelect) {
                this.abilities[key].setTalent(this)
            }
        })
    }

    run() {
        this.floatingTexts.run()

        if (!this.playerCharacter && combatTime>settings.start2/1000) {
            this.ai.run()
        }

        //pets
        for (let i = 0; i<this.pets.length; i++) {
            if (this.pets[i]!==undefined) {
                this.pets[i].run()
            }
        }

        if (this.resourceName==="Energy" || this.resourceName==="Focus") {
            this.energy += (this.energyRegen*(1+(this.stats.haste/100)))/fps
        } else if (this.resourceName==="Mana") {
            this.energy += this.energyRegen/fps
            if (this.spec==="arcane" && this.abilities["Enlightened"].talentSelect) {
                if (this.energy/this.maxEnergy<0.7) {
                    this.energy += (this.energyRegen*0.2)/fps
                }
            }
        }
        if (this.secondaryResourceName==="Runes") { //cba
            if (this.secondaryResource<4) {
                this.secondaryResource += (0.3*(1+(this.stats.haste/100)))/fps
            } else if (this.secondaryResource<5) {
                this.secondaryResource += (0.2*(1+(this.stats.haste/100)))/fps
            } else {
                this.secondaryResource += (0.1*(1+(this.stats.haste/100)))/fps
            }
            if (this.secondaryResource>this.maxSecondaryResource) {
                this.secondaryResource = this.maxSecondaryResource
            }
        }

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
            this.isCasting = false
            this.isCasting2 = false
            this.isChanneling = false
            this.gcd = 0
        }

        //casting ability
        if (this.isCasting) {
            if (this.casting.time<this.casting.time2) {
                this.casting.time += progressInSec
            } else {
                this.abilities[this.casting.name].endCast(this)
                this.isCasting = false
            }
        }
        //casting2 ability
        if (this.isCasting2) {
            if (this.casting2.time<this.casting2.time2) {
                this.casting2.time += progressInSec
            } else {
                this.abilities[this.casting2.name].endCast(this)
                this.isCasting2 = false
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
                this.isChanneling = false
            }
        }

        //autoattack
        if ((this.melee || this.class === "Hunter") && !this.isStunned && !this.isStealthed) {
            this.abilities["Auto Attack"].startCast(this)
        }

        //aggro
        if (this.enemy) {
            this.aggroRun()
        }


        //---------------------------------------------------
        this.maxHealth = (this.stats.stamina*20) * this.increaseHealth

        this.absorbsBuffId = []
        this.absorb = 0
        this.magicabsorbsBuffId = []
        this.magicabsorb = 0
        this.increaseHealth = 1
        this.healingIncrease = 1
        this.moveSpeedIncrease = 1
        if (this.spec==="havoc") {
            this.moveSpeedIncrease += this.stats.mastery/280
        }
        this.attackSpeed = 1
        this.reduceEnergyCost = 1
        this.damageReduction = 0
        this.magicDamageReduction = 0
        this.physicalDamageReduction = 0
        this.damageIncrease = 1

        this.magicDamageTaken = 1
        this.physicalDamageTaken = 1
        this.canRess = false
        this.canRessBuffId = 0

        let dodge = this.stats.crit
        this.stats = JSON.parse(JSON.stringify(this.statsBup))
        this.stats.dodge = dodge
        if (this.enemy) {this.stats.dodge = 0}
        if (this.spec==="vengeance") {
            this.stats.primary *= (1+(this.stats.mastery/300))
        }
        this.isStunned = false
        this.isRooted = false
        this.isSnared = false
        this.isIncapacitated = false
        this.isInterrupted = false
        this.buffMoved = false //Chi torpedo Fix
        this.isStealthed = false
        this.isReflectingSpell = false
        this.battleShout = false
        this.immuneToMagic = false
        this.cantDie = false
        this.healthA = this.health

        if (this.role==="tank") {
            this.stats.primary *= 1+(this.stats.mastery/100)
        }

        //TODO?
        if (this.form==="Ghost Wolf") {
            if (this.abilities["Spirit Wolf"].talentSelect) {
                let sw = this.abilities["Spirit Wolf"]
                if (sw.timer<sw.timer2) {
                    sw.timer += progressInSec
                } else {
                    sw.timer = 0
                    applyBuff(this,this,sw,1,true)
                }
            }
        }
        //forms
        for (let i = 0; i<this.formEffects.length; i++) {
            if (this.formEffects[i].name==="moveSpeed") {
                this.moveSpeedIncrease += this.formEffects[i].val
            } else if (this.formEffects[i].name === "damageReduction") {
                this.damageReduction += this.formEffects[i].val
            } else if (this.formEffects[i].name==="increaseDamage") {
                this.damageIncrease += this.formEffects[i].val
            } else if (this.formEffects[i].name==="increaseArmor") {
                this.stats.armor = this.stats.armor*(1+this.formEffects[i].val)
            } else if (this.formEffects[i].name === "incAttackSpeed") {
                this.attackSpeed *= (1 + this.formEffects[i].val)
            }  else if (this.formEffects[i].name === "increaseStat") {
                this.stats[this.formEffects[i].stat] *= 1+(this.formEffects[i].val/100)
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
            }

            if (Array.isArray(this.buffs[i].effect)) {
                //NEW
                for (let j = 0; j<this.buffs[i].effect.length; j++) {
                    if (this.buffs[i].effect[j].name === "move") {
                        if (!this.buffMoved) {
                            this.move((this.buffs[i].effect[j].val * 40) / 60, undefined, undefined, true)
                            this.buffMoved = true
                        }
                    } else if (this.buffs[i].effect[j].name === "healingIncrease") {
                        this.healingIncrease += this.buffs[i].effect[j].val * this.buffs[i].stacks
                    } else if (this.buffs[i].effect[j].name === "healingIncrease2") {
                        this.healingIncrease += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "increaseDamage") {
                        if (this.buffs[i].stacks > 1) {
                            this.damageIncrease += this.buffs[i].effect[j].val * this.buffs[i].stacks
                        } else {
                            this.damageIncrease += this.buffs[i].effect[j].val
                        }
                    } else if (this.buffs[i].effect[j].name === "moveSpeed") {
                        if (this.buffs[i].stacks > 1) {
                            this.moveSpeedIncrease += this.buffs[i].effect[j].val * this.buffs[i].stacks
                        } else {
                            this.moveSpeedIncrease += this.buffs[i].effect[j].val
                        }
                    } else if (this.buffs[i].effect[j].name === "incAttackSpeed") {
                        if (this.buffs[i].stacks > 1) {
                            this.attackSpeed *= (1 + (this.buffs[i].effect[j].val* this.buffs[i].stacks))
                        } else {
                            this.attackSpeed *= (1 + this.buffs[i].effect[j].val)
                        }
                    } else if (this.buffs[i].effect[j].name === "reduceEnergyCost") {
                        this.reduceEnergyCost -= (this.buffs[i].effect[j].val)
                        if (this.reduceEnergyCost<0) {
                            this.reduceEnergyCost = 0
                        }
                    } else if (this.buffs[i].effect[j].name === "damageReduction") {
                        this.damageReduction += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "damageReductionStacks") {
                        this.damageReduction += this.buffs[i].effect[j].val * this.buffs[i].stacks
                    } else if (this.buffs[i].effect[j].name === "physicalDamageReduction") {
                        this.physicalDamageReduction += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "magicDamageReduction") { //DR
                        this.magicDamageReduction += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "magicDamageTaken") {  //INC DMG TAKEN
                        this.magicDamageTaken += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "physicalDamageTaken") {
                        this.physicalDamageTaken += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "absorb") {
                        this.absorb += this.buffs[i].effect[j].val
                        this.absorbsBuffId.push(i)
                    } else if (this.buffs[i].effect[j].name === "magicabsorb") {
                        this.magicabsorb += this.buffs[i].effect[j].val
                        this.magicabsorbsBuffId.push(i)
                    } else if (this.buffs[i].effect[j].name === "increaseStat") {
                        if (this.buffs[i].effect[j].percent) {
                            if (this.buffs[i].stacks > 1) {
                                this.stats[this.buffs[i].effect[j].stat] *= 1+((this.buffs[i].effect[j].val*this.buffs[i].stacks)/100)
                            } else {
                                this.stats[this.buffs[i].effect[j].stat] *= 1+(this.buffs[i].effect[j].val/100)
                            }

                        } else {
                            if (this.buffs[i].stacks > 1) {
                                this.stats[this.buffs[i].effect[j].stat] += this.buffs[i].effect[j].val * this.buffs[i].stacks
                            } else {
                                this.stats[this.buffs[i].effect[j].stat] += this.buffs[i].effect[j].val
                            }
                        }
                    } else if (this.buffs[i].effect[j].name === "hot") {
                        if (this.buffs[i].effect[j].timer<1) {
                            this.buffs[i].effect[j].timer+= (progressInSec)*(1 + (this.buffs[i].caster.stats.haste / 100))
                        } else {
                            doHeal(this.buffs[i].caster,this,this.buffs[i].ability,undefined,this.buffs[i].ability.spellPowerHot,undefined,undefined,undefined,undefined,undefined,true)
                            this.buffs[i].effect[j].timer = 0
                        }
                    } else if (this.buffs[i].effect[j].name === "increaseHealth") {
                        this.increaseHealth += this.buffs[i].effect[j].val
                    } else if (this.buffs[i].effect[j].name === "stealth") {
                        this.isStealthed = true
                    } else if (this.buffs[i].effect[j].name === "healPercent") {
                        if (this.buffs[i].effect[j].timer1<this.buffs[i].effect[j].timer2) {
                            this.buffs[i].effect[j].timer1 += progressInSec
                        } else {
                            this.buffs[i].effect[j].timer1 = 0
                            let val = this.maxHealth * this.buffs[i].effect[j].val
                            doHeal(this.buffs[i].caster,this,this.buffs[i].ability,undefined,undefined,undefined,undefined,undefined,val)
                        }
                    } else if (this.buffs[i].effect[j].name === "moveToTarget") {
                        let minDistance = 3
                        if (this.buffs[i].effect[j].dist) {
                            minDistance = this.buffs[i].effect[j].dist
                        }
                        this.direction = getDirection(this,creatures[this.buffs[i].effect[j].target])
                        this.move((this.buffs[i].effect[j].val*40)/fps,undefined,undefined,true)
                        if (getDistance(this,creatures[this.buffs[i].effect[j].target])<minDistance) {
                            this.buffs[i].duration = -1
                        }
                    } else if (this.buffs[i].effect[j].name === "moveToPoint") {
                        let minDistance = 3
                        if (this.buffs[i].effect[j].dist) {
                            minDistance = this.buffs[i].effect[j].dist
                        }
                        this.direction = getDirection(this,this.buffs[i].effect[j].target)
                        this.move((this.buffs[i].effect[j].val*40)/fps,undefined,undefined,true)
                        if (getDistance(this,this.buffs[i].effect[j].target)<minDistance) {
                            this.buffs[i].duration = -1
                        }
                    }  else if (this.buffs[i].effect[j].name === "stun") {
                        if (this.isStunnable) {
                            this.isStunned = true
                        }
                    } else if (this.buffs[i].effect[j].name === "root") {
                        this.isRooted = true
                    } else if (this.buffs[i].effect[j].name==="reflectSpell") {
                        this.isReflectingSpell = true
                    } else if (this.buffs[i].effect[j].name === "endWithStealth") {
                        if (!this.isStealthed) {
                            this.buffs[i].duration = -1
                        }
                    } else if (this.buffs[i].effect[j].name === "canMoveWhileCasting") {
                        this.canMoveWhileCasting = true
                    } else if (this.buffs[i].effect[j].name === "restoreMana") {
                        this.energy += this.buffs[i].effect[j].val / (fps*5)
                        if (this.energy>this.maxEnergy) {
                            this.energy = this.maxEnergy
                        }
                    } else if (this.buffs[i].effect[j].name === "resurrect") {
                        this.canRess = true
                        this.canRessBuffId = i
                    } else if (this.buffs[i].effect[j].name === "healWhenBelow") {
                        if (this.buffs[i].effect[j].time<=0) {
                            if (this.health/this.maxHealth<this.buffs[i].effect[j].below) {
                                this.health += this.maxHealth*this.buffs[i].effect[j].heal
                                this.buffs[i].effect[j].time = this.buffs[i].effect[j].time2 - progressInSec
                            }
                        } else {
                            this.buffs[i].effect[j].time -= progressInSec
                        }
                    } else if (this.buffs[i].effect[j].name === "prayerofMending") {
                        let buffPoM = this.buffs[i].effect[j]
                        let buff = this.buffs[i]
                        if (this.healthA<this.healthB && buff.duration+1<buffPoM.lastTime ) {
                            doHeal(buff.caster,this,buff.caster.abilities["Prayer of Mending"])
                            buffPoM.lastTime = buff.duration
                            buffPoM.val--
                            if (buffPoM.val>0) {
                                let target = getRandomFriendlyTargetNear(this,20,"Prayer of Mending",buff.caster)
                                if (target!==false) {
                                    applyBuff(buff.caster,target,buff.caster.abilities["Prayer of Mending"],buffPoM.vals,true,undefined,(buff.duration+0.1))
                                }
                            }
                            if (buff.caster.spec==="holyPriest" && buff.caster.abilities["Benediction"].talentSelect && getChance(25)) {
                                applyHot(buff.caster,this,buff.caster.abilities["Renew"])
                            }
                            buff.duration = -1
                        }
                    } else if (this.buffs[i].effect[j].name === "healWhenDamage") {
                        let buffPoM = this.buffs[i].effect[j]
                        let buff = this.buffs[i]
                        if (this.healthA<this.healthB && buff.duration+3<buffPoM.lastTime) {
                            doHeal(buff.caster,this,buff.ability)
                            buffPoM.lastTime = buff.duration
                            if (buff.stacks>1) {
                                buff.stacks--
                            } else {
                                buff.duration = -1
                            }
                        }
                    } else if (this.buffs[i].effect[j].name === "redirectDamage") {
                        let buffPoM = this.buffs[i].effect[j]
                        let buff = this.buffs[i]
                        if (!buff.ability.destroyed) {
                            if (this.healthA < this.healthB) {
                                if (buffPoM.returnTo === "ability") {
                                    doHeal(buff.caster, this, buff.ability)
                                    buff.ability.health -= ((buff.caster.stats.primary * buff.ability.spellPower) * (1 + (buff.caster.stats.vers / 100)))
                                    buff.ability.destroyed = buff.ability.destroyArea(this)
                                }

                                if (buff.stacks > 1) {
                                    buff.stacks--
                                } else {
                                    buff.duration = -1
                                }
                            }
                        }
                    } else if (this.buffs[i].effect[j].name === "TouchofKarma") {
                        let buffPoM = this.buffs[i].effect[j]
                        let buff = this.buffs[i]
                        if (buffPoM.val>buff.effect[0].val) {
                            let val = (buffPoM.val-buff.effect[0].val) * buffPoM.percent
                            buffPoM.val = buff.effect[0].val+0
                            doDamage(buff.caster, buffPoM.target, buff.ability,undefined,undefined,false,undefined,undefined,undefined,val)
                            if (this.abilities["Good Karma"].talentSelect) {
                                doHeal(buff.caster, this, buff.ability,undefined,undefined,false,undefined,undefined,val)
                            }
                        }
                    } else if (this.buffs[i].effect[j].name === "starfall") {
                        this.buffs[i].effect[j].timer += progressInSec
                        if (this.buffs[i].effect[j].timer>1) {
                            for (let i = 0; i<enemies.length ;i++) {
                                if (!enemies[i].isDead && getDistance(this, enemies[i])<40 ) {
                                    doDamage(this, enemies[i], this.abilities["Starfall"])
                                }
                            }
                            this.buffs[i].effect[j].timer=0
                        }
                    } else if (this.buffs[i].effect[j].name === "RJWHeal") {
                        this.buffs[i].effect[j].timer += progressInSec
                        if (this.buffs[i].effect[j].timer>this.buffs[i].effect[j].timer2) {
                            let t = 0
                            for (let ft = 0; ft<friendlyTargets.length ;ft++) {
                                if (!friendlyTargets[ft].isDead && getDistance(this, friendlyTargets[ft])<this.abilities["Refreshing Jade Wind"].range) {
                                    doHeal(this, friendlyTargets[ft], this.abilities["Refreshing Jade Wind"])
                                    t++
                                    if (t>this.buffs[i].effect[j].targets) {
                                        break
                                    }
                                }
                            }
                            this.buffs[i].effect[j].timer=0
                        }
                    } else if (this.buffs[i].effect[j].name === "RJWDamage") {
                        this.buffs[i].effect[j].timer += progressInSec
                        if (this.buffs[i].effect[j].timer>this.buffs[i].effect[j].timer2) {
                            let t = 0
                            for (let ft = 0; ft<enemies.length ;ft++) {
                                if (!enemies[ft].isDead && getDistance(this, enemies[ft])<this.abilities["Rushing Jade Wind"].range) {
                                    doDamage(this, enemies[ft], this.abilities["Rushing Jade Wind"])
                                    t++
                                    if (t>this.buffs[i].effect[j].targets) {
                                        break
                                    }
                                }
                            }
                            this.buffs[i].effect[j].timer=0
                        }
                    } else if (this.buffs[i].effect[j].name === "cantDie") {
                        this.health = this.maxHealth
                    } else if (this.buffs[i].effect[j].name === "cantDie2") {
                        this.cantDie = true
                    } else if (this.buffs[i].effect[j].name === "cenarionWard") {
                        if (this.healthA < this.healthB) {
                            this.buffs[i].duration = -1
                            applyHot(this.buffs[i].caster,this,this.buffs[i].caster.abilities["Cenarion Ward Hot"])
                        }
                    } else if (this.buffs[i].effect[j].name === "efflorescence") {
                        if (this.buffs[i].caster.abilities["Spring Blossoms"].talentSelect) {
                            applyHot(this.buffs[i].caster,this,this.buffs[i].caster.abilities["Spring Blossoms"])
                        }
                    } else if (this.buffs[i].effect[j].name === "interrupt") {
                        this.isInterrupted = true
                    } else if (this.buffs[i].effect[j].name === "battleShout") {
                        this.battleShout = true
                    } else if (this.buffs[i].effect[j].name === "arcaneIntellect") {
                        if (this.role==="healer" || this.class==="Mage" || this.class==="Priest" || this.spec==="balance" || this.spec==="elemental" || this.class==="Warlock") {
                            this.stats.primary *= 1.05
                        }
                    } else if (this.buffs[i].effect[j].name === "divineBulwark") {
                        this.stats.dodge *= 1+(this.stats.mastery/100)
                        let consecration = this.abilities["Consecration"]
                        if (consecration.areaId!==undefined) {
                            if (areas[consecration.areaId] && areas[consecration.areaId].ability.name === "Consecration" && areas[consecration.areaId].caster === this) {
                                if (getDistance(this,areas[consecration.areaId])<8) {
                                    this.damageReduction += (player.stats.mastery/2.666)/100
                                }
                            }
                        }
                    } else if (this.buffs[i].effect[j].name === "boneShield") {
                        this.stats.haste += 10
                        this.stats.armor += 16
                        if (this.abilities["Foul Bulwark"].talentSelect) {
                            this.increaseHealth += 0.01*this.buffs[i].stacks
                        }

                    } else if (this.buffs[i].effect[j].name === "immuneToMagic") {
                        this.immuneToMagic = true
                    } else if (this.buffs[i].effect[j].name === "criticalBlock") {
                        this.stats.block += this.stats.mastery*2
                    } else if (this.buffs[i].effect[j].name === "naturesGuardian") {
                        this.increaseHealth += (this.stats.mastery/200)
                        this.healingIncrease += (this.stats.mastery/200)
                    }
                }
            } else {
                //OLD
                if (this.buffs[i].effect==="move") {
                    this.move((this.buffs[i].effectValue*40)/fps,undefined,undefined,true)
                } else if (this.buffs[i].effect==="healingIncrease") {
                    this.healingIncrease += this.buffs[i].effectValue
                } else if (this.buffs[i].effect === "moveSpeed") {
                    this.moveSpeedIncrease += this.buffs[i].effectValue
                } else if (this.buffs[i].effect === "incAttackSpeed") {
                    this.attackSpeed *= (1+this.buffs[i].effectValue)
                } else if (this.buffs[i].effect === "reduceEnergyCost") {
                    this.reduceEnergyCost -= this.buffs[i].effectValue
                    if (this.reduceEnergyCost<0) {
                        this.reduceEnergyCost = 0
                    }
                }
            }

            if (this.moveSpeedIncrease<0) {
                this.moveSpeedIncrease = 0
            }
            if (this.damageReduction>1) {
                this.damageReduction = 1
            }
            if (this.magicDamageReduction>1) {
                this.magicDamageReduction = 1
            }
            if (!this.buffs[i].ability.permanentBuff) {
                this.buffs[i].duration -= progressInSec
                if (this.buffs[i].duration < 0 || this.buffs[i].stacks <= 0) {
                    this.buffs[i].ability.endBuff(this,i)
                    this.buffs.splice(i, 1)
                    i--
                } else {
                    this.buffs[i].ability.runBuff(this, this.buffs[i], i)
                }
            } else {
                if (this.buffs[i].duration===-1) {
                    this.buffs[i].ability.endBuff(this,i)
                    this.buffs.splice(i, 1)
                    i--
                } else {
                    this.buffs[i].ability.runBuff(this, this.buffs[i], i)
                }
            }
        }

        if (this.stats.armor>10) { //TODO:FIX?
            /*if (this===player) {
                console.log("---------------")
                console.log(this.stats.armor)
            }*/
            //this.stats.armor = this.stats.armor/Math.log10(this.stats.armor)
            this.stats.armor = Math.pow((Math.log10(this.stats.armor)*10),1.5)/1.5  //???
            /*if (this===player) {
                console.log(this.stats.armor)
            }*/
        }
        if (this.stats.armor>75) {
            this.stats.armor = 75
        }


        this.healthB = this.health
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
            } else if (this.debuffs[i].type==="stagger") {
                if (this.debuffs[i].effect[0].time<this.debuffs[i].effect[0].time2) {
                    this.debuffs[i].effect[0].time+=progressInSec
                } else if (this.debuffs[i].effect[0].val>0) {
                    this.debuffs[i].effect[0].time = 0
                    doDamage(this,this,this.abilities["Stagger"],undefined,undefined,undefined,undefined,undefined,undefined,this.debuffs[i].effect[0].dotVal)
                    if (this.isDead) {
                        break
                    }
                    this.debuffs[i].effect[0].val -= this.debuffs[i].effect[0].dotVal
                    if (this.debuffs[i].effect[0].val<=0) {
                        this.debuffs[i].effect[0].val = 0
                        this.debuffs[i].duration = -1
                    }
                    this.secondaryResource = Math.round(this.debuffs[i].effect[0].val)
                }
            }

            if (Array.isArray(this.debuffs[i].effect)) {
                for (let j = 0; j < this.debuffs[i].effect.length; j++) {
                    if (this.debuffs[i].effect[j].name === "stun") {
                        if (this.isStunnable) {
                            this.isStunned = true
                        } else {
                            this.debuffs[i].duration = -1
                        }
                    } else if (this.debuffs[i].effect[j].name === "root") {
                        this.isRooted = true
                    } else if (this.debuffs[i].effect[j].name === "incapacitate") {
                        if (this.isStunnable) {
                            this.isStunned = true
                            this.isIncapacitated = true
                        } else {
                            this.debuffs[i].duration = -1
                        }
                    } else if (this.debuffs[i].effect[j].name === "moveSpeed") {
                        this.moveSpeedIncrease -= this.debuffs[i].effect[j].val
                        if (this.moveSpeedIncrease<0) {
                            this.moveSpeedIncrease = 0
                        }
                        this.isSnared = true
                    } else if (this.debuffs[i].effect[j].name === "interrupt") {
                        this.isInterrupted = true
                    } else if (this.debuffs[i].effect[j].name === "rootIfSnared") {
                        this.isRooted = true
                    } else if (this.debuffs[i].effect[j].name === "reduceDamage") {
                        this.damageIncrease -= this.debuffs[i].effect[j].val
                        if (this.damageIncrease<0) {
                            this.damageIncrease = 0
                        }
                    } else if (this.debuffs[i].effect[j].name === "magicDamageTaken") {
                        this.magicDamageTaken += this.debuffs[i].effect[j].val
                    } else if (this.debuffs[i].effect[j].name === "damageTaken") {
                        this.damageReduction -= this.debuffs[i].effect[j].val
                        if (this.damageReduction<0) {
                            this.damageReduction = 0
                        }
                    }



                }
            }

            if (!this.debuffs[i].ability.permanentBuff) {
                this.debuffs[i].duration -= progressInSec
                if (this.debuffs[i].duration < 0) {
                    this.debuffs[i].ability.endBuff(this)
                    this.debuffs.splice(i, 1)
                    i--
                } else {
                    this.debuffs[i].ability.runBuff(this, this.debuffs[i], i)
                }
            } else {
                if (this.debuffs[i].duration===-1) {
                    this.debuffs[i].ability.endBuff(this)
                    this.debuffs.splice(i, 1)
                    i--
                }
            }
        }

        if (!inCombat) {
            this.inCombat = false
        }

        //death
        if (this.health<0) {
            this.die()
        }
    }

    die() {
        if (this.cantDie) {
            return false
        }

        if (this.class==="Rogue" && this.abilities["Cheat Death"].talentSelect) {
            this.abilities["Cheat Death"].cheat(this)
            return false
        } else if (this.spec==="holyPriest") {
            if (this.abilities["Spirit of Redemption"].applyBuff(this)) {
                return false
            } else {
                this.abilities["Spirit of Redemption"].used = false
            }
        } else if (this.spec==="vengeance" && this.abilities["Last Resort"].talentSelect) {
            this.abilities["Last Resort"].cheat(this)
            return false
        } else if (this.spec==="blood" && this.abilities["Purgatory"].talentSelect) {
            this.abilities["Purgatory"].preventFatalDamage(this)
            return false
        } else if (this.spec==="fire") {
            if (this.abilities["Cauterize"].cd>=this.abilities["Cauterize"].maxCd) {
                this.health = this.maxHealth*0.35
                applyBuff(this,this,this.abilities["Cauterize"])
                return false
            }
        }

        this.floatingTexts.removeAll()
        this.isDead = true
        if (this.canRess /*&& this.health>this.maxHealth*(-1)*/) { //TODO
            this.health = this.maxHealth*this.buffs[this.canRessBuffId].ability.health
            this.isDead = false
            if (this.buffs[this.canRessBuffId].ability.destroyArea) {
                this.buffs[this.canRessBuffId].ability.destroyArea(this.buffs[this.canRessBuffId].caster)
            }
            this.buffs[this.canRessBuffId].duration = -1

        } else {
            this.health = 0
        }

        if (this.enemy) {
            for (let i = 0; i<friendlyTargets.length; i++) {
                Object.keys(friendlyTargets[i].abilities).forEach((key)=> {
                    if (friendlyTargets[i].abilities[key].killEnemy) {
                        friendlyTargets[i].abilities[key].killEnemy(friendlyTargets[i],this)
                    }
                })
            }
        }

        for (let i = 0; i<this.pets.length; i++) {
            this.pets[i] = undefined
        }

        for (let i = 0; i<this.buffs.length; i++) {
            this.buffs[i].ability.endBuff(this)
        }
        for (let i = 0; i<this.debuffs.length; i++) {
            this.debuffs[i].ability.endBuff(this)
        }

        for (let i = 0; i<this.buffs.length; i++) {
            this.buffs[i].ability.onDeath(this.buffs[i].caster,this,this.buffs[i])
        }
        for (let i = 0; i<this.debuffs.length; i++) {
            this.debuffs[i].ability.onDeath(this.debuffs[i].caster,this,this.debuffs[i])
        }

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

    updateHealth() {
        this.health = (this.stats.stamina*20) * this.increaseHealth
    }

    useEnergy(val,val2 = 0) {
        let val2Used = this.secondaryResource
        if (this.reduceEnergyCost<0) {this.reduceEnergyCost=0}
        this.energy -= val * this.reduceEnergyCost
        if (val2!==0 && this.maxSecondaryResource>0) {
            this.useSec(val2)
        }
        if (this.spec==="arcane") {
            this.abilities["Clearcasting "].spendMana(this,val)
            if (this.abilities["Rule of Threes"].talentSelect && val2<0) {
                if (this.secondaryResource===3) {
                    applyBuff(this,this,this.abilities["Rule of Threes"])
                }
            }
        } else if (this.spec==="restorationShaman") {
            this.abilities["High Tide"].spendMana(this,val)
        } else if (this.class==="Warrior") {
            if (this.spec==="fury") {
                if (val<0) {
                    if (checkBuff(this,this,"Recklessness")) {
                        this.energy -= val
                    }
                } else {
                    this.abilities["Anger Management"].spendRage(this,val)
                }
            } else if (this.spec==="arms") {
                if (val>0 && getChance(1.4*val)) {
                    this.abilities["Overpower"].cd = this.abilities["Overpower"].maxCd
                }
            } else if (this.spec==="protectionWarrior") {
                if (this.abilities["Indomitable"].talentSelect && val>0) {
                    doHeal(this,this,this.abilities["Indomitable"],undefined,undefined,undefined,undefined,undefined,val*0.001)
                }
            }
        } else if (this.spec==="holyPaladin") {
            if  (this.abilities["Fist of Justice"].talentSelect) {
                if (val2>0) {
                    this.abilities["Hammer of Justice"].incCd(this,2*val2,false)
                }
            }
            if (this.abilities["Holy Avenger"].talentSelect && val2<0 && checkBuff(this,this,"Holy Avenger")) {
                this.useSec(val2 * 2)
            }
        } else if (this.spec==="protectionPaladin") {
            if (this.abilities["Holy Avenger"].talentSelect && val2<0 && checkBuff(this,this,"Holy Avenger")) {
                this.useSec(val2 * 2)
            }
            if (this.abilities["Righteous Protector"].talentSelect && val2>0) {
                //"Each Holy Power spent reduces the remaining cooldown on Avenging Wrath and Guardian of Ancient Kings by 1 sec."
                this.abilities["Avenging Wrath"].incCd(this,val2,false)
                this.abilities["Guardian of Ancient Kings"].incCd(this,val2,false)
            }
        } else if (this.spec==="retribution") {
            if (this.abilities["Holy Avenger"].talentSelect && val2<0 && checkBuff(this,this,"Holy Avenger")) {
                this.useSec(val2 * 2)
            }
            if (this.abilities["Sanctified Wrath"].talentSelect && val2>0 && checkBuff(this,this,"Avenging Wrath")) {
                this.abilities["Sanctified Wrath"].explode(this,val2)
            }
            if (this.abilities["Selfless Healer"].talentSelect && val2>0) {
                applyBuff(this,this,this.abilities["Selfless Healer"],1,true)
            }
        } else if (this.spec==="blood") {
            if (this.abilities["Red Thirst"].talentSelect) {
                if (val>0) {
                    this.abilities["Vampiric Blood"].incCd(this,1.5*(val/10),true)
                }
            }
        } else if (this.spec==="frostDk") {
            if (val>0) {
                if (getChance(val*2)) {
                    this.secondaryResource+=1
                    if (this.secondaryResource>this.maxSecondaryResource) {
                        this.secondaryResource = this.maxSecondaryResource
                    }
                }
                if (this.abilities["Icy Talons"].talentSelect) {
                    applyBuff(this,this,this.abilities["Icy Talons"],1,true)
                }
            }
            if (val2>0) {
                for (let i = 0; i<this.buffs.length; i++) {
                    if (this.buffs[i].name === "Pillar of Frost") {
                        this.buffs[i].effect[0].val += val2
                    }
                    if (this.buffs[i].name==="Remorseless Winter" && this.abilities["Gathering Storm"].talentSelect) {
                        this.abilities["Remorseless Winter"].gatheringStorm += val2
                        this.buffs[i].duration += val2*0.5
                    }
                }
            }
        } else if (this.spec==="unholy") {
            if (val>0) {
                if (getChance(val*1.6)) {
                    this.secondaryResource += 0.3
                }
            }
        } else if (this.spec==="outlaw") {
            if (val2>0 || val2==="all") {
                if (val2==="all") {
                    val2 = val2Used
                }
                if (checkBuff(this,this,"Grand Melee")) {
                    let a = true
                    /*for (let i = 0; i<this.buffs.length; i++) {
                        if (this.buffs[i].name==="Slice and Dice") {
                            this.buffs[i].duration += val2*2
                            a = false
                            break
                        }
                    }*/
                    if (a) {

                        if (this.abilities["Slice and Dice"]) {
                            applyBuff(this,this,this.abilities["Slice and Dice"],undefined,undefined,undefined,val2*2)
                        }
                    }
                }
            } else if (val2<0) {
                if (checkBuff(this,this,"Broadside")) {
                    this.secondaryResource ++
                    if (this.secondaryResource>this.maxSecondaryResource) {
                        this.secondaryResource = this.maxSecondaryResource
                    }
                }
            }
        } else if (this.spec==="subtlety") {
            if (val2>0 || val2==="all") { //Relentless Strikes, Deepening Shadows
                if (val2==="all") {
                    val2 = val2Used
                }
                if (this.abilities["Enveloping Shadows"].talentSelect) {
                    this.abilities["Shadow Dance"].incCd(this,val2*1.5,false)
                } else {
                    this.abilities["Shadow Dance"].incCd(this,val2,false)
                }

                this.useEnergy(-6*val2)
            }
            if (val>0) {
                if (this.abilities["Shadow Focus"].talentSelect && this.isStealthed) {
                    this.useEnergy(-val*0.2)
                }
            }
        }

    }

    interrupt() {
        if (this.isChanneling) {
            this.isChanneling = false
            this.abilities[this.channeling.name].setCd()
            return true
        } else if (this.isCasting) {
            this.isCasting = false
            this.abilities[this.casting.name].setCd()
            return true
        }

        return false
    }

    move(val,strafe = 0, forceVal = 0,noInc = false) { //val -0.5 - 1
        let speed
        if (!noInc) {
            speed = val * this.moveSpeed * this.moveSpeedIncrease
        } else {
            speed = val
        }

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
        }
        if (this.isCasting2 && this.abilities[this.casting2.name].castTime>0 && !this.canMoveWhileCasting) {
            this.isCasting2 = false
            this.gcd = 0
        }
        if (this.isChanneling && !this.canMoveWhileCasting) {
            if (this.abilities[this.channeling.name].endChanneling) {
                this.abilities[this.channeling.name].endChanneling(this)
            }
            this.isChanneling = false
            this.channeling = {name:"", time:0, time2:0}
        }
        if (!this.isStunned && !this.isRooted && !this.isDead) {
            this.x += vx * (60/fps)
            this.y += vy * (60/fps)
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


    changeTalent(row,talentColumn) {

        for (let i = 0; i<3; i++) {
            if (this.abilities[this.talents[row][i]]!==undefined) {
                if (this.abilities[this.talents[row][i]].talentSelect) {
                    this.abilities[this.talents[row][i]].unsetTalent(this)
                }
                this.abilities[this.talents[row][i]].talentSelect = false
            }
        }
        if (this.abilities[this.talents[row][talentColumn]]!==undefined) {
            this.abilities[this.talents[row][talentColumn]].talentSelect = true
            this.abilities[this.talents[row][talentColumn]].setTalent(this)
        }
        if (this===player) {
            open_talents(true)
        }
    }


}

let friendlyTargets = []
let enemyTargets = []
let enemies = []