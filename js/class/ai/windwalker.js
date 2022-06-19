let _ai_windwalker = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()
    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        if (dist>12) {
            c.abilities["Roll"].startCast(c)
        }
        c.move(1)
    } else {

        if (aiFunctions.getNumberOfEnemies(c,6)>2) {
            casted = c.abilities["Spinning Crane Kick"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Rising Sun Kick"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Blackout Kick"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Tiger Palm"].startCast(c)
        }

    }

}