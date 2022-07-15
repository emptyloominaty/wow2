let _ai_holyPaladin = function(creature) {
    let c = creature
    let casted = false
    let raidAvgHealth = aiFunctions.getRaidAvgHealth()

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {

        if (!casted) {
            if (!checkBuff(c,friendlyTargets[15],"Beacon of Light")) { //TODO: tank beacon
                setTargetAi(c,friendlyTargets[15])
                casted = c.abilities["Beacon of Light"].startCast(c)
            }
        }

        if (!casted && raidAvgHealth < 0.85) {
            casted = c.abilities["Avenging Wrath"].startCast(c)
        }

        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.9,true)
            if (target) {
                for (let i = 0; i<target.length; i++) {
                    if (!aiFunctions.checkBuff(c,target[i],"Glimmer of Light")) {
                        setTargetAi(c,target[i])
                        casted = c.abilities["Holy Shock"].startCast(c)
                    }
                }
            }
        }

        if (!casted && raidAvgHealth < 0.9) {
            casted = c.abilities["Light of Dawn"].startCast(c)
        }


        if (!casted && c.secondaryResource>4) {
            let target = aiFunctions.checkTargetsIfHealth(0.87)
            if (target) {
                setTargetAi(c,target)
                casted = c.abilities["Word of Glory"].startCast(c)
            }
        }

        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.5)
            if (target) {
                setTargetAi(c,target)
                casted = c.abilities["Flash of Light"].startCast(c)
            }
        }

        let target = aiFunctions.getLowestHpEnemy()
        setTargetAi(c, target)
        c.direction = getDirection(c, c.targetObj)
        let dist = getDistance(c, c.targetObj)
        let distNeed = 4
        if (dist > distNeed) {
            if (dist > 12) {
                c.abilities["Divine Steed"].startCast(c)
            }
            c.move(1)
        } else {

            if (aiFunctions.getNumberOfEnemies(c, 8) > 0) {
                casted = c.abilities["Consecration"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Hammer of Wrath"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Judgment"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Crusader Strike"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Holy Shock"].startCast(c)
            }


        }
    }

}