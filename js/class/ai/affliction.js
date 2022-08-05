let _ai_affliction = function(creature) {
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
                    /*if (!casted) {
                        casted = c.abilities["Dark Soul: Instability"].startCast(c)
                    }*/

                    if (!casted && (!checkDebuff(c,c.castTarget,"Agony") || returnDebuffDuration(c,c.castTarget,"Agony")<4)) {
                        casted = c.abilities["Agony"].startCast(c)
                    }
                    if (!casted && !checkDebuff(c,c.castTarget,"Corruption")) {
                        casted = c.abilities["Corruption"].startCast(c)
                    }
                    if (!casted && (!checkDebuff(c,c.castTarget,"Unstable Affliction") || returnDebuffStacks(c,c.castTarget,"Unstable Affliction")<4) || returnDebuffDuration(c,c.castTarget,"Unstable Affliction")<4) {
                        casted = c.abilities["Unstable Affliction"].startCast(c)
                    }
                    if (!casted && c.secondaryResource>4.5) {
                        casted = c.abilities["Malefic Rapture"].startCast(c)
                    }
                    if (!casted && !checkDebuff(c,c.castTarget,"Phantom Singularity")) {
                        casted = c.abilities["Phantom Singularity"].startCast(c)
                    }
                    if (!casted && !checkDebuff(c,c.castTarget,"Siphon Life")) {
                        casted = c.abilities["Siphon Life"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Summon Darkglare"].startCast(c)
                    }
                    if (!casted && checkDebuff(c,c.castTarget,"Unstable Affliction") && checkDebuff(c,c.castTarget,"Corruption") && checkDebuff(c,c.castTarget,"Agony")) {
                        casted = c.abilities["Malefic Rapture"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Shadow Bolt"].startCast(c)
                    }
                    break
                }
            }

            if (c.gcd<=0) {

            }
        }
    }
}