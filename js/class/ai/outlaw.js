let _ai_outlaw = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()

    casted = c.abilities["Stealth"].startCast(c)

    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        casted = c.abilities["Blade Rush"].startCast(c)
        c.move(1)
    } else {


        if (!casted) {
            casted = c.abilities["Roll the Bones"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Ambush"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Blade Rush"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Adrenaline Rush"].startCast(c)
        }

        if (!casted && aiFunctions.getNumberOfEnemies(c,8)>2) {
            casted = c.abilities["Blade Flurry"].startCast(c)
        }

        if (!casted && !aiFunctions.checkBuff(c,c,"Instant Poison")) {
            casted = c.abilities["Instant Poison"].startCast(c)
        }
        if (!casted && !aiFunctions.checkBuff(c,c,"Slice And Dice") && c.secondaryResource>3) {
            casted = c.abilities["Slice And Dice"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Between the Eyes"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Vanish"].startCast(c)
        }

        if (!casted && aiFunctions.checkBuff(c,c,"Sinister Strike") ) {
            casted = c.abilities["Pistol Shot"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Sinister Strike"].startCast(c)
        }
        if (!casted && c.secondaryResource>4) {
            casted = c.abilities["Dispatch"].startCast(c)
        }

    }

}