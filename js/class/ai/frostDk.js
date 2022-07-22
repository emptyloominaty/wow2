let _ai_frostDk = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()
    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        c.abilities["Death's Advance"].startCast(c)
        c.move(1)
    } else {

        if (!casted) {
            casted = c.abilities["Pillar of Frost"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Empower Rune Weapon"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Frostwyrm's Fury"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Raise Dead"].startCast(c)
        }

        if (!casted && checkBuff(c,c,"Rime")) {
            casted = c.abilities["Howling Blast"].startCast(c)
        }

        if (!casted && !checkBuff(c,c,"Remorseless Winter")) {
            casted = c.abilities["Remorseless Winter"].startCast(c)
        }

        if (!casted && c.secondaryResource>5.9) {
            casted = c.abilities["Obliterate"].startCast(c)
        }
        if (!casted && c.energy===c.maxEnergy) {
            casted = c.abilities["Frost Strike"].startCast(c)
        }
        if (!casted && c.secondaryResource>5) {
            casted = c.abilities["Obliterate"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Frost Strike"].startCast(c)
        }

        if (!casted) {
            casted = c.abilities["Obliterate"].startCast(c)
        }
    }
}