let friendlyTargets = []
friendlyTargets.push(player)
let enemyTargets = []



let fps = 60

function update(progress) {
    fps = 1/progress*1000

    //creatures
    for (let i = 0; i<creatures.length; i++) {
        creatures[i].run()
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

}