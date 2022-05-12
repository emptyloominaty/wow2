/*
CONFIG
 */
let showFloatingAbilityName = true



let friendlyTargets = []
friendlyTargets.push(player)
let enemyTargets = []



let fps = 60

function update(progress) {
    fps = 1/progress*1000


    for (let i = 0; i<creatures.length; i++) {
        creatures[i].run()
    }
    for (let i = 0; i<floatingTexts.length; i++) {
        if (floatingTexts[i]!==undefined) {
            floatingTexts[i].run()
        }

    }

}