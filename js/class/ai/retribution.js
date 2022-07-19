let _ai_retribution = function(creature) {
    let c = creature
    let casted = false
    let raidAvgHealth = aiFunctions.getRaidAvgHealth()

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {

        if (!casted && raidAvgHealth < 0.85) {
            casted = c.abilities["Avenging Wrath"].startCast(c)
        }



        let target = aiFunctions.getLowestHpEnemy()
        setTargetAi(c, target)
        c.direction = getDirection(c, c.targetObj)
        let dist = getDistance(c, c.targetObj)
        let distNeed = 4
        if (dist > distNeed) {
            if (dist > 10) {
                c.abilities["Divine Steed"].startCast(c)
            }
            c.move(1)
        } else {

            if (!casted && aiFunctions.getNumberOfEnemies(c, 8) > 0) {
                casted = c.abilities["Final Reckoning"].startCast(c)
            }

            if (!casted && aiFunctions.getNumberOfEnemies(c, 8) > 1) {
                casted = c.abilities["Divine Storm"].startCast(c)
            }
            if (!casted && aiFunctions.getNumberOfEnemies(c, 8) > 2) {
                casted = c.abilities["Consecration"].startCast(c)
            }
            if (!casted && c.secondaryResource>=5) {
                casted = c.abilities["Templar's Verdict"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Wake of Ashes"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Blade of Justice"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Hammer of Wrath"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Templar's Verdict"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Judgment"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Crusader Strike"].startCast(c)
            }
            if (!casted && aiFunctions.getNumberOfEnemies(c, 8) > 0) {
                casted = c.abilities["Consecration"].startCast(c)
            }


        }
    }

}