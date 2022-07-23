let _ai_unholy = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()
    if (target===undefined) {
        return false
    }
    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        c.abilities["Death's Advance"].startCast(c)
        c.move(1)
    } else {

        if (!casted) {
            casted = c.abilities["Army of the Dead"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Dark Transformation"].startCast(c)
        }
        if (!casted && checkDebuff(c,target,"Festering Wound")) {
            casted = c.abilities["Apocalypse"].startCast(c)
        }

        if (!casted && c.energy>80) {
            casted = c.abilities["Death Coil"].startCast(c)
        }

        if (!casted && target.health/target.maxHealth<0.35) {
            casted = c.abilities["Soul Reaper"].startCast(c)
        }

        if (!casted && !checkDebuff(c,target,"Virulent Plague")) {
            casted = c.abilities["Outbreak"].startCast(c)
        }

        if (!casted && checkDebuff(c,target,"Festering Wound")) {
            casted = c.abilities["Scourge Strike"].startCast(c)
        }

        if (!casted && aiFunctions.getNumberOfEnemies(c,6)>2) {
            casted = c.abilities["Epidemic"].startCast(c)
        }

        if (!casted && !checkBuff(c,c,"Unholy Blight")) {
            casted = c.abilities["Unholy Blight"].startCast(c)
        }

        if (!casted && c.secondaryResource>5) {
            casted = c.abilities["Festering Strike"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Death Coil"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Festering Strike"].startCast(c)
        }
    }
}