let _ai_balance = function(creature) {
    let c = creature
    c.direction = getDirection(c,enemies[0])
    let casted = false

    if (!c.isCasting && !c.isChanneling && c.gcd<=0) {
        if (!casted) {
            let target = aiFunctions.getLowestHpEnemy()
            setTargetAi(c,target)
            c.direction = getDirection(c,c.targetObj)


            if (!casted) {
                casted = c.abilities["Celestial Alignment"].startCast(c)
            }

            if (!casted && aiFunctions.getNumberOfEnemies(c,40)>2) {
                casted = c.abilities["Starfall"].startCast(c)
            }

            if (!casted && aiFunctions.getNumberOfEnemies(c,40)<=2 ) {
                casted = c.abilities["Starsurge"].startCast(c)
            }

            if (!casted && !aiFunctions.checkDebuff(c,target,"Moonfire")) {
                casted = c.abilities["Moonfire"].startCast(c)
            }
            if (!casted && !aiFunctions.checkDebuff(c,target,"Sunfire")) {
                casted = c.abilities["Sunfire"].startCast(c)
            }

            if (!casted && aiFunctions.checkBuff(c,c,"Eclipse (Lunar)")) {
                casted = c.abilities["Starfire"].startCast(c)
            }

            if (!casted && aiFunctions.checkBuff(c,c,"Eclipse (Solar)")) {
                casted = c.abilities["Wrath"].startCast(c)
            }


            if (!casted && c.abilities["Eclipse"].next==="solar") {
                casted = c.abilities["Starfire"].startCast(c)
            }

            if (!casted && c.abilities["Eclipse"].next==="lunar") {
                casted = c.abilities["Wrath"].startCast(c)
            }

            if (!casted && c.abilities["Eclipse"].next==="none") {
                casted = c.abilities["Wrath"].startCast(c)
            }
        }
    }
}