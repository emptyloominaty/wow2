bars.playerName = new Bar(120,20,100,100,10,10,"rgba(0,0,0,0)","rgba(0,0,0,0)","bar_playerName")
bars.playerHealth = new Bar(120,20,100,100,10,30,"#DD5555","#555555","bar_playerHealth")
bars.playerMana = new Bar(120,20,100,100,10,55,"#63a0dd","#555555","bar_playerMana")
bars.playerCast = new Bar(120,20,1.5,1.5,10,85,"#bbbbbb","#555555","bar_playerCast")
bars.playerCast2 = new Bar(240,20,1.5,1.5,840,85,"#1e1e1e","#555555","bar_playerCast2")

bars.targetName = new Bar(120,20,100,100,170,10,"rgba(0,0,0,0)","rgba(0,0,0,0)","bar_targetName")
bars.targetHealth = new Bar(120,20,100,100,170,30,"#DD5555","#555555","bar_targetHealth")
bars.targetMana = new Bar(120,20,100,100,170,55,"#63a0dd","#555555","bar_targetMana")
bars.targetCast = new Bar(120,20,1.5,1.5,170,85,"#bbbbbb","#555555","bar_targetCast")


let gameScaling = 1 //TODO

let orderRaidFrames = function() {
    let tanks = []
    let healers = []
    let dps = []
    for (let i = 0; i<friendlyTargets.length; i++) {
        if (friendlyTargets[i].role==="healer") {
            healers.push(i)
        } else if (friendlyTargets[i].role==="tank") {
            tanks.push(i)
        } else if (friendlyTargets[i].role==="dps") {
            dps.push(i)
        }
    }
    let order = [].concat(tanks,healers,dps)
    let orderReturn = []
    for (let i = 0; i<order.length; i++) {
        orderReturn.push(friendlyTargets[order[i]])
    }
    return orderReturn
}

let raidFramesTargets = orderRaidFrames()

if (0===0) {
    let buffHTML = "<div id='top_buff'>"
    let debuffHTML = "<div id='top_debuff'>"
    for (let i = 0; i<8; i++) {
        buffHTML += "<div class='buff_div' id='buff_"+i+"'><img id='buff_"+i+"_image'> <span id='buff_"+i+"_text'></span> <span class='buff_stacks' id='buff_"+i+"_stacks'></span> </div>"
        debuffHTML += "<div class='debuff_div' id='debuff_"+i+"'><img id='debuff_"+i+"_image'> <span id='debuff_"+i+"_text'></span> <span class='buff_stacks' id='debuff_"+i+"_stacks'></span> </div>"
    }
    buffHTML += "</div><div id='bottom_buff'>"
    debuffHTML += "</div><div id='bottom_debuff'>"
    for (let i = 8; i<16; i++) {
        buffHTML += "<div class='buff_div' id='buff_"+i+"'> <img id='buff_"+i+"_image'> <span id='buff_"+i+"_text'></span>  <span class='buff_stacks' id='buff_"+i+"_stacks'></span> </div>"
        debuffHTML += "<div class='debuff_div' id='debuff_"+i+"'><img id='debuff_"+i+"_image'> <span id='debuff_"+i+"_text'></span>  <span class='buff_stacks' id='debuff_"+i+"_stacks'></span> </div>"
    }
    elements.buffsDebuffs_parent.innerHTML = "<div id='buff_bar'>" + buffHTML + "</div></div> <div id='debuff_barr'>" + debuffHTML + "</div></div>"

    let raidFramesHTML = ""
    for (let i = 0; i<friendlyTargets.length; i++) {
        //TODO:DEBUFFS
        raidFramesHTML += "<div onclick='playerNewTarget("+i+",false)' class='raidFrame' id='raidFrame"+i+"'>" +
            " <div style='background-color: "+colors[friendlyTargets[i].class]+"' class='raidFrame_health' id='raidFrame_health"+i+"'></div>" +
            "<div class='raidFrame_health2'>.</div>" +
            " <span class='raidFrame_name' id='raidFrame_name"+i+"'>"+friendlyTargets[i].name+"</span>" +
            " <span class='raidFrame_healthLost' id='raidFrame_healthLost"+i+"'></span> " +
            "<img class='raidFrame_role_icon' id='raidFrame_role_icon"+i+"'>" +
            "<img class='raidFrame_buff_bottomRight' id='raidFrame_buff_bottomRight"+i+"'>" +
            "<span class='raidFrame_buff_bottomRight_duration' id='raidFrame_buff_bottomRight_duration"+i+"'></span>" +
            "<img class='raidFrame_buff_bottomRight2' id='raidFrame_buff_bottomRight2"+i+"'>" +
            "<span class='raidFrame_buff_bottomRight2_duration' id='raidFrame_buff_bottomRight2_duration"+i+"'></span>" +
            "<img class='raidFrame_buff_bottomCentre' id='raidFrame_buff_bottomCentre"+i+"'>" +
            "<span class='raidFrame_buff_bottomCentre_duration' id='raidFrame_buff_bottomCentre_duration"+i+"'></span>" +
            "<img class='raidFrame_buff_centreRight' id='raidFrame_buff_centreRight"+i+"'>" +
            "<span class='raidFrame_buff_centreRight_duration' id='raidFrame_buff_centreRight_duration"+i+"'></span>" +
            "</div>"
    }
    elements.raidFrames_parent.innerHTML = raidFramesHTML
}

