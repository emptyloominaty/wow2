let _ai_marksmanship = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
        if (!casted) {
            let target = aiFunctions.getLowestHpEnemy()
            setTargetAi(c, target)
            c.direction = getDirection(c, c.targetObj)

            c.setMousePos(enemies[0].x,enemies[0].y)
            if (!casted) {
                casted = c.abilities["Double Tap"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Volley"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Trueshot"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Rapid Fire"].startCast(c)
            }
            if (!casted && aiFunctions.getNumberOfEnemies(c,40)>=2 ) {
                casted = c.abilities["Multi-Shot"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Kill Shot"].startCast(c)
            }
            if (!casted && checkBuff(c,c,"Precise Shots")) {
                casted = c.abilities["Arcane Shot"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Aimed Shot"].startCast(c)
            }
            if (!casted && c.energy>80) {
                casted = c.abilities["Arcane Shot"].startCast(c)
            }
            if (!casted) {
                casted = c.abilities["Steady Shot"].startCast(c)
            }
        }
    }
}