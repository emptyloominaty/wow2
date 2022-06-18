let spellTooltip = false
let buffTooltip = false

let showSpellTooltip = function(i,j,notActionBar = false,spellname = "") {
    if (!spellTooltip) {
        let ability
        if (!notActionBar && actionBars[i].abilities[j] === undefined) {
            return false
        } else {
            ability = player.abilities[actionBars[i].abilities[j]]
        }
        if (notActionBar) {
            spellname = spellname.replace('€', '\'')
            ability = player.abilities[spellname]
        }
        if (ability===undefined) {
            return false
        }
        spellTooltip = true

        let range = ability.range
        if (range === 5) {
            range = "Melee"
        } else {
            range = range+" m Range"
        }

        let castTime = ability.castTime
        if (ability.hasteGcd) {
            castTime = castTime / (1 + (player.stats.haste / 100))
        }
        if (castTime === 0) {
            castTime = "Instant"
        } else {
            if (ability.channeling) {
                castTime = castTime + "s Channel"
            } else {
                castTime = castTime + "s Cast"
            }
        }

        let cd = ability.maxCd
        if (ability.hasteCd) {
            cd = cd / (1 + (player.stats.haste / 100))
        }
        if (cd === 0) {
            cd = ""
        } else {
            cd = cd + "s CD"
        }

        let cost = ability.cost
        if (cost === 0) {
            cost = ""
        } else {
            cost = cost + "% Mana"
        }


        let htmlTooltip = "<div class='spellTooltip' id='spellTooltip'><h4 class='spellTooltip_name'>" + ability.name + "</h4><p class='spellTooltip_cost'>" + cost + "</p> <p class='spellTooltip_castTime'>" + castTime + "</p> <p class='spellTooltip_cd'>" + cd + "</p> <p> "+range+"</p> <p class='spellTooltip_info'>"+ability.getTooltip()+"</p></div>"

        elements.ui.insertAdjacentHTML("beforeend", htmlTooltip)

        document.getElementById("spellTooltip").style.left = mousePosition.x+30 + "px"
        document.getElementById("spellTooltip").style.top = mousePosition.y-(document.getElementById("spellTooltip").clientHeight+15) + "px"
    }
}

let hideSpellTooltip = function() {
    spellTooltip = false
    if (document.getElementById("spellTooltip")) {
        document.getElementById("spellTooltip").remove()
    }
}


let showBuffTooltip = function(buff,target) {
    if (buff) {
        let ability = buff.ability
        spellTooltip = true

        let htmlTooltip = "<div class='buffTooltip' id='buffTooltip'><h4 class='buffTooltip_name'>" + buff.name + "</h4>"

        htmlTooltip += "<p class='buffTooltip_info'>" + ability.getBuffTooltip(buff.caster, target, buff) + "</p></div>"

        elements.ui.insertAdjacentHTML("beforeend", htmlTooltip)

        document.getElementById("buffTooltip").style.left = mousePosition.x + 30 + "px"
        document.getElementById("buffTooltip").style.top = (mousePosition.y + 15) + "px"
    }
}



let hideBuffTooltip = function() {
    buffTooltip = false
    if (document.getElementById("buffTooltip")) {
        document.getElementById("buffTooltip").remove()
    }
}


