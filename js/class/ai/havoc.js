let _ai_havoc = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()
    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        c.move(1)
    } else {
        if (!casted) {
            casted = c.abilities["Chaos Strike"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Demon's Bite"].startCast(c)
        }

    }

}