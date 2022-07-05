let _ai_elemental = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
        if (!casted) {
            let target = aiFunctions.getLowestHpEnemy()
            setTargetAi(c, target)
            c.direction = getDirection(c, c.targetObj)

            if (!casted) {
                casted = c.abilities["Fire Elemental"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Stormkeeper"].startCast(c)
            }

            if (!casted && aiFunctions.getNumberOfEnemies(c,40)>=2 ) {
                c.setMousePos(enemies[0].x,enemies[0].y)
                casted = c.abilities["Earthquake"].startCast(c)
            }

            if (!casted) {
                casted = c.abilities["Earth Shock"].startCast(c)
            }

            if (!casted && aiFunctions.getNumberOfEnemies(c,40)>=2 ) {
                casted = c.abilities["Chain Lightning"].startCast(c)
            }

            if (!aiFunctions.checkDebuff(c, target, "Flame Shock")) {
                casted = c.abilities["Flame Shock"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Lava Burst"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Lightning Bolt"].startCast(c)
            }
        }
    }
}