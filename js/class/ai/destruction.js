let _ai_destruction = function(creature) {
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
                let casted = false

                if (c.gcd<=0 && !enemyTargets[i].isDead) {
                    c.targetObj = enemyTargets[i]
                    c.castTarget = enemyTargets[i]
                    c.target = enemyTargets[i].name

                    c.setMousePos(enemies[0].x,enemies[0].y)
                    if (!casted) {
                        casted = c.abilities["Summon Infernal"].startCast(c)
                    }
                    /*if (!casted) {
                        casted = c.abilities["Cataclysm"].startCast(c)
                    }*/
                    if (!casted && !checkDebuff(c,c.castTarget,"Immolate")) {
                        casted = c.abilities["Immolate"].startCast(c)
                    }
                    if (!casted && c.secondaryResource>4.5) {
                        casted = c.abilities["Chaos Bolt"].startCast(c)
                    }
                    if (!casted && c.abilities["Conflagrate"].charges>1) {
                        casted = c.abilities["Conflagrate"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Chaos Bolt"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Conflagrate"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Incinerate"].startCast(c)
                    }
                    break
                }
            }

            if (c.gcd<=0) {

            }
        }
    }
}