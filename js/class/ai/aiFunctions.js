let aiFunctions = {
    "getNumberOfEnemies": function(caster,range = 40) {
        let no = 0
        for (let i = 0; i<enemies.length; i++) {
            if (!enemies[i].isDead && getDistance(caster,enemies[i])<range) {
                no++
            }
        }
        return no
    },
    "getNumberOfInjuredTargets": function() {
        let no = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                if (friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                    no++
                }
            }
        }
        return no
    },
    "moveToSoak": function() {

    },
    "dodgeDmgAreas": function() {

    },
    "tryToMoveToHealAreas": function() {

    },
    "moveCloserToEnemy": function() {

    },
    "checkTargetsAggroTank": function(c) {
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
    },
    "getLowestHpEnemy": function() {
        let e = []
        for (let i = 0; i<enemyTargets.length; i++) {
            if (!enemyTargets[i].isDead) {
                e.push(enemyTargets[i])
            }
        }
        e = e.sort((a, b) => a.health > b.health ? 1 : -1) //most injured targets
        return e[0]
    },
    "checkTargetsIfHealth": function(val,array = false) {
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
    },
    "getRaidMissingHealth": function() {
        let missingHealth = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                missingHealth += friendlyTargets[i].maxHealth-friendlyTargets[i].health
            }
        }
        return missingHealth
    },
    "getRaidAvgHealth": function() {
        let no = 0
        let health = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                no++
                health += friendlyTargets[i].health/friendlyTargets[i].maxHealth
            }
        }
        return (health/no)
    },
    "getMostInjuredTarget": function() {
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
    },
    "getManaTarget": function() {

    },
    "checkBuff": function(caster,target,buffName) {
        if (target) {
            for (let i = 0; i<target.buffs.length; i++) {
                if (target.buffs[i].name===buffName && target.buffs[i].caster === caster) {
                    return true
                }
            }
        }
    },
    "checkDebuff": function(caster,target,buffName) {
        if (target) {
            for (let i = 0; i<target.debuffs.length; i++) {
                if (target.debuffs[i].name===buffName && target.debuffs[i].caster === caster) {
                    return true
                }
            }
        }
    },
    "countBuffs": function(caster,buffName) {
        let no = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[i].isDead) {
                //TODO:CHECK BUFF
            }
        }
        return no
    },
    "getNewTarget": function(creature) {
        let newTarget = findNearestEnemy(creature)
        creature.targetObj = newTarget
        creature.target = newTarget.name
        creature.castTarget = newTarget.name
    }
}