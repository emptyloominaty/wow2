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
                if (c.gcd<=0 && !enemyTargets[i].isDead) {
                    c.targetObj = enemyTargets[i]
                    c.castTarget = enemyTargets[i]
                    c.target = enemyTargets[i].name
                    let casted = false
                    if (!casted && checkBuff(b,b,"Clearcasting(Mage)")) {
                        casted = c.abilities["Arcane Missiles"].startCast(c)
                    }
                    if (!casted && c.energy<10) { //&& c.secondaryResource>2 ???
                        c.abilities["Arcane Barrage"].startCast(c)
                    }
                    if (!casted) {
                        c.abilities["Arcane Blast"].startCast(c)
                    }
                }
            }

            if (c.gcd<=0) {

            }
        }
    }
}