function draw(progress) {
    //---------------test---------------
    /*elements.test.innerHTML = "x: "+player.x+"<br>" +
        " y: "+player.y+"<br>" +
        " dir: "+player.direction+"<br>"*/
        elements.test.innerHTML = "Time:"+getTime(time)+" FPS: "+avgFPS.toFixed(0)+"<br> HPS: "+(player.healingDone/time/1000).toFixed(1)+"k<br> DPS: "+(player.damageDone/time/1000).toFixed(1)+"k"

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
            let size = 15
            let healthColor = "#FFFFFFF"
            let health = creatures[i].health/creatures[i].maxHealth
            if (health>0.5) {
                healthColor = "#FFFFFF"
            } else if (health>0.1) {
                healthColor = "#feff7e"
            } else if (health>0) {
                healthColor = "#ff6b6f"
            } else {
                healthColor = "#000000"
            }
            if (creatures[i].enemy) {
                color = "#d78080"
                size = 25
            } else {
                color = colors[creatures[i].class]
            }
            game2d.drawText((game2d.canvasW/2)+x, ((game2d.canvasH/2)+y)-(size+5),(health*100).toFixed(0)+"%","14px Consolas",healthColor,"center")
            game2d.drawCircle((game2d.canvasW/2)+x, (game2d.canvasH/2)+y, size, color)
            game2d.drawTargetDirection((game2d.canvasW/2)+x, (game2d.canvasH/2)+y, size-5, 3, "#9f5c5d", creatures[i].direction)
        }
    }

    //---------------ui---------------
    _message.run()
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

    if (player.isCasting || player.isChanneling) {
        bars.playerCast2.setVisibility(true)
        if (player.isCasting) {
            bars.playerCast2.setMaxVal(player.casting.time2)
            bars.playerCast2.setVal(player.casting.time2-player.casting.time)
            bars.playerCast2.setText((player.casting.time2-player.casting.time).toFixed(1)+"s "+player.casting.name)
        } else if (player.isChanneling) {
            bars.playerCast2.setMaxVal(player.channeling.time2)
            bars.playerCast2.setVal(player.channeling.time2-player.channeling.time)
            bars.playerCast2.setText((player.channeling.time2-player.channeling.time).toFixed(1)+"s "+player.channeling.name)
        }
    } else {
        bars.playerCast2.setVisibility(false)
    }

    Object.keys(bars).forEach(key => {
        document.getElementById(bars[key].id).style.width = (bars[key].val/bars[key].maxVal*bars[key].width)+"px"
    })

    bars.playerName.setText(player.name)

    if (Object.keys(player.targetObj).length !== 0) {

        bars.targetName.setText(player.targetObj.name)

        bars.targetHealth.setVal(player.targetObj.health)
        bars.targetHealth.setMaxVal(player.targetObj.maxHealth)
        bars.targetHealth.setText(player.targetObj.health.toFixed(0)+"/"+player.targetObj.maxHealth.toFixed(0))


        bars.targetMana.setVal(player.targetObj.energy)
        bars.targetMana.setMaxVal(player.targetObj.maxEnergy)
        bars.targetMana.setText(player.targetObj.energy.toFixed(0)+"/"+player.targetObj.maxEnergy.toFixed(0))

        bars.targetName.setVisibility(true)
        bars.targetHealth.setVisibility(true)
        bars.targetMana.setVisibility(true)
        bars.targetCast.setVisibility(false) //TODO
    } else {
        bars.targetName.setVisibility(false)
        bars.targetHealth.setVisibility(false)
        bars.targetMana.setVisibility(false)
        bars.targetCast.setVisibility(false)
    }


    //stats
    elements.stats_parent.innerHTML = "Primary: "+player.stats.primary + "<br>Crit: "+player.stats.crit+ " <br>Haste: "+player.stats.haste+ " <br>Mastery: "+player.stats.mastery+ " <br>Vers: "+player.stats.vers+" "

    //buffs
    //reset
    for (let i = 0; i<16; i++) {
        document.getElementById("buff_"+i+"_image").src = ""
        document.getElementById("buff_"+i+"_text").textContent = ""
        document.getElementById("buff_"+i+"_stacks").textContent = ""
    }

    for (let i = 0; i<player.buffs.length; i++) {
        if (i<16) {
            document.getElementById("buff_"+i+"_image").src = iconsPath[player.buffs[i].name]
            document.getElementById("buff_"+i+"_text").textContent = player.buffs[i].duration.toFixed(0)+"s"
            if (player.buffs[i].stacks>1) {
                document.getElementById("buff_"+i+"_stacks").textContent = player.buffs[i].stacks
            }
        }
        //player.buffs[i].name
        //player.buffs[i].duration
    }

    //raidframes
        for (let i = 0; i<raidFramesTargets.length; i++) {
            let raidFrameTarget = raidFramesTargets[i]

            document.getElementById("raidFrame_health"+i).style.width = ((raidFrameTarget.health/raidFrameTarget.maxHealth)*100)+"%"
            document.getElementById("raidFrame_health"+i).style.backgroundColor = colors[raidFrameTarget.class]

            document.getElementById("raidFrame_name"+i).textContent = raidFrameTarget.name

            if (raidFrameTarget.health<raidFrameTarget.maxHealth) {
                document.getElementById("raidFrame_healthLost"+i).textContent = "-"+(raidFrameTarget.maxHealth-raidFrameTarget.health).toFixed(0)
            } else if (raidFrameTarget.isDead) {
                document.getElementById("raidFrame_healthLost"+i).textContent = "Dead"
            } else {
                document.getElementById("raidFrame_healthLost"+i).textContent = ""
            }
            //role
            document.getElementById("raidFrame_role_icon"+i).src = iconsPath[raidFrameTarget.role]

            //buffs debuffs
            let bottomRight = false
            let centreRight = false
            let bottomCentre = false
            let bottomRight2 = false
            for (let j = 0; j<raidFrameTarget.buffs.length; j++) {
                if (raidFrameTarget.buffs[j].name===raidFramesBuffs[player.spec].bottomRight && raidFrameTarget.buffs[j].caster === player) {
                    bottomRight = 1
                    document.getElementById("raidFrame_buff_bottomRight"+i).src = iconsPath[raidFramesBuffs[player.spec].bottomRight]
                    document.getElementById("raidFrame_buff_bottomRight_duration"+i).textContent = raidFrameTarget.buffs[j].duration.toFixed(0)
                }
                if (raidFrameTarget.buffs[j].name===raidFramesBuffs[player.spec].bottomRight2 && raidFrameTarget.buffs[j].caster === player) {
                    bottomRight2 = 1
                    document.getElementById("raidFrame_buff_bottomRight2"+i).src = iconsPath[raidFramesBuffs[player.spec].bottomRight2]
                    document.getElementById("raidFrame_buff_bottomRight2_duration"+i).textContent = raidFrameTarget.buffs[j].duration.toFixed(0)
                }
                if (raidFrameTarget.buffs[j].name===raidFramesBuffs[player.spec].bottomCentre && raidFrameTarget.buffs[j].caster === player) {
                    bottomCentre = 1
                    document.getElementById("raidFrame_buff_bottomCentre"+i).src = iconsPath[raidFramesBuffs[player.spec].bottomCentre]
                    document.getElementById("raidFrame_buff_bottomCentre_duration"+i).textContent = raidFrameTarget.buffs[j].duration.toFixed(0)
                }
                if (raidFrameTarget.buffs[j].name===raidFramesBuffs[player.spec].centreRight && raidFrameTarget.buffs[j].caster === player) {
                    centreRight = 1
                    document.getElementById("raidFrame_buff_centreRight"+i).src = iconsPath[raidFramesBuffs[player.spec].centreRight]
                    document.getElementById("raidFrame_buff_centreRight_duration"+i).textContent = raidFrameTarget.buffs[j].duration.toFixed(0)
                }
            }
            if (!bottomRight) {
                document.getElementById("raidFrame_buff_bottomRight"+i).src = ""
                document.getElementById("raidFrame_buff_bottomRight_duration"+i).textContent = ""
            }
            if (!bottomRight2) {
                document.getElementById("raidFrame_buff_bottomRight2"+i).src = ""
                document.getElementById("raidFrame_buff_bottomRight2_duration"+i).textContent = ""
            }
            if (!bottomCentre) {
                document.getElementById("raidFrame_buff_bottomCentre"+i).src = ""
                document.getElementById("raidFrame_buff_bottomCentre_duration"+i).textContent = ""
            }
            if (!centreRight) {
                document.getElementById("raidFrame_buff_centreRight"+i).src = ""
                document.getElementById("raidFrame_buff_centreRight_duration"+i).textContent = ""
            }
        }

}