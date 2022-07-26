let _ai_feral = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()

    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        casted = c.abilities["Dash"].startCast(c)
        c.move(1)
    } else {


        if (!casted) {
            casted = c.abilities["Rake"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Berserk"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Tiger's Fury"].startCast(c)
        }

        if (!casted && aiFunctions.getNumberOfEnemies(c,8)>2) {
            casted = c.abilities["Swipe"].startCast(c)
        }

        if (!casted && aiFunctions.getNumberOfEnemies(c,8)>2) {
            casted = c.abilities["Thrash"].startCast(c)
        }

        if (!casted && !aiFunctions.checkDebuff(c,target,"Rip") && c.secondaryResource>4) {
            casted = c.abilities["Rip"].startCast(c)
        }

        if (!casted && c.secondaryResource>4) {
            casted = c.abilities["Ferocious Bite"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Shred"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Thrash"].startCast(c)
        }


    }

}