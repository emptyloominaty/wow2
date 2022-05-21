let targetSelect = 0

let playerNewTarget = function(id,enemy) {
    document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
    targetSelect = id
    if (!enemy) {
        player.targetObj = friendlyTargets[id]
        document.getElementById("raidFrame"+id).style.outline = "1px solid #fff"
    } else {
        player.targetObj = enemyTargets[id]
    }
    player.target = player.targetObj.name
}

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
    //TODO????
    heal = heal * target.healingIncrease

    floatingTexts.push(new FloatingText(300,350+yOffset,heal,"heal",crit,ability.name))
    details.doHealing(caster,heal,ability)
    target.health += heal
    if (target.health>target.maxHealth) {
        target.health = target.maxHealth
    }
}

let applyHot = function (caster,target,ability,duration = 0,extDuration = 0,spellPowerHot = 0) {
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].name === ability.name && target.buffs[i].caster === caster) {
            target.buffs[i].duration += ability.duration
            if (target.buffs[i].duration>ability.duration*1.3) {//30%
                target.buffs[i].duration = ability.duration*1.3
            }
            return true
        }
    }
    let spellPower = ability.spellPower
    if (spellPowerHot!==0) {
        spellPower = spellPowerHot
    }
    if (duration === 0) {
        target.buffs.push({name:ability.name, type:"hot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:ability.duration, maxDuration:ability.duration, extendedDuration:0, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
    } else {
        target.buffs.push({name:ability.name, type:"hot", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:duration, maxDuration:duration, extendedDuration:extDuration, spellPower:spellPower/ability.duration, caster:caster,ability:ability })
    }
}

let applyBuff = function (caster,target,ability) {
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].name === ability.name && target.buffs[i].caster === caster) {
            return true
        }
    }
    target.buffs.push({name:ability.name, type:"buff", effect:ability.effect, effectValue:ability.effectValue, timer:0, duration:ability.duration, maxDuration:ability.duration, extendedDuration:0, spellPower:ability.spellPower/ability.duration, caster:caster,ability:ability })
}


let details = { //TODO
    doHealing: function(caster,val,ability) {
        caster.healingDone+=val
    },
    doDamage: function() {

    },
    takeDamage: function() {

    }
}