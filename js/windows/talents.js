let open_talents = function(reload = false) {
    if (currentWindow === "talents" && !reload) {
        close_window()
        return
    } else {
        elements.window.innerHTML = ""
    }
    currentWindow = "talents"
    let html = "<div class='windowHeader'><span>Talents</span> <div onclick='close_window()'>x</div></div>"
    html+="<div class='windowBody'>"

    for (let i = 0; i<player.talents.length; i++) {
        html += "<div class='window_talentRow'>"
        for (let j = 0; j<player.talents[i].length; j++) {
            let talentName = player.talents[i][j]
            let classes = "window_talentButton "
            if (player.abilities[talentName]) {
                if (player.abilities[talentName].talentSelect) {
                    classes += "window_talentButtonSelected"
                }
            }

            html+= "<div onmouseover='showSpellTooltip(0,0,true,\""+player.talents[i][j].replace('\'', '€')+"\")' onmouseout='hideSpellTooltip()' onclick='player.changeTalent("+i+","+j+")' class='"+classes+"'> <div class='window_talentButtonImg'><img onmousedown='moveFromSpellBook(\""+talentName.replace('\'', '€')+"\")'  draggable='false' src='"+iconsPath[talentName]+"'></div> <div class='window_talentName'><span>"+talentName+"</span></div> </div>"
        }
        html += "</div>"
    }

    html+="</div>"
    elements.window.innerHTML = html
}