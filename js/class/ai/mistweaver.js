let _ai_mistweaver = function(creature) {
    let c = creature
    let casted = false
    let raidAvgHealth = aiFunctions.getRaidAvgHealth()

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {

        if (!casted && raidAvgHealth < 0.75) {
            casted = c.abilities["Revival"].startCast(c)
        }

        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.95,true)
            if (target) {
                for (let i = 0; i<target.length; i++) {
                    if (!aiFunctions.checkBuff(c,target[i],"Renewing Mist")) {
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
            let target = aiFunctions.checkTargetsIfHealth(0.5)
            if (target) {
                setTargetAi(c,target)
                casted = c.abilities["Vivify"].startCast(c)
            }
        }
        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.3)
            if (target) {
                if (!aiFunctions.checkBuff(c,target,"Enveloping Mist")) {
                    setTargetAi(c,target)
                    casted = c.abilities["Enveloping Mist"].startCast(c)
                }
            }
        }

        let target = aiFunctions.getLowestHpEnemy()
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

            if (aiFunctions.getNumberOfEnemies(c, 6) > 2) {
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

}