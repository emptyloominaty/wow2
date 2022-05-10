let lastRender = 0
let progress = 16.666666666666666666666666666667

function loop(timestamp) {
    progress = timestamp - lastRender
    if (progress > 250) {
        progress = 250
    }
    keyLoop(progress)
    update(progress)
    draw(progress)
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)