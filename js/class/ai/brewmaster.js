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

            if (c.secondaryResource>c.maxHealth*0.3 && c.abilities["Purifying Brew"].charges>1) {
                casted = c.abilities["Purifying Brew"].startCast(c)
            }

            if (c.secondaryResource>c.maxHealth*0.6) {
                casted = c.abilities["Purifying Brew"].startCast(c)
            }

            if (0.8>c.health/c.maxHealth) {
                casted = c.abilities["Celestial Brew"].startCast(c)
            }

            if (0.5>c.health/c.maxHealth) {
                casted = c.abilities["Fortifying Brew"].startCast(c)
            }

            if (0.7>c.health/c.maxHealth) {
                casted = c.abilities["Expel Harm"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Keg Smash"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Touch of Death"].startCast(c)
            }

            if (!casted && aiFunctions.getNumberOfEnemies(c,6)>1) {
                casted = c.abilities["Spinning Crane Kick"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Blackout Kick"].startCast(c)
            }
            if (!casted && c.energy>40) {
                casted = c.abilities["Tiger Palm"].startCast(c)
            }
        }
}