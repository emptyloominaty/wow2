for (let i = 0; i<creatures.length; i++) {
    if (!creatures[i].enemy) {
        bars["creature"+i+"Name"] = new Bar(60,5,100,100,0,0,"rgba(0,0,0,0)","rgba(0,0,0,0)","bar_creature"+i+"Name",4,"rgba(0,0,0,0")
        bars["creature"+i+"Health"] = new Bar(60,2,1.5,1.5,0,0,colors[creatures[i].class],"rgba(85,85,85,0.5)","bar_creature"+i+"Health",11,"rgba(0,0,0,0.5",true,i)
        bars["creature"+i+"Cast"] = new Bar(60,5,1.5,1.5,0,0,"rgba(187,187,187,0.5)","rgba(85,85,85,0.5)","bar_creature"+i+"Cast",4,"rgba(0,0,0,0.5")
        bars["creature"+i+"Cast"].setVisibility(false)
    } else {
        bars["creature"+i+"Name"] = new Bar(100,10,100,100,0,0,"rgba(0,0,0,0)","rgba(0,0,0,0)","bar_creature"+i+"Name",8,"rgba(0,0,0,0")
        bars["creature"+i+"Health"] = new Bar(100,12,1.5,1.5,0,0,"rgba(85,187,63,0.5)","rgba(85,85,85,0.5)","bar_creature"+i+"Health",11,"rgba(0,0,0,0.5",true,i)
        bars["creature"+i+"Cast"] = new Bar(100,12,1.5,1.5,0,0,"rgba(187,187,187,0.5)","rgba(85,85,85,0.5)","bar_creature"+i+"Cast",8,"rgba(0,0,0,0.5")
        bars["creature"+i+"Cast"].setVisibility(false)
        let div = document.createElement("div")
        div.id = "creature"+i+"debuffs"
        //div.classList.add("creature_bar_debuffs")
        div.style.position = "fixed"
        div.style.width = "200px"
        div.style.height = "20px"
        div.style.display = "flex"
        div.style.justifyContent = "center"
        div.style.pointerEvents= "none"
        elements.creatureBars.appendChild(div)
    }

    if (creatures[i]===player) {
        bars["creature"+i+"Health"].setVisibility(false)
    }
}

bars.playerName = new Bar(120,20,100,100,10,10,"rgba(0,0,0,0)","rgba(0,0,0,0)","bar_playerName")
bars.playerHealth = new Bar(120,20,100,100,10,30,"#4b9539","#555555","bar_playerHealth")
bars.playerMana = new Bar(120,20,100,100,10,55,"#63a0dd","#555555","bar_playerMana")
bars.playerSecondaryResource = new Bar(120,20,0,5,10,80,"#ddda63","#555555","bar_playerSecondaryResource")
bars.playerCast = new Bar(120,20,1.5,1.5,10,105,"#bbbbbb","#555555","bar_playerCast")
bars.playerCast2 = new Bar(240,20,1.5,1.5,840,85,"#1e1e1e","#555555","bar_playerCast2")
bars.playerCast2.setZIndex(20)

