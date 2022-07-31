let _ai_fire = function(creature) {
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

                c.abilities["Fire Blast"].startCast(c)

                if (c.gcd<=0 && !enemyTargets[i].isDead && !c.isChanneling) {
                    c.targetObj = enemyTargets[i]
                    c.castTarget = enemyTargets[i]
                    c.target = enemyTargets[i].name
                    let casted = false

                    if (!casted) {
                        casted = c.abilities["Combustion"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Rune of Power"].startCast(c)
                    }
                    if (!casted && checkBuff(b,b,"Hot Streak")) {
                        casted = c.abilities["Pyroblast"].startCast(c)
                    }
                    if (!casted && c.castTarget.health/c.castTarget.maxHealth<0.35 && checkBuff(b,b,"Heating Up")) {
                        c.abilities["Scorch"].startCast(c)
                    }
                    if (!casted && checkBuff(b,b,"Pyroclasm")) {
                        casted = c.abilities["Pyroblast"].startCast(c)
                    }
                    if (!casted) {
                        c.abilities["Fireball"].startCast(c)
                    }
                    break
                }
            }

            if (c.gcd<=0) {

            }
        }
    }
}