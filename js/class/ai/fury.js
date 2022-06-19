let _ai_fury = function(creature) {
    let c = creature
    let casted = false
    let target = aiFunctions.getLowestHpEnemy()
    setTargetAi(c,target)
    c.direction = getDirection(c,c.targetObj)
    let dist = getDistance(c,c.targetObj)
    let distNeed = 4
    if (dist>distNeed) {
        c.abilities["Charge"].startCast(c)
        c.move(1)
    } else {
        if (!casted) {
            casted = c.abilities["Execute"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Rampage"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Raging Blow"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Bloodthirst"].startCast(c)
        }
        if (!casted) {
            casted = c.abilities["Whirlwind"].startCast(c)
        }
    }
}