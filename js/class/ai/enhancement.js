let _ai_enhancement = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false
    let dist = getDistance(c,enemies[0])
    let distNeed = 4
    if (dist>distNeed) {
        if (dist>8) {
            c.abilities["Spirit Walk"].startCast(c)
        }
        c.move(1)
    } else {
        if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
            if (!casted) {
                let target = aiFunctions.getLowestHpEnemy()
                setTargetAi(c, target)
                c.direction = getDirection(c, c.targetObj)

                if (!casted) {
                    casted = c.abilities["Feral Spirit"].startCast(c)
                }

                if (!casted && !checkBuff(c, c, "Windfury Totem")) {
                    casted = c.abilities["Windfury Totem"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Sundering"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Lava Lash"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Elemental Blast"].startCast(c)
                }
                if (!casted) {
                    casted = c.abilities["Stormstrike"].startCast(c)
                }

                if (!casted && aiFunctions.getNumberOfEnemies(c, 40) >= 2) {
                    casted = c.abilities["Chain Lightning"].startCast(c)
                }
                if (!aiFunctions.checkDebuff(c, target, "Flame Shock")) {
                    casted = c.abilities["Flame Shock"].startCast(c)
                }

                if (!casted) {
                    casted = c.abilities["Frost Shock"].startCast(c)
                }

                if (!casted) {
                    casted = c.abilities["Lightning Bolt"].startCast(c)
                }
            }
        }
    }
}