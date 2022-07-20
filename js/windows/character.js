let open_character = function(reload = false) {
    if (currentWindow === "character" && !reload) {
        close_window()
        return
    } else {
        elements.window.innerHTML = ""
    }
    currentWindow = "character"
    let html = "<div class='windowHeader'><span style='padding:10px 2px 10px 2px;color:"+colors[player.class]+";'>"+specsName[player.spec]+" "+player.class+"</span> <div style='padding:3px;font-size:20px;' onclick='close_window()'>x</div></div>"
    html += "<div style='display:flex;justify-content: space-between;width:350px;'>"

    //GEAR
    html += " <div style='padding:3px;'> GEAR </div> "
    //STATS
    html += "<div  style='padding:5px;'>"

    html += "<div style='display:flex;flex-direction:column; justify-content: center; align-items:center; padding:5px;'><h4>Item Level</h4> <h4 style='color:#bb33ff; overflow:visible '>"+player.itemLevel+"</h4></div>"

    html += "<h4>Attributes</h4>"

    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Primary: </span> <span>"+player.stats.primary.toFixed(0)+"</span>  </div>"
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Stamina: </span> <span>"+player.stats.stamina.toFixed(0)+"</span>  </div>"
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Armor: </span>  <span>"+player.stats.armor.toFixed(0)+"%</span> </div>"
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Dodge: </span>  <span>"+player.stats.dodge.toFixed(0)+"%</span> </div>"
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Block: </span>  <span>"+player.stats.block.toFixed(0)+"%</span> </div>"
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> DR: </span>  <span>"+(player.damageReduction*100).toFixed(0)+"%</span> </div>"
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Magic DR: </span>  <span>"+(player.magicDamageReduction*100).toFixed(0)+"%</span> </div>"
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Absorb: </span>  <span>"+(player.absorb).toFixed(0)+"</span> </div>"
    html += "<h4>Enhancements</h4>"

    //crit
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Critical Strike: </span> <span>"+player.stats.crit.toFixed(0)+"%</span>  </div>"
    //haste
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Haste: </span> <span>"+player.stats.haste.toFixed(0)+"%</span>  </div>"
    //mastery
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Mastery: </span> <span>"+player.stats.mastery.toFixed(0)+"%</span>  </div>"
    //versa
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Versatility: </span> <span>"+player.stats.vers.toFixed(0)+"%</span>  </div>"
    //leech
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Leech: </span> <span>"+player.stats.leech.toFixed(0)+"%</span>  </div>"
    //avoidance
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Avoidance: </span> <span>"+player.stats.avoidance.toFixed(0)+"%</span>  </div>"
    //speed
    html += "<div style='display:flex; justify-content:space-between;'> <span style='color:#AAAA33'> Speed: </span> <span>"+((player.stats.speed+((player.moveSpeedIncrease-1)*100))+100).toFixed(0)+"%</span>  </div>"

    html += "</div>"
    //-----------
    html += "</div>"
    elements.window.innerHTML = html
}