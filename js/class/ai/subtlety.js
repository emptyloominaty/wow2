let _ai_subtlety = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()

    casted = c.abilities["Stealth"].startCast(c)

    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        casted = c.abilities["Shadowstrike"].startCast(c)
        if (!casted) {
            casted = c.abilities["Shadowstep"].startCast(c)
        }
        c.move(1)
    } else {

        if (!casted) {
            casted = c.abilities["Shadow Dance"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Symbols of Death"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Shadow Blades"].startCast(c)
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

        if (!casted && !aiFunctions.checkDebuff(c,target,"Rupture") && c.secondaryResource>3) {
            casted = c.abilities["Rupture"].startCast(c)
        }

        if (!casted && !c.isStealthed) {
            casted = c.abilities["Vanish"].startCast(c)
        }

        if (!casted && c.isStealthed) {
            casted = c.abilities["Shadowstrike"].startCast(c)
        }
        if (!casted && c.secondaryResource>4) {
            casted = c.abilities["Eviscerate"].startCast(c)
        }

        if (!casted && c.energy>40) {
            casted = c.abilities["Backstab"].startCast(c)
        }

    }

}