let _ai_restorationShaman = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false
    let raidAvgHealth = aiFunctions.getRaidAvgHealth()

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {

        if (!casted && raidAvgHealth<0.8) {
            casted = c.abilities["Healing Tide Totem"].startCast(c)
        }

        if (!casted && raidAvgHealth<0.98) {
            c.setMousePos(enemies[0].x,enemies[0].y) //TODO
            casted = c.abilities["Healing Rain"].startCast(c)
        }

        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.95,true)
            if (target) {
                for (let i = 0; i<target.length; i++) {
                    if (!aiFunctions.checkBuff(c,target[i],"Riptide")) {
                        setTargetAi(c,target[i])
                        casted = c.abilities["Riptide"].startCast(c)
                    }
                }
            }
        }

        if (!casted) {
            let target = aiFunctions.checkTargetsIfHealth(0.5)
            if (target) {
                setTargetAi(c,target)
                casted = c.abilities["Healing Surge"].startCast(c)
            }
        }
        if (!casted) {
            let target = aiFunctions.getLowestHpEnemy()
            setTargetAi(c,target)
            c.direction = getDirection(c,c.targetObj)

            if (!casted && aiFunctions.getNumberOfEnemies(c,40)>=2 ) {
                casted = c.abilities["Chain Lightning"].startCast(c)
            }

            if (!aiFunctions.checkDebuff(c,target,"Flame Shock")) {
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

}