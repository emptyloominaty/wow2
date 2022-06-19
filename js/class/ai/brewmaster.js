let _ai_brewmaster = function(creature) {
        let c = creature
        let casted = false
        let target = aiFunctions.getLowestHpEnemy()
        setTargetAi(c,target)

        if (combatTime<7) { //TODO:?
            c.abilities["Provoke"].startCast(c)
        }
        let tauntTargets = aiFunctions.checkTargetsAggroTank(c)
        if (tauntTargets.length>0) {
            setTargetAi(c,tauntTargets[0])
            c.abilities["Provoke"].startCast(c)
        }

        c.direction = getDirection(c,c.targetObj)
        let dist = getDistance(c,c.targetObj)
        let distNeed = 4
        if (dist>distNeed) {
            c.move(1)
        } else {

            if (aiFunctions.getNumberOfEnemies(c,6)>1) {
                casted = c.abilities["Spinning Crane Kick"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Blackout Kick"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Tiger Palm"].startCast(c)
            }
        }
}