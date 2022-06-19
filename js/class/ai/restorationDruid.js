let _ai_restorationDruid = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false
    let raidAvgHealth = aiFunctions.getRaidAvgHealth()

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
        if (!casted && raidAvgHealth<0.98) {
            casted = c.abilities["Wild Growth"].startCast(c)
        }

        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.8)
            if (target && !aiFunctions.checkBuff(c,target,"Rejuvenation")) {
                setTargetAi(c,target)
                casted = c.abilities["Rejuvenation"].startCast(c)
            }
        }

        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.5)
            if (target) {
                setTargetAi(c,target)
                casted = c.abilities["Regrowth"].startCast(c)
            }
        }
        if (!casted) {
            let target = aiFunctions.getLowestHpEnemy()
            setTargetAi(c,target)
            c.direction = getDirection(c,c.targetObj)

            if (!aiFunctions.checkDebuff(c,target,"Moonfire")) {
                casted = c.abilities["Moonfire"].startCast(c)
            }
            if (!casted && !aiFunctions.checkDebuff(c,target,"Sunfire")) {
                casted = c.abilities["Sunfire"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Wrath"].startCast(c)
            }
        }
    }
}