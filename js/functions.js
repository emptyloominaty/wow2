
let critChance = function(caster) {
    let critChance = (Math.random()*100)
    if (critChance < caster.stats.crit) {
        return 2
    }
    return 1
}

let doHeal = function(caster,target,ability,yOffset = 0,spellPower = 0) {
    let crit = critChance(caster)
    let heal = 0
    if (spellPower===0) {
        heal = (caster.stats.primary * ability.spellPower) * (1+(caster.stats.vers/100)) * crit
    } else {
        heal = (caster.stats.primary * spellPower) * (1+(caster.stats.vers/100)) * crit
    }

    floatingTexts.push(new FloatingText(300,350+yOffset,heal,"heal",crit,ability.name))
    target.health += heal
    if (target.health>target.maxHealth) {
        target.health = target.maxHealth
    }
}

let applyHot = function (caster,target,ability) {
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].name===ability.name) {
            target.buffs[i].duration += ability.duration
            if (target.buffs[i].duration>ability.duration*1.3) {//30%
                target.buffs[i].duration = ability.duration*1.3
            }
            return true
        }
    }
    target.buffs.push({name:ability.name, type:"hot",timer:0, duration:ability.duration, maxDuration:ability.duration, extendedDuration:0, spellPower:ability.spellPower/ability.duration, caster:caster })
}