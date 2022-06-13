let open_spellbook = function() {
    currentWindow = "spellbook"
    let html = "<div class='windowHeader'><span>Spellbook</span> <div onclick='close_window()'>x</div></div>  <div style='display:flex;flex-direction: column;flex-wrap:wrap; padding:15px;'>"

    Object.keys(player.abilities).forEach(function(key) {
        if (player.abilities[key].name!==undefined && player.abilities[key].name!=="Leech") {
            html+= "<div  style='display:flex;flex-direction:row; justify-content: space-between' ><div style='display:flex;flex-direction:column;'><span>"+player.abilities[key].name+"</span> "
            if (player.abilities[key].passive) {
                html += "<span style='color:#666666'>Passive</span>"
            } else if (player.abilities[key].talent) {
                html += "<span style='color:#666666'>Talent</span>"
            }

            html +=  "</div><img src='"+iconsPath[player.abilities[key].name]+"'></div>"
        }
    })

    html+="</div>"
    elements.window.innerHTML = html
}

let close_window = function() {
    elements.window.innerHTML = ""
    currentWindow = "none"
}

let currentWindow = "none"