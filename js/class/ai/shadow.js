let _ai_shadow = function(creature) {
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
                if (!casted && checkBuff(b,b,"Dark Thought")) {
                    casted = c.abilities["Mind Blast"].startCast(c)
                }
                if (c.gcd<=0 && !enemyTargets[i].isDead) {
                    c.targetObj = enemyTargets[i]
                    c.castTarget = enemyTargets[i]
                    c.target = enemyTargets[i].name


                    if (!casted && !checkDebuff(c,c.castTarget,"Vampiric Touch")) {
                        casted = c.abilities["Vampiric Touch"].startCast(c)
                    }
                    if (!casted && !checkDebuff(c,c.castTarget,"Shadow Word: Pain")) {
                        casted = c.abilities["Shadow Word: Pain"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Shadowfiend"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Mindbender"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Void Bolt"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Mind Blast"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Devouring Plague"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Power Infusion"].startCast(c)
                    }
                    if (!casted) {
                        casted = c.abilities["Void Eruption"].startCast(c)
                    }

                    if (!casted && !c.isChanneling) {
                        c.abilities["Mind Flay"].startCast(c)
                    }
                    break
                }
            }

            if (c.gcd<=0) {

            }
        }
    }
}