let _ai_havoc = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()
    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        if (!casted && dist>15) {
            casted = c.abilities["Fel Rush"].startCast(c)
        }
        c.move(1)
    } else {

        if (!casted) {
            c.setMousePos(enemies[0].x,enemies[0].y)
            casted = c.abilities["Metamorphosis"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Eye Beam"].startCast(c)
        }

        if (aiFunctions.getNumberOfEnemies(c,8)>0) {
            casted = c.abilities["Immolation Aura"].startCast(c)
        }

        if (aiFunctions.getNumberOfEnemies(c,8)>4) {
            casted = c.abilities["Blade Dance"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Chaos Strike"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Demon's Bite"].startCast(c)
        }

    }

}