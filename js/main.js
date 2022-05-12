let fps = 60


function update(progress) {
    fps = 1/progress*1000


    for (let i = 0; i<creatures.length; i++) {
        creatures[i].run()
    }
}