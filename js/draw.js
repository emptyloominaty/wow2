bars.playerHealth = new Bar(120,20,100,100,10,10,"#DD5555","#555555","bar_playerHealth")
bars.playerMana = new Bar(120,20,100,100,10,35,"#63a0dd","#555555","bar_playerMana")

bars.playerCast = new Bar(120,20,1.5,1.5,10,65,"#bbbbbb","#555555","bar_playerCast")

function draw(progress) {
    //---------------test---------------
    elements.test.innerHTML = "x: "+player.x+"<br>" +
        " y: "+player.y+"<br>" +
        " dir: "+player.direction+"<br>"


    //---------------2d---------------
    //reset
    game2d.reset()
    //player
    game2d.drawCircle(game2d.canvasW/2, game2d.canvasH/2, 15, "#6c746f")
    game2d.drawPlayerDirection(0, 0, 10, 3, "#999f9a", player.direction)


    //---------------ui---------------
    //bars
    bars.playerHealth.setVal(player.health)
    bars.playerHealth.setMaxVal(player.maxHealth)
    bars.playerHealth.setText(player.health.toFixed(0)+"/"+player.maxHealth.toFixed(0))

    bars.playerMana.setVal(player.energy)
    bars.playerMana.setMaxVal(player.maxEnergy)
    bars.playerMana.setText(player.energy.toFixed(0)+"/"+player.maxEnergy.toFixed(0))

    if (player.gcd>0) {
        bars.playerCast.setVisibility(true)
        bars.playerCast.setVal(player.gcd)
        bars.playerCast.setText(player.gcd.toFixed(1)+"s "+player.casting.name)
    } else {
        bars.playerCast.setVisibility(false)
    }
    Object.keys(bars).forEach(key => {
        document.getElementById(bars[key].id).style.width = (bars[key].val/bars[key].maxVal*bars[key].width)+"px"
    })
    //----

}