bars.targetName = new Bar(120,20,100,100,170,10,"rgba(0,0,0,0)","rgba(0,0,0,0)","bar_targetName")
bars.targetHealth = new Bar(120,20,100,100,170,30,"#4b9539","#555555","bar_targetHealth")
bars.targetMana = new Bar(120,20,100,100,170,55,"#63a0dd","#555555","bar_targetMana")
bars.targetSecondaryResource = new Bar(120,20,0,5,170,80,"#ddda63","#555555","bar_targetSecondaryResource")
bars.targetCast = new Bar(120,20,1.5,1.5,170,105,"#bbbbbb","#555555","bar_targetCast")


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
            "<img  class='raidFrame_buff_bottomCentre' id='raidFrame_buff_bottomCentre"+i+"'>" +
            "<span class='raidFrame_buff_bottomCentre_duration' id='raidFrame_buff_bottomCentre_duration"+i+"'></span>" +
            "<img class='raidFrame_buff_centreRight' id='raidFrame_buff_centreRight"+i+"'>" +
            "<span class='raidFrame_buff_centreRight_duration' id='raidFrame_buff_centreRight_duration"+i+"'></span>" +
            "</div>"
    }
    elements.raidFrames_parent.innerHTML = raidFramesHTML
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function draw(progress) {
    //---------------test---------------
    /*elements.test.innerHTML = "x: "+player.x+"<br>" +
        " y: "+player.y+"<br>" +
        " dir: "+player.direction+"<br>"*/
        elements.test.innerHTML = "Time:"+getTime(combatTime)+"<br> FPS: "+avgFPS.toFixed(0)+"<br>"+"x: "+mousePosition2d.x.toFixed(0)+" y:"+mousePosition2d.y.toFixed(0)+"<br>"+"R: x: "+player.x.toFixed(0)+" y:"+player.y.toFixed(0)+"<br>"  /*+
            "x: "+mousePosition2d.x.toFixed(0)+" y: "+mousePosition2d.y.toFixed(0)*/

    //---------------2d---------------
    //reset
    game2d.reset()

    //areas
    for (let i = 0; i<areas.length; i++) {
        if (areas[i]!==undefined) {
            areas[i].draw()
        }
    }

    //player
    game2d.drawCircle(game2d.canvasW/2, game2d.canvasH/2, 8*gameScaling, "#6c746f")
    game2d.drawPlayerDirection(0, 0, 6*gameScaling, 3, "#999f9a", player.direction)

    if (player.maxSecondaryResource>0) {
        bars.playerSecondaryResource.setText(getNumberString(player.secondaryResource)+"/"+getNumberString(player.maxSecondaryResource))
        bars.playerSecondaryResource.setVal(player.secondaryResource)
        bars.playerSecondaryResource.setMaxVal(player.maxSecondaryResource)
    }

    for (let i = 0; i<creatures.length; i++) {
        if (creatures[i].name!=="player") {
            let x = (creatures[i].x - player.x)*gameScaling
            let y = (creatures[i].y - player.y)*gameScaling
            let color
            let size = creatures[i].size*gameScaling
            let health = creatures[i].health/creatures[i].maxHealth
            if (creatures[i].enemy) {
                color = "#d78080"
            } else {
                color = colors[creatures[i].class]
            }

            if (creatures[i].isDead) {
                color = pSBC( -0.6, color, false, true )
            }

            let x2d = (game2d.canvasW/2)+x
            let y2d = (game2d.canvasH/2)+y

            let y2dN = y2d-(22*gameScaling)-size
            let y2dH = y2d-(18*gameScaling)-size
            let y2dC = y2d-(14*gameScaling)-size

            creatures[i].screenPosition.x = x2d
            creatures[i].screenPosition.y = y2d

            //if (!creatures[i].floatingTexts.hide) {
            creatures[i].floatingTexts.setPosition(x2d,y2d)
            //}


            if (creatures[i]!==player) {

                if (creatures[i]===player.targetObj) {
                    bars["creature"+i+"Health"].setZIndex(10)
                    bars["creature"+i+"Cast"].setZIndex(10)
                    bars["creature"+i+"Name"].setZIndex(10)
                    if (creatures[i].enemy) {
                        bars["creature"+i+"Health"].changeColor(colors["barHealthSelect"])
                    }
                } else {
                    bars["creature"+i+"Health"].setZIndex(0)
                    bars["creature"+i+"Cast"].setZIndex(0)
                    bars["creature"+i+"Name"].setZIndex(0)
                    if (creatures[i].enemy) {
                        bars["creature" + i + "Health"].changeColor(colors["barHealth"])
                    }
                }

                if (creatures[i].enemy) {
                    y2dN = y2dN + 15*gameScaling
                }

                bars["creature"+i+"Name"].setPosition(x2d,y2dN,true)
                bars["creature"+i+"Name"].setText(creatures[i].name)
                bars["creature"+i+"Name"].updateSize()

                bars["creature"+i+"Health"].setPosition(x2d,y2dH,true)
                bars["creature"+i+"Health"].setVal(creatures[i].health)
                bars["creature"+i+"Health"].setMaxVal(creatures[i].maxHealth)
                bars["creature"+i+"Health"].updateSize()

                if (creatures[i].enemy) {
                    bars["creature"+i+"Health"].setText(getNumberString(creatures[i].health)+" "+(health*100).toFixed(0)+"%")
                }

                if (creatures[i].isCasting && creatures[i].abilities[creatures[i].casting.name].castTime>0) {
                    bars["creature"+i+"Cast"].setVisibility(true)
                    bars["creature"+i+"Cast"].setPosition(x2d,y2dC,true)
                    bars["creature"+i+"Cast"].setMaxVal(creatures[i].casting.time2)
                    bars["creature"+i+"Cast"].setVal(creatures[i].casting.time2-creatures[i].casting.time)
                    bars["creature"+i+"Cast"].setText(creatures[i].casting.name)
                    bars["creature"+i+"Cast"].updateSize()
                } else if (creatures[i].isChanneling) {
                    bars["creature"+i+"Cast"].setVisibility(true)
                    bars["creature"+i+"Cast"].setPosition(x2d,y2dC,true)
                    bars["creature"+i+"Cast"].setMaxVal(creatures[i].channeling.time2)
                    bars["creature"+i+"Cast"].setVal(creatures[i].channeling.time2-creatures[i].channeling.time)
                    bars["creature"+i+"Cast"].setText(creatures[i].channeling.name)
                    bars["creature"+i+"Cast"].updateSize()
                } else {
                    bars["creature"+i+"Cast"].setVisibility(false)
                }

                //debuffs "bar"
                let debuffsHTML = ""
                if (creatures[i].enemy) {
                    for (let j = 0; j<creatures[i].debuffs.length; j++) {
                        if (creatures[i].debuffs[j].caster===player || creatures[i].debuffs[j].type==="stun") {
                            debuffsHTML += "<div id='debuffs_"+i+"_"+j+"' class='creature_bar_debuffs'><img src='"+iconsPath[creatures[i].debuffs[j].name]+"'> <span id='debuffs_"+i+"_"+j+"duration' >"+creatures[i].debuffs[j].duration.toFixed(0)+"</span></div>"
                        }
                    }
                }

                let el = document.getElementById("creature"+i+"debuffs")
                if (el) {
                    let width = (200*gameScaling)
                    let height = (20*gameScaling)
                    let fontSize = (16*gameScaling)

                    el.style.left = (x2d-(width/2))+"px"
                    el.style.top = (y2d-(45*gameScaling)-size)+"px"
                    el.style.width = width+"px"
                    el.style.height = height+"px"
                    el.innerHTML = debuffsHTML

                    if (creatures[i]===player.targetObj) {
                        el.style.zIndex = "10"
                    } else {
                        el.style.zIndex = "0"
                    }

                    for (let j = 0; j<creatures[i].debuffs.length; j++){
                        if (creatures[i].debuffs[j].caster===player || creatures[i].debuffs[j].type==="stun") {
                            document.getElementById("debuffs_" + i + "_" + j).style.width = height + "px"
                            document.getElementById("debuffs_" + i + "_" + j).style.height = height + "px"

                            document.getElementById("debuffs_" + i + "_" + j+"duration").style.width = height + "px"
                            document.getElementById("debuffs_" + i + "_" + j+"duration").style.height = height + "px"
                            document.getElementById("debuffs_" + i + "_" + j+"duration").style.fontSize = fontSize + "px"
                        }
                    }
                }
            }
            if (creatures[i].isDead) {
                bars["creature"+i+"Name"].setVisibility(false)
                bars["creature"+i+"Health"].setVisibility(false)
                bars["creature"+i+"Cast"].setVisibility(false)
            }

            game2d.drawCircle(x2d, y2d, size, color)
            game2d.drawTargetDirection(x2d, y2d, (size-(3*gameScaling)), 3, "#9f5c5d", creatures[i].direction)
        }
    }

    //---------------ui---------------
    _message.run()
    //bars
    bars.playerHealth.setVal(player.health)
    bars.playerHealth.setMaxVal(player.maxHealth)
    bars.playerHealth.setText(getNumberString(player.health)+"/"+getNumberString(player.maxHealth))

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
        document.getElementById(bars[key].id).style.width = (bars[key].val/bars[key].maxVal*bars[key].width2)+"px"
    })

    bars.playerName.setText(player.name)

    if (Object.keys(player.targetObj).length !== 0) {

        bars.targetName.setText(player.targetObj.name)

        bars.targetHealth.setVal(player.targetObj.health)
        bars.targetHealth.setMaxVal(player.targetObj.maxHealth)
        bars.targetHealth.setText(getNumberString(player.targetObj.health)+"/"+getNumberString(player.targetObj.maxHealth))

        bars.targetMana.setVal(player.targetObj.energy)
        bars.targetMana.setMaxVal(player.targetObj.maxEnergy)
        bars.targetMana.setText(player.targetObj.energy.toFixed(0)+"/"+player.targetObj.maxEnergy.toFixed(0))

        if (player.targetObj.maxSecondaryResource>0) {
            bars.targetSecondaryResource.setText(getNumberString(player.targetObj.secondaryResource)+"/"+getNumberString(player.targetObj.maxSecondaryResource))
            bars.targetSecondaryResource.setVal(player.targetObj.secondaryResource)
            bars.targetSecondaryResource.setMaxVal(player.targetObj.maxSecondaryResource)
            bars.targetSecondaryResource.setVisibility(true)
        }


        if (player.targetObj.isCasting || player.targetObj.isChanneling) {
            bars.targetCast.setVisibility(true)
            if (player.targetObj.isCasting) {
                bars.targetCast.setMaxVal(player.targetObj.casting.time2)
                bars.targetCast.setVal(player.targetObj.casting.time2-player.targetObj.casting.time)
                bars.targetCast.setText((player.targetObj.casting.time2-player.targetObj.casting.time).toFixed(1)+"s "+player.targetObj.casting.name)
            } else if (player.targetObj.isChanneling) {
                bars.targetCast.setMaxVal(player.targetObj.channeling.time2)
                bars.targetCast.setVal(player.targetObj.channeling.time2-player.targetObj.channeling.time)
                bars.targetCast.setText((player.targetObj.channeling.time2-player.targetObj.channeling.time).toFixed(1)+"s "+player.targetObj.channeling.name)
            }
        } else {
            bars.targetCast.setVisibility(false)
        }


        bars.targetName.setVisibility(true)
        bars.targetHealth.setVisibility(true)
        bars.targetMana.setVisibility(true)
    } else {
        bars.targetName.setVisibility(false)
        bars.targetHealth.setVisibility(false)
        bars.targetMana.setVisibility(false)
        bars.targetCast.setVisibility(false)
        bars.targetSecondaryResource.setVisibility(false)
    }


    //stats
    //elements.stats_parent.innerHTML = "Primary: "+player.stats.primary + "<br>Crit: "+player.stats.crit+ " <br>Haste: "+player.stats.haste+ " <br>Mastery: "+player.stats.mastery+ " <br>Vers: "+player.stats.vers+" "

    //buffs
    //reset
    for (let i = 0; i<16; i++) {
        document.getElementById("buff_"+i+"_image").src = ""
        document.getElementById("buff_"+i+"_text").textContent = ""
        document.getElementById("buff_"+i+"_stacks").textContent = ""
        document.getElementById("debuff_"+i+"_image").src = ""
        document.getElementById("debuff_"+i+"_text").textContent = ""
        document.getElementById("debuff_"+i+"_stacks").textContent = ""
    }

    let ii = 0
    for (let i = 0; i<player.buffs.length; i++) {
        if (ii<15) {
            if (!player.buffs[i].ability.hiddenBuff) {
                document.getElementById("buff_"+ii+"_image").src = iconsPath[player.buffs[i].name]
                if (!player.buffs[i].ability.permanentBuff) {
                    document.getElementById("buff_"+ii+"_text").textContent = getTime2(player.buffs[i].duration)
                }
                if (player.buffs[i].stacks>1) {
                    document.getElementById("buff_"+ii+"_stacks").textContent = player.buffs[i].stacks
                }
                ii++
            }
        }
    }
    if (player.form!=="") {
        if (ii<15) {
            document.getElementById("buff_"+ii+"_image").src = iconsPath[player.form]
        }
        ii++
    }

    ii = 0
    for (let i = 0; i<player.debuffs.length; i++) {
        if (ii<15) {
            if (!player.debuffs[i].ability.hiddenBuff) {
                document.getElementById("debuff_"+ii+"_image").src = iconsPath[player.debuffs[i].name]
                if (!player.debuffs[i].ability.permanentBuff) {
                    document.getElementById("debuff_"+ii+"_text").textContent = getTime2(player.debuffs[i].duration)
                } else if (player.debuffs[i].type==="stagger") {
                    document.getElementById("debuff_"+ii+"_text").textContent = getNumberString(player.debuffs[i].effect[0].val)
                }
                if (player.debuffs[i].stacks>1) {
                    document.getElementById("debuff_"+ii+"_stacks").textContent = player.debuffs[i].stacks
                }
                ii++
            }
        }
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
                    if (raidFrameTarget.buffs[j].duration/raidFrameTarget.buffs[j].maxDuration<0.3) {
                        document.getElementById("raidFrame_buff_bottomRight_duration"+i).style.color = colors.textRed
                    } else {
                        document.getElementById("raidFrame_buff_bottomRight_duration"+i).style.color = colors.text
                    }
                }
                if (raidFrameTarget.buffs[j].name===raidFramesBuffs[player.spec].bottomRight2 && raidFrameTarget.buffs[j].caster === player) {
                    bottomRight2 = 1
                    document.getElementById("raidFrame_buff_bottomRight2"+i).src = iconsPath[raidFramesBuffs[player.spec].bottomRight2]
                    document.getElementById("raidFrame_buff_bottomRight2_duration"+i).textContent = raidFrameTarget.buffs[j].duration.toFixed(0)
                    if (raidFrameTarget.buffs[j].duration/raidFrameTarget.buffs[j].maxDuration<0.3) {
                        document.getElementById("raidFrame_buff_bottomRight2_duration"+i).style.color = colors.textRed
                    } else {
                        document.getElementById("raidFrame_buff_bottomRight2_duration"+i).style.color = colors.text
                    }
                }
                if (raidFrameTarget.buffs[j].name===raidFramesBuffs[player.spec].bottomCentre && raidFrameTarget.buffs[j].caster === player) {
                    bottomCentre = 1
                    document.getElementById("raidFrame_buff_bottomCentre"+i).src = iconsPath[raidFramesBuffs[player.spec].bottomCentre]
                    document.getElementById("raidFrame_buff_bottomCentre_duration"+i).textContent = raidFrameTarget.buffs[j].duration.toFixed(0)
                    if (raidFrameTarget.buffs[j].duration/raidFrameTarget.buffs[j].maxDuration<0.3) {
                        document.getElementById("raidFrame_buff_bottomCentre_duration"+i).style.color = colors.textRed
                    } else {
                        document.getElementById("raidFrame_buff_bottomCentre_duration"+i).style.color = colors.text
                    }
                }

                if (raidFrameTarget.buffs[j].name===raidFramesBuffs[player.spec].centreRight && raidFrameTarget.buffs[j].caster === player) {
                    centreRight = 1
                    document.getElementById("raidFrame_buff_centreRight"+i).src = iconsPath[raidFramesBuffs[player.spec].centreRight]
                    document.getElementById("raidFrame_buff_centreRight_duration"+i).textContent = raidFrameTarget.buffs[j].duration.toFixed(0)
                    if (raidFrameTarget.buffs[j].duration/raidFrameTarget.buffs[j].maxDuration<0.3) {
                        document.getElementById("raidFrame_buff_centreRight_duration"+i).style.color = colors.textRed
                    } else {
                        document.getElementById("raidFrame_buff_centreRight_duration"+i).style.color = colors.text
                    }
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