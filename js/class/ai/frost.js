let _ai_frost = function(creature) {
    let c = creature
    //no target
    if (Object.keys(c.targetObj).length === 0)  {
        aiFunctions.getNewTarget(creature)
    } else {
        let b = c
        c.direction = getDirection(b,b.targetObj)

        let dist = getDistance(b,b.targetObj)
        let distNeed = 30
        if (dist>distNeed) {
            b.move(1)
        } else {
            for (let i = 0; i<enemyTargets.length; i++) {
                if (c.gcd<=0 && !enemyTargets[i].isDead && !c.isChanneling) {
                    c.targetObj = enemyTargets[i]
                    c.castTarget = enemyTargets[i]
                    c.target = enemyTargets[i].name
                    let casted = false

                    if (!casted) {
                        casted = c.abilities["Icy Veins"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Rune of Power"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Frozen Orb"].startCast(c)
                    }

                    if (!casted && checkBuff(b,b,"Brain Freeze")) {
                        casted = c.abilities["Flurry"].startCast(c)
                    }

                    if (!casted && ((checkDebuff(b,enemyTargets[i],"Winter's Chill") && c.abilities["Icicles"].icicles>4 ) || checkBuff(b,b,"Fingers of Frost"))) {
                        casted = c.abilities["Ice Lance"].startCast(c)
                    }

                    if (!casted && checkDebuff(b,enemyTargets[i],"Winter's Chill")) {
                        casted = c.abilities["Ice Lance"].startCast(c)
                    }

                    if (!casted) {
                        c.abilities["Frostbolt"].startCast(c)
                    }
                    break
                }
            }

            if (c.gcd<=0) {

            }
        }
    }
}