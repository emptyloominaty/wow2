let lastRender = 0
let progress = 16.666666666666666666666666666667

function loop(timestamp) {
    progress = timestamp - lastRender
    time += progress/1000
    if (progress > 250) {
        progress = 250
    }

    player.moving = [false,false,false,false]
    keyLoop(progress)
    update(progress)
    draw(progress)

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)