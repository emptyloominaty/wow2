bars.playerHealth = new Bar(120,20,100,100,10,10,"#DD5555","#555555","bar_playerHealth")
bars.playerMana = new Bar(120,20,100,100,10,35,"#63a0dd","#555555","bar_playerMana")
bars.playerCast = new Bar(120,20,1.5,1.5,10,65,"#bbbbbb","#555555","bar_playerCast")

if (0===0) {
    let buffHTML = "<div id='top_buff'>"
    let debuffHTML = "<div id='top_debuff'>"
    for (let i = 0; i<8; i++) {
        buffHTML += "<div class='buff_div' id='buff_"+i+"'><img id='buff_"+i+"_image'> <span id='buff_"+i+"_text'></span></div>"
        debuffHTML += "<div class='debuff_div' id='debuff_"+i+"'><img id='debuff_"+i+"_image'> <span id='debuff_"+i+"_text'></span> </div>"
    }
    buffHTML += "</div><div id='bottom_buff'>"
    debuffHTML += "</div><div id='bottom_debuff'>"
    for (let i = 8; i<16; i++) {
        buffHTML += "<div class='buff_div' id='buff_"+i+"'> <img id='buff_"+i+"_image'> <span id='buff_"+i+"_text'></span> </div>"
        debuffHTML += "<div class='debuff_div' id='debuff_"+i+"'><img id='debuff_"+i+"_image'> <span id='debuff_"+i+"_text'></span> </div>"
    }
    elements.buffsDebuffs_parent.innerHTML = "<div id='buff_bar'>" + buffHTML + "</div></div> <div id='debuff_barr'>" + debuffHTML + "</div></div>"

    let raidFramesHTML = ""
    for (let i = 0; i<friendlyTargets.length; i++) {
        //TODO:HOTS,DEBUFFS
        raidFramesHTML += "<div onclick='playerNewTarget("+i+",false)' class='raidFrame' id='raidFrame"+i+"'> <div style='background-color: "+colors[friendlyTargets[i].class]+"' class='raidFrame_health' id='raidFrame_health"+i+"'></div> <span class='raidFrame_name' id='raidFrame_name"+i+"'>"+friendlyTargets[i].name+"</span> <span class='raidFrame_healthLost' id='raidFrame_healthLost"+i+"'></span> </div>"
    }

    elements.raidFrames_parent.innerHTML = raidFramesHTML

}






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

    for (let i = 0; i<creatures.length; i++) {
        if (creatures[i].name!=="player") {
            let x = creatures[i].x - player.x
            let y = creatures[i].y - player.y
            let color
            if (creatures[i].enemy) {
                color = "#d78080"
            } else {
                color = "#91d786"
            }
            game2d.drawCircle((game2d.canvasW/2)+x, (game2d.canvasH/2)+y, 15, color)
        }
    }

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
    //stats
    elements.stats_parent.innerHTML = "Primary: "+player.stats.primary + "<br>Crit: "+player.stats.crit+ " <br>Haste: "+player.stats.haste+ " <br>Mastery: "+player.stats.mastery+ " <br>Vers: "+player.stats.vers+" "

    //buffs
    //reset
    for (let i = 0; i<16; i++) {
        document.getElementById("buff_"+i+"_image").src = ""
        document.getElementById("buff_"+i+"_text").textContent = ""
    }

    for (let i = 0; i<player.buffs.length; i++) {
        if (i<16) {
            document.getElementById("buff_"+i+"_image").src = iconsPath[player.buffs[i].name]
            document.getElementById("buff_"+i+"_text").textContent = player.buffs[i].duration.toFixed(0)+"s"
        }
        //player.buffs[i].name
        //player.buffs[i].duration
    }

    //raidframes
        for (let i = 0; i<friendlyTargets.length; i++) {
            //raidFramesHTML += "<div class='raidFrame_health' id='raidFrame_health"+i+"'></div>  <span class='raidFrame_healthLost' id='raidFrame_healthLost"+i+"'></span> </div>"
            document.getElementById("raidFrame_health"+i).style.width = ((friendlyTargets[i].health/friendlyTargets[i].maxHealth)*100)+"%"

            if (friendlyTargets[i].health<friendlyTargets[i].maxHealth) {
                document.getElementById("raidFrame_healthLost"+i).textContent = "-"+(friendlyTargets[i].maxHealth-friendlyTargets[i].health).toFixed(0)
            } else if (friendlyTargets[i].isDead) {
                document.getElementById("raidFrame_healthLost"+i).textContent = "Dead"
            } else {
                document.getElementById("raidFrame_healthLost"+i).textContent = ""
            }
        }

}