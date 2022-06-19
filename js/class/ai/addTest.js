let _ai_addTest = function(creature) {
    let c = creature
    //no target
    if (Object.keys(c.targetObj).length === 0)  {
        let newTarget = findNearestEnemy(c)
        if (newTarget!==false) {
            c.targetObj = newTarget
            c.target = newTarget.name
        }
    } else {
        let b = c
        for (let i = 0; i<b.aggro.length; i++) {
            let currentAggro = b.aggro[b.targetObj.id2]
            if (currentAggro===undefined) {
                currentAggro = 0
            }
            if (b.targetObj.id2.isDead) {
                b.aggro[b.targetObj.id2] = 0
            }
            if (currentAggro<b.aggro[i]) {
                b.targetObj = friendlyTargets[i]
                b.target = friendlyTargets[i].name
                b.castTarget = friendlyTargets[i]
            }
        }

        b.direction = getDirection(b,b.targetObj)

        let dist = getDistance(b,b.targetObj)
        if (dist>4) {
            b.move(1)
        } else {
            //ABILITIES
        }
    }
}