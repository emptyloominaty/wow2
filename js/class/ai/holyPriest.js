let _ai_holyPriest = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false
    let raidAvgHealth = aiFunctions.getRaidAvgHealth()

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
                let target = aiFunctions.checkTargetsIfHealth(0.9)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Circle of Healing"].startCast(c)
                    casted = c.abilities["Prayer of Healing"].startCast(c)
                }
            }

            if (!casted) {
                let target = aiFunctions.checkTargetsIfHealth(0.8, true)
                if (target) {
                    for (let i = 0; i < target.length; i++) {
                        if (!aiFunctions.checkBuff(c, target[i], "Renew")) {
                            setTargetAi(c, target[i])
                            casted = c.abilities["Renew"].startCast(c)
                        }
                    }
                }
            }

            if (!casted) {
                let target = aiFunctions.checkTargetsIfHealth(0.3)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Holy Word: Serenity"].startCast(c)
                }
            }

            if (!casted) {
                let target = aiFunctions.checkTargetsIfHealth(0.4)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Flash Heal"].startCast(c)
                }
            }

            if (!casted) {
                let target = aiFunctions.checkTargetsIfHealth(0.6)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Heal"].startCast(c)
                }
            }

            if (!casted) {
                if (aiFunctions.getNumberOfEnemies(c,10)>2) {
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
                let target = aiFunctions.getLowestHpEnemy()
                setTargetAi(c, target)
                c.direction = getDirection(c, c.targetObj)

                if (!casted  && !aiFunctions.checkDebuff(c, target, "Shadow Word: Pain")) {
                    casted = c.abilities["Shadow Word: Pain"].startCast(c)
                }
                if (!casted  && !aiFunctions.checkDebuff(c, target, "Shadow Word: Pain")) {
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
}