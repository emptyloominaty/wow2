let _ai_arms = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()
    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        c.abilities["Charge"].startCast(c)
        c.move(1)
    } else {
        if (!casted) {
            casted = c.abilities["Avatar"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Bladestorm "].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Execute"].startCast(c)
        }
        if (!casted && !aiFunctions.checkDebuff(c,target,"Rend")) {
            casted = c.abilities["Rend"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Overpower"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Warbreaker"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Mortal Strike"].startCast(c)
        }
        if (!casted && aiFunctions.getNumberOfEnemies(c,8)>1) {
            casted = c.abilities["Whirlwind"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Slam"].startCast(c)
        }

    }
}