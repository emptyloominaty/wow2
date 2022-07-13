let _ai_discipline = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false
    let raidAvgHealth = aiFunctions.getRaidAvgHealth()

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
        let atonements = 0
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (checkBuff(c,c,"Atonement")) {
                atonements ++
            }
        }

        if (!casted && raidAvgHealth < 0.8 && atonements>10) {
            casted = c.abilities["Evangelism"].startCast(c)
        }

        if (!checkBuff(c,c,"Evangelism") && atonements<11) {

            if (!casted) {
                let target = aiFunctions.checkTargetsIfHealth(0.3)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Pain Suppression"].startCast(c)
                }
            }

            if (!casted) {
                let target = aiFunctions.checkTargetsIfHealth(0.5)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Power Word: Shield"].startCast(c)
                }
            }

            if (!casted && raidAvgHealth < 0.9) {
                let target = aiFunctions.checkTargetsIfHealth(0.9)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Power Word: Radiance"].startCast(c)
                }
            }

            if (!casted) {
                let target = aiFunctions.checkTargetsIfHealth(0.8)
                if (target) {
                    setTargetAi(c, target)
                    casted = c.abilities["Shadow Mend"].startCast(c)
                }
            }
            let target = aiFunctions.getLowestHpEnemy()
            setTargetAi(c, target)
            c.direction = getDirection(c, c.targetObj)


            if (!casted && !aiFunctions.checkDebuff(c, target, "Shadow Word: Pain")) {
                casted = c.abilities["Shadow Word: Pain"].startCast(c)
            }
            if (!casted) {
                if (aiFunctions.getNumberOfEnemies(c, 10) > 2) {
                    casted = c.abilities["Holy Nova"].startCast(c)
                } else {
                    c.direction = getDirection(c, c.targetObj)
                    let dist = getDistance(c, c.targetObj)
                    let distNeed = 4
                    if (dist > distNeed) {
                        c.move(1)
                    }
                }
            }

            if (!casted) {
                casted = c.abilities["Mind Blast"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Penance"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Smite"].startCast(c)
            }


        } else {
            let target = aiFunctions.getLowestHpEnemy()
            setTargetAi(c, target)
            c.direction = getDirection(c, c.targetObj)

            if (!casted) {
                casted = c.abilities["Shadowfiend"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Schism"].startCast(c)
            }

            if (!casted && !aiFunctions.checkDebuff(c, target, "Shadow Word: Pain")) {
                casted = c.abilities["Shadow Word: Pain"].startCast(c)
            }
            if (!casted) {
                if (aiFunctions.getNumberOfEnemies(c, 10) > 2) {
                    casted = c.abilities["Holy Nova"].startCast(c)
                } else {
                    c.direction = getDirection(c, c.targetObj)
                    let dist = getDistance(c, c.targetObj)
                    let distNeed = 4
                    if (dist > distNeed) {
                        c.move(1)
                    }
                }
            }

            if (!casted) {
                casted = c.abilities["Mind Blast"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Penance"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Power Word: Solace"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Smite"].startCast(c)
            }
        }
    }
}