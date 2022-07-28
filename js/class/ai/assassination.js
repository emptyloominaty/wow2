let _ai_assassination = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()

    casted = c.abilities["Stealth"].startCast(c)

    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        casted = c.abilities["Shadowstep"].startCast(c)
        c.move(1)
    } else {


        if (!casted) {
            casted = c.abilities["Ambush"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Vendetta"].startCast(c)
        }

        if (!casted && aiFunctions.getNumberOfEnemies(c,8)>2) {
            casted = c.abilities["Fan of Knives"].startCast(c)
        }

        if (!casted && !aiFunctions.checkBuff(c,c,"Deadly Poison")) {
            casted = c.abilities["Deadly Poison"].startCast(c)
        }
        if (!casted && !aiFunctions.checkBuff(c,c,"Slice And Dice") && c.secondaryResource>3) {
            casted = c.abilities["Slice And Dice"].startCast(c)
        }
        if (!casted && !aiFunctions.checkDebuff(c,target,"Garrote")) {
            casted = c.abilities["Garrote"].startCast(c)
        }
        if (!casted && !aiFunctions.checkDebuff(c,target,"Rupture") && c.secondaryResource>3) {
            casted = c.abilities["Rupture"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Mutilate"].startCast(c)
        }
        if (!casted && c.secondaryResource>4) {
            casted = c.abilities["Envenom"].startCast(c)
        }

    }

}