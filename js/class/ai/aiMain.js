class Ai {

    constructor(creature) {
        this.creature = creature
    }

    ai = {
        "windwalker":() => { //--------------------------------------------------------------------------------------------------Windwalker
            let c = this.creature
            let casted = false
            let target = this.getLowestHpEnemy()
            setTargetAi(c,target)
            c.direction = getDirection(c,c.targetObj)
            let dist = getDistance(c,c.targetObj)
            let distNeed = 4
            if (dist>distNeed) {
                if (dist>12) {
                    c.abilities["Roll"].startCast(c)
                }
                c.move(1)
            } else {

                if (this.getNumberOfEnemies(c,6)>2) {
                    casted = c.abilities["Spinning Crane Kick"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Rising Sun Kick"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Blackout Kick"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Tiger Palm"].startCast(c)
                }

            }

        },
        "brewmaster":() => { //--------------------------------------------------------------------------------------------------Brewmaster
            let c = this.creature
            let casted = false
            let target = this.getLowestHpEnemy()
            setTargetAi(c,target)

            if (combatTime<7) { //TODO:?
                c.abilities["Provoke"].startCast(c)
            }
            let tauntTargets = this.checkTargetsAggroTank(c)
            if (tauntTargets.length>0) {
                setTargetAi(c,tauntTargets[0])
                c.abilities["Provoke"].startCast(c)
            }

            c.direction = getDirection(c,c.targetObj)
            let dist = getDistance(c,c.targetObj)
            let distNeed = 4
            if (dist>distNeed) {
                c.move(1)
            } else {

                if (this.getNumberOfEnemies(c,6)>1) {
                    casted = c.abilities["Spinning Crane Kick"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Blackout Kick"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Tiger Palm"].startCast(c)
                }

            }

        },
        "mistweaver":() => {//--------------------------------------------------------------------------------------------------Mistweaver
            let c = this.creature
            let casted = false
            let raidAvgHealth = this.getRaidAvgHealth()

            if (!c.isCasting && !c.isChanneling && c.gcd<=0) {

                if (!casted && raidAvgHealth < 0.75) {
                    casted = c.abilities["Revival"].startCast(c)
                }

                if (!casted) {
                    let target = this.checkTargetsIfHealth(0.95,true)
                    if (target) {
                        for (let i = 0; i<target.length; i++) {
                            if (!this.checkBuff(c,target[i],"Renewing Mist")) {
                                setTargetAi(c,target[i])
                                casted = c.abilities["Renewing Mist"].startCast(c)
                            }
                        }
                    }
                }

                if (!casted && raidAvgHealth < 0.9) {
                    casted = c.abilities["Essence Font"].startCast(c)
                }

                if (!casted) {
                    let target = this.checkTargetsIfHealth(0.5)
                    if (target) {
                        setTargetAi(c,target)
                        casted = c.abilities["Vivify"].startCast(c)
                    }
                }
                if (!casted) {
                    let target = this.checkTargetsIfHealth(0.3)
                    if (target) {
                        if (!this.checkBuff(c,target,"Enveloping Mist")) {
                            setTargetAi(c,target)
                            casted = c.abilities["Enveloping Mist"].startCast(c)
                        }
                    }
                }

                let target = this.getLowestHpEnemy()
                setTargetAi(c, target)
                c.direction = getDirection(c, c.targetObj)
                let dist = getDistance(c, c.targetObj)
                let distNeed = 4
                if (dist > distNeed) {
                    if (dist > 12) {
                        c.abilities["Roll"].startCast(c)
                    }
                    c.move(1)
                } else {

                    if (this.getNumberOfEnemies(c, 6) > 2) {
                        casted = c.abilities["Spinning Crane Kick"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Rising Sun Kick"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Blackout Kick"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Tiger Palm"].startCast(c)
                    }

                }
            }

        },
        "restorationShaman":() => { //--------------------------------------------------------------------------------------------------Resto Sham
            let c = this.creature
            c.direction = getDirection(c,enemies[0])
            let casted = false
            let raidAvgHealth = this.getRaidAvgHealth()

            if (!c.isCasting && !c.isChanneling && c.gcd<=0) {

                if (!casted && raidAvgHealth<0.8) {
                    casted = c.abilities["Healing Tide Totem"].startCast(c)
                }

                if (!casted && raidAvgHealth<0.98) {
                    c.setMousePos(enemies[0].x,enemies[0].y) //TODO
                    casted = c.abilities["Healing Rain"].startCast(c)
                }

                if (!casted) {
                    let target = this.checkTargetsIfHealth(0.95,true)
                    if (target) {
                        for (let i = 0; i<target.length; i++) {
                            if (!this.checkBuff(c,target[i],"Riptide")) {
                                setTargetAi(c,target[i])
                                casted = c.abilities["Riptide"].startCast(c)
                            }
                        }
                    }
                }

                if (!casted) {
                    let target = this.checkTargetsIfHealth(0.5)
                    if (target) {
                        setTargetAi(c,target)
                        casted = c.abilities["Healing Surge"].startCast(c)
                    }
                }
                if (!casted) {
                    let target = this.getLowestHpEnemy()
                    setTargetAi(c,target)
                    c.direction = getDirection(c,c.targetObj)

                    if (!this.checkDebuff(c,target,"Flame Shock")) {
                        casted = c.abilities["Flame Shock"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Lava Burst"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Lightning Bolt"].startCast(c)
                    }
                }
            }

        },
        "holyPriest":() => { //--------------------------------------------------------------------------------------------------Holy Priest
            let c = this.creature
            c.direction = getDirection(c,enemies[0])
            let casted = false
            let raidAvgHealth = this.getRaidAvgHealth()

            if (!c.isCasting && !c.isChanneling && c.gcd<=0) {

                if (!casted && raidAvgHealth < 0.8) {
                    casted = c.abilities["Divine Hymn"].startCast(c)
                }

                if (!c.isChanneling) {
                    if (!casted && raidAvgHealth < 0.95) {
                        c.setMousePos(enemies[0].x, enemies[0].y) //TODO
                        casted = c.abilities["Holy Word: Sanctify"].startCast(c)
                    }

                    if (!casted) {
                        getRandomFriendlyTargetNear(c,40,"Prayer of Mending",c)
                        casted = c.abilities["Prayer of Mending"].startCast(c)
                    }

                    if (!casted && raidAvgHealth < 0.9) {
                        let target = this.checkTargetsIfHealth(0.9)
                        if (target) {
                            setTargetAi(c, target)
                            casted = c.abilities["Circle of Healing"].startCast(c)
                            casted = c.abilities["Prayer of Healing"].startCast(c)
                        }
                    }

                    if (!casted) {
                        let target = this.checkTargetsIfHealth(0.8, true)
                        if (target) {
                            for (let i = 0; i < target.length; i++) {
                                if (!this.checkBuff(c, target[i], "Renew")) {
                                    setTargetAi(c, target[i])
                                    casted = c.abilities["Renew"].startCast(c)
                                }
                            }
                        }
                    }

                    if (!casted) {
                        let target = this.checkTargetsIfHealth(0.3)
                        if (target) {
                            setTargetAi(c, target)
                            casted = c.abilities["Holy Word: Serenity"].startCast(c)
                        }
                    }

                    if (!casted) {
                        let target = this.checkTargetsIfHealth(0.4)
                        if (target) {
                            setTargetAi(c, target)
                            casted = c.abilities["Flash Heal"].startCast(c)
                        }
                    }

                    if (!casted) {
                        let target = this.checkTargetsIfHealth(0.6)
                        if (target) {
                            setTargetAi(c, target)
                            casted = c.abilities["Heal"].startCast(c)
                        }
                    }

                    if (!casted) {
                        if (this.getNumberOfEnemies(c,10)>2) {
                            casted = c.abilities["Holy Nova"].startCast(c)
                        } else {
                            c.direction = getDirection(c,c.targetObj)
                            let dist = getDistance(c,c.targetObj)
                            let distNeed = 4
                            if (dist>distNeed) {
                                c.move(1)
                            }
                        }
                    }

                    if (!casted) {
                        let target = this.getLowestHpEnemy()
                        setTargetAi(c, target)
                        c.direction = getDirection(c, c.targetObj)

                        if (!casted  && !this.checkDebuff(c, target, "Shadow Word: Pain")) {
                            casted = c.abilities["Shadow Word: Pain"].startCast(c)
                        }
                        if (!casted  && !this.checkDebuff(c, target, "Shadow Word: Pain")) {
                            casted = c.abilities["Shadow Word: Pain"].startCast(c)
                        }
                        if (!casted) {
                            casted = c.abilities["Holy Fire"].startCast(c)
                        }
                        if (!casted) {
                            casted = c.abilities["Holy Word: Chastise"].startCast(c)
                        }
                    }
                }
            }
        },
        "restorationDruid":() => { //--------------------------------------------------------------------------------------------------Resto Druid
            let c = this.creature
            c.direction = getDirection(c,enemies[0])
            let casted = false
            let raidAvgHealth = this.getRaidAvgHealth()

            if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
                if (!casted && raidAvgHealth<0.98) {
                    casted = c.abilities["Wild Growth"].startCast(c)
                }

                if (!casted) {
                    let target = this.checkTargetsIfHealth(0.8)
                    if (target && !this.checkBuff(c,target,"Rejuvenation")) {
                        setTargetAi(c,target)
                        casted = c.abilities["Rejuvenation"].startCast(c)
                    }
                }

                if (!casted) {
                    let target = this.checkTargetsIfHealth(0.5)
                    if (target) {
                        setTargetAi(c,target)
                        casted = c.abilities["Regrowth"].startCast(c)
                    }
                }
                if (!casted) {
                    let target = this.getLowestHpEnemy()
                    setTargetAi(c,target)
                    c.direction = getDirection(c,c.targetObj)

                    if (!this.checkDebuff(c,target,"Moonfire")) {
                        casted = c.abilities["Moonfire"].startCast(c)
                    }
                    if (!casted && !this.checkDebuff(c,target,"Sunfire")) {
                        casted = c.abilities["Sunfire"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Wrath"].startCast(c)
                    }
                }
            }
        },
        "balance":() => { //--------------------------------------------------------------------------------------------------Balance Druid
            let c = this.creature
            c.direction = getDirection(c,enemies[0])
            let casted = false

            if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
                if (!casted) {
                    let target = this.getLowestHpEnemy()
                    setTargetAi(c,target)
                    c.direction = getDirection(c,c.targetObj)


                    if (!casted) {
                        casted = c.abilities["Celestial Alignment"].startCast(c)
                    }

                    if (!casted && this.getNumberOfEnemies(c,40)>2) {
                        casted = c.abilities["Starfall"].startCast(c)
                    }

                    if (!casted && this.getNumberOfEnemies(c,40)<=2 ) {
                        casted = c.abilities["Starsurge"].startCast(c)
                    }

                    if (!casted && !this.checkDebuff(c,target,"Moonfire")) {
                        casted = c.abilities["Moonfire"].startCast(c)
                    }
                    if (!casted && !this.checkDebuff(c,target,"Sunfire")) {
                        casted = c.abilities["Sunfire"].startCast(c)
                    }

                    if (!casted && this.checkBuff(c,c,"Eclipse (Lunar)")) {
                        casted = c.abilities["Starfire"].startCast(c)
                    }

                    if (!casted && this.checkBuff(c,c,"Eclipse (Solar)")) {
                        casted = c.abilities["Wrath"].startCast(c)
                    }


                    if (!casted && c.abilities["Eclipse"].next==="solar") {
                        casted = c.abilities["Starfire"].startCast(c)
                    }

                    if (!casted && c.abilities["Eclipse"].next==="lunar") {
                        casted = c.abilities["Wrath"].startCast(c)
                    }

                    if (!casted && c.abilities["Eclipse"].next==="none") {
                        casted = c.abilities["Wrath"].startCast(c)
                    }
                }
            }
        },
        "assassination":() => { //--------------------------------------------------------------------------------------------------Assassination Rogue
            let c = this.creature
            let casted = false
            let target = this.getLowestHpEnemy()
            setTargetAi(c,target)
            c.direction = getDirection(c,c.targetObj)
            let dist = getDistance(c,c.targetObj)
            let distNeed = 4
            if (dist>distNeed) {
                c.move(1)
            } else {

                if (!casted && !this.checkBuff(c,c,"Deadly Poison")) {
                    casted = c.abilities["Deadly Poison"].startCast(c)
                }
                if (!casted && !this.checkBuff(c,c,"Slice And Dice") && c.secondaryResource>2) {
                    casted = c.abilities["Slice And Dice"].startCast(c)
                }
                if (!casted && !this.checkDebuff(c,target,"Garrote")) {
                    casted = c.abilities["Garrote"].startCast(c)
                }
                if (!casted && !this.checkDebuff(c,target,"Rupture") && c.secondaryResource>2) {
                    casted = c.abilities["Rupture"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Mutilate"].startCast(c)
                }
                if (!casted && c.secondaryResource>4) {
                    casted = c.abilities["Envenom"].startCast(c)
                }

            }

        },
        "havoc":() => { //--------------------------------------------------------------------------------------------------Havoc DH
            let c = this.creature
            let casted = false
            let target = this.getLowestHpEnemy()
            setTargetAi(c,target)
            c.direction = getDirection(c,c.targetObj)
            let dist = getDistance(c,c.targetObj)
            let distNeed = 4
            if (dist>distNeed) {
                c.move(1)
            } else {
                if (!casted) {
                    casted = c.abilities["Chaos Strike"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Demon's Bite"].startCast(c)
                }

            }

        },
        "fury":() => { //--------------------------------------------------------------------------------------------------Fury Warrior
            let c = this.creature
            let casted = false
            let target = this.getLowestHpEnemy()
            setTargetAi(c,target)
            c.direction = getDirection(c,c.targetObj)
            let dist = getDistance(c,c.targetObj)
            let distNeed = 4
            if (dist>distNeed) {
                c.abilities["Charge"].startCast(c)
                c.move(1)
            } else {
                if (!casted) {
                    casted = c.abilities["Execute"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Rampage"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Raging Blow"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Bloodthirst"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Whirlwind"].startCast(c)
                }
            }

        },
        "arcane":() => { //--------------------------------------------------------------------------------------------------arcane
            //no target
            if (Object.keys(this.creature.targetObj).length === 0)  {
                this.getNewTarget()
            } else {
                let b = this.creature
                this.creature.direction = getDirection(b,b.targetObj)

                let dist = getDistance(b,b.targetObj)
                let distNeed = 30
                if (dist>distNeed) {
                    b.move(1)
                } else {
                    for (let i = 0; i<enemyTargets.length; i++) {
                        if (this.creature.gcd<=0 && !enemyTargets[i].isDead) {
                            this.creature.targetObj = enemyTargets[i]
                            this.creature.castTarget = enemyTargets[i]
                            this.creature.target = enemyTargets[i].name
                            let casted = false
                            if (!casted && checkBuff(b,b,"Clearcasting(Mage)")) {
                                casted = this.creature.abilities["Arcane Missiles"].startCast(this.creature)
                            }
                            if (!casted && this.creature.energy<10) { //&& this.creature.secondaryResource>2 ???
                                this.creature.abilities["Arcane Barrage"].startCast(this.creature)
                            }
                            if (!casted) {
                                this.creature.abilities["Arcane Blast"].startCast(this.creature)
                            }
                        }
                    }

                    if (this.creature.gcd<=0) {

                    }
                }
            }
        },
        "bossTest":() => { //------------------------------------------------------------------------------------ boss test
            this.creature.abilities["Aoe Test"].startCast(this.creature)

            //no target
            if (Object.keys(this.creature.targetObj).length === 0)  {
                let newTarget = findNearestEnemy(this.creature)
                if (newTarget!==false) {
                    this.creature.targetObj = newTarget
                    this.creature.target = newTarget.name
                }
            } else {
                let b = this.creature
                for (let i = 0; i<b.aggro.length; i++) {
                    let currentAggro = b.aggro[b.targetObj.id2]
                    if (currentAggro===undefined) {
                        currentAggro = 0
                    }
                    if (b.targetObj.id2.isDead) {
                        b.aggro[b.targetObj.id2] = 0
                    }
                    if (currentAggro<b.aggro[i]) {
                        b.targetObj = friendlyTargets[i]
                        b.target = friendlyTargets[i].name
                        b.castTarget = friendlyTargets[i]
                    }
                }

                this.creature.direction = getDirection(b,b.targetObj)

                let dist = getDistance(b,b.targetObj)
                if (dist>4) {
                    b.move(1)
                } else {
                    if (b.gcd<=0) {
                        b.abilities["Big Dmg"].startCast(b)
                    }
                    if (b.gcd<=0) {
                        b.abilities["Big Rng Dmg"].startCast(b)
                    }
                }
            }
        }, "addTest":() => { //------------------------------------------------------------------------------------ add Test
            //no target
            if (Object.keys(this.creature.targetObj).length === 0)  {
                let newTarget = findNearestEnemy(this.creature)
                if (newTarget!==false) {
                    this.creature.targetObj = newTarget
                    this.creature.target = newTarget.name
                }
            } else {
                let b = this.creature
                for (let i = 0; i<b.aggro.length; i++) {
                    let currentAggro = b.aggro[b.targetObj.id2]
                    if (currentAggro===undefined) {
                        currentAggro = 0
                    }
                    if (b.targetObj.id2.isDead) {
                        b.aggro[b.targetObj.id2] = 0
                    }
                    if (currentAggro<b.aggro[i]) {
                        b.targetObj = friendlyTargets[i]
                        b.target = friendlyTargets[i].name
                        b.castTarget = friendlyTargets[i]
                    }
                }

                this.creature.direction = getDirection(b,b.targetObj)

                let dist = getDistance(b,b.targetObj)
                if (dist>4) {
                    b.move(1)
                } else {
                    //ABILITIES
                }
            }
        },
    }

    run() {
        if (this.ai[this.creature.spec]) { //---------------------------------------------------spec Ai
            this.ai[this.creature.spec]()
        } else {
            if (!this.creature.enemy) { //---------------------------------------------------friendly default
                //no target
                if (Object.keys(this.creature.targetObj).length === 0)  {
                    this.getNewTarget()
                } else {
                    let b = this.creature

                    this.creature.direction = getDirection(b,b.targetObj)

                    let dist = getDistance(b,b.targetObj)
                    let distNeed = 30
                    if (b.melee) {
                        distNeed = 4
                    }
                    if (dist>distNeed) {
                        b.move(1)
                    }
                }
            } else if (this.creature.enemy) {//---------------------------------------------------enemy default

            }
        }
    }

    getNumberOfEnemies(caster,range = 40) {
        let no = 0
        for (let i = 0; i<enemies.length; i++) {
            if (!enemies[i].isDead && getDistance(caster,enemies[i])<range) {
                no++
            }
        }
        return no
    }

    getNumberOfInjuredTargets() {
        let no = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                if (friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                    no++
                }
            }
        }
        return no
    }

    moveToSoak() {

    }

    dodgeDmgAreas() {

    }

    tryToMoveToHealAreas() {

    }


    moveCloserToEnemy() {

    }

    checkTargetsAggroTank(c) {
        let tauntThis = []
        for (let i = 0; i<enemies.length; i++) {
            let myAggro = enemies[i].aggro[c.id2]
            for (let j = 0; j < enemies[i].aggro.length; j++) {
                if (enemies[i].aggro[j]) {
                    if (enemies[i].aggro[j] > myAggro) {
                        if (friendlyTargets[j].role !== "tank") {
                            tauntThis.push(enemies[i])
                        }
                    }
                }
            }
        }
        return tauntThis
    }

    getLowestHpEnemy() {
        let e = []
        for (let i = 0; i<enemyTargets.length; i++) {
            if (!enemyTargets[i].isDead) {
                e.push(enemyTargets[i])
            }

        }
        e = e.sort((a, b) => a.health > b.health ? 1 : -1) //most injured targets
        return e[0]
    }

    checkTargetsIfHealth(val,array = false) {
        let t = []
        for (let i = 0; i < friendlyTargets.length; i++) {
            if ((friendlyTargets[i].health / friendlyTargets[i].maxHealth) < val && !friendlyTargets[i].isDead) {
                t.push(friendlyTargets[i])
            }
        }
        if (t.length>0) {
            t = t.sort((a, b) => a.health/a.maxHealth > b.health/b.maxHealth ? 1 : -1) //most injured targets
            if (array) {
                return t
            } else {
                return t[0]
            }

        } else {
            return false
        }

    }

    getRaidMissingHealth() {
        let missingHealth = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                missingHealth += friendlyTargets[i].maxHealth-friendlyTargets[i].health
            }
        }
        return missingHealth
    }

    getRaidAvgHealth() {
        let no = 0
        let health = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                no++
                health += friendlyTargets[i].health/friendlyTargets[i].maxHealth
            }
        }
        return (health/no)
    }

    getMostInjuredTarget() {
        let lowestVal = 1
        let id = false
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                if ((friendlyTargets[i].health/friendlyTargets[i].maxHealth)<lowestVal) {
                    lowestVal = (friendlyTargets[i].health/friendlyTargets[i].maxHealth)
                    id = i
                }
            }
        }
        return id
    }

    getManaTarget() {

    }

    checkBuff(caster,target,buffName) {
        if (target) {
            for (let i = 0; i<target.buffs.length; i++) {
                if (target.buffs[i].name===buffName && target.buffs[i].caster === caster) {
                    return true
                }
            }
        }
    }

    checkDebuff(caster,target,buffName) {
        if (target) {
            for (let i = 0; i<target.debuffs.length; i++) {
                if (target.debuffs[i].name===buffName && target.debuffs[i].caster === caster) {
                    return true
                }
            }
        }

    }

    countBuffs(caster,buffName) {
        let no = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                //TODO:CHECK BUFF
            }
        }
        return no
    }

    getNewTarget() {
        let newTarget = findNearestEnemy(this.creature)
        this.creature.targetObj = newTarget
        this.creature.target = newTarget.name
        this.creature.castTarget = newTarget.name
    }



}