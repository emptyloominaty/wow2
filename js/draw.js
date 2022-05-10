function draw(progress) {
    //---test---
    elements.test.innerHTML = "x: "+player.x+"<br> y: "+player.y+"<br> dir: "+player.direction

    //---2d---
    //reset
    game2d.reset()
    //player
    game2d.drawCircle(game2d.canvasW/2, game2d.canvasH/2, 15, "#6c746f")
    game2d.drawPlayerDirection(0, 0, 10, 3, "#999f9a", player.direction)


    //---ui---
    



}