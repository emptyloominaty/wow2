let _ai_arcane = function(creature) {
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

                    if (!casted && c.energy<20) {
                        casted = c.abilities["Evocation"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Rune of Power"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Touch of the Magi"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Presence of Mind"].startCast(c)
                    }
                    if (!casted && !checkBuff(c,c,"Arcane Power")) {
                        casted = c.abilities["Arcane Power"].startCast(c)
                    }
                    if (!casted && checkBuff(b,b,"Clearcasting ")) {
                        casted = c.abilities["Arcane Missiles"].startCast(c)
                    }
                    if (!casted && c.energy<15) { //&& c.secondaryResource>2 ???
                        c.abilities["Arcane Barrage"].startCast(c)
                    }
                    if (!casted) {
                        c.abilities["Arcane Blast"].startCast(c)
                    }
                    break
                }
            }

            if (c.gcd<=0) {

            }
        }
    }
}