let fps = 60
let time = 0
let combatTime = 0
let inCombat = true
let progressInSec = 0.016
let avgFPS = 60
let avgFPSlastSec = []
let combatLog = []
let detailsIdx = 0

function update(progress) {
    fps = 1/progress*1000
    progressInSec = progress/1000

    //Combat Timer
    let enemiesAlive = 0
    for (let i = 0; i<enemies.length; i++) {
        if (!enemies[i].isDead) {
            enemiesAlive++
        }
    }
    if (enemiesAlive===0) {
        inCombat = false
    }
    if (inCombat) {
        combatTime += progressInSec
    }


    //AvgFPS Sec---------------------------------------------
    avgFPSlastSec.push(fps)
    if (avgFPSlastSec.length===60) {
        avgFPSlastSec.shift()
    }
    avgFPS = 0
    for (let i = 0; i<avgFPSlastSec.length;i++) {
        avgFPS += avgFPSlastSec[i]
    }
    avgFPS = avgFPS / avgFPSlastSec.length

    //
    spellQueue.run()

    //creatures
    for (let i = 0; i<creatures.length; i++) {
        if (!creatures[i].isDead) {
            creatures[i].run()
        }

        if (creatures[i]!==player) {
            creatures[i].castTarget = creatures[i].targetObj
        }
    }
    //floating texts
    for (let i = 0; i<floatingTexts.length; i++) {
        if (floatingTexts[i]!==undefined) {
            floatingTexts[i].run()
        }
    }
    //actions
    Object.keys(actions).forEach(key => {
        actions[key].run()
    })

    //details
    if (detailsIdx===0) {
        detailsDamage.run()
    } else if (detailsIdx===1) {
        detailsHealing.run()
    } else {
        detailsAbilities.run()
    }
    detailsIdx++
    if (detailsIdx>4) {
        detailsIdx=0
    }

    //combat log
    if (inCombat) {
        timelineCombatLog.run()
    }

    //areas
    for (let i = 0; i<areas.length; i++) {
        if (areas[i]!==undefined) {
            areas[i].run()
        }
    }

}