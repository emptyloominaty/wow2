class Ai {

    constructor(creature) {
        this.creature = creature
    }

    ai = {
        "windwalker": () => {//--------------------------------------------------------------------------------------------------Windwalker
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
                } else {
                    if (b.melee) {
                        b.abilities["Auto Attack"].startCast(b)
                    }
                    for (let i = 0; i<enemyTargets.length; i++) {
                        if (this.creature.gcd<=0) {
                            this.creature.targetObj = enemyTargets[i]
                            this.creature.castTarget = enemyTargets[i]
                            this.creature.target = enemyTargets[i].name

                            if (this.creature.secondaryResource<2) {
                                this.creature.abilities["Tiger Palm"].startCast(this.creature)
                            } else {
                                this.creature.abilities["Rising Sun Kick"].startCast(this.creature)
                                this.creature.abilities["Blackout Kick"].startCast(this.creature)
                            }
                        }
                    }

                    if (this.creature.gcd<=0) {

                    }
                }
            }

        },
        "brewmaster":() => {//--------------------------------------------------------------------------------------------------Brewmaster
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
                } else {
                    if (b.melee) {
                        b.abilities["Auto Attack"].startCast(b)
                    }
                    for (let i = 0; i<enemyTargets.length; i++) {
                        if (this.creature.gcd<=0) {
                            this.creature.targetObj = enemyTargets[i]
                            this.creature.castTarget = enemyTargets[i]
                            this.creature.target = enemyTargets[i].name
                            this.creature.abilities["Blackout Kick"].startCast(this.creature)
                            this.creature.abilities["Tiger Palm"].startCast(this.creature)
                        }
                    }

                    if (this.creature.gcd<=0) {

                    }
                }
            }
        },
        "mistweaver":() => {//--------------------------------------------------------------------------------------------------TODO:Mistweaver

        },
        "restorationShaman":() => { //--------------------------------------------------------------------------------------------------Resto Sham
            let casted = false
            for (let i = 0; i<friendlyTargets.length; i++) {
                if ((friendlyTargets[i].health/friendlyTargets[i].maxHealth)<0.5 && !friendlyTargets[i].isDead) {
                    if (this.creature.gcd<=0) {
                        this.creature.targetObj = friendlyTargets[i]
                        this.creature.castTarget = friendlyTargets[i]
                        this.creature.target = friendlyTargets[i].name
                        this.creature.abilities["Healing Surge"].startCast(this.creature)
                        casted = true
                    }
                }
            }
            if (!casted) {
                for (let i = 0; i<enemyTargets.length; i++) {
                    if (this.creature.gcd<=0) {
                        this.creature.targetObj = enemyTargets[i]
                        this.creature.castTarget = enemyTargets[i]
                        this.creature.target = enemyTargets[i].name
                        this.creature.direction = getDirection(this.creature.targetObj,this.creature.targetObj.targetObj)
                        let castFlameShock = true
                        for (let i = 0; i<this.creature.targetObj.debuffs.length; i++) {
                            if (this.creature.targetObj.debuffs[i].name==="Flame Shock" && this.creature.targetObj.debuffs[i].caster === this.creature) {
                                castFlameShock = false
                            }
                        }
                        if (castFlameShock) {
                            this.creature.abilities["Flame Shock"].startCast(this.creature)
                        }
                        this.creature.abilities["Lava Burst"].startCast(this.creature)
                        this.creature.abilities["Lightning Bolt"].startCast(this.creature)
                    }
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
                    if (b.melee) {
                        b.abilities["Auto Attack"].startCast(b)
                    }
                    for (let i = 0; i<enemyTargets.length; i++) {
                        if (this.creature.gcd<=0) {
                            this.creature.targetObj = enemyTargets[i]
                            this.creature.castTarget = enemyTargets[i]
                            this.creature.target = enemyTargets[i].name
                            if (this.creature.energy<20) {
                                this.creature.abilities["Arcane Barrage"].startCast(this.creature)
                            }
                            this.creature.abilities["Arcane Blast"].startCast(this.creature)
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
                    b.abilities["Auto Attack"].startCast(b)
                    if (b.gcd<=0) {
                        b.abilities["Big Dmg"].startCast(b)
                    }
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
                    } else {
                        if (b.melee || b.class === "Hunter") {
                            b.abilities["Auto Attack"].startCast(b)
                        }
                    }
                }
            } else if (this.creature.enemy) {//---------------------------------------------------enemy default

            }
        }
    }

    getNewTarget() {
        let newTarget = findNearestEnemy(this.creature)
        this.creature.targetObj = newTarget
        this.creature.target = newTarget.name
        this.creature.castTarget = newTarget.name
    }



}