let getRestoShamMastery = function(caster,target) {
    return (1+(1-(target.health/target.maxHealth))*(caster.stats.mastery/100))
}

let getRestoDruidMastery = function(caster,target) {
    let hots = 0
    for (let i = 0; i<target.buffs.length; i++) {
        if (target.buffs[i].type==="hot" && target.buffs[i].caster === caster) {
            hots++
        }
    }
    return 1+(hots*caster.stats.mastery)/100
}

let taunt = function(caster,target) {
    let highestAggro = 0
    for (let i = 0; i<friendlyTargets.length; i++) {
        if (target.aggro[i]!==undefined) {
            if (target.aggro[i]>highestAggro) {
                highestAggro = target.aggro[i]
            }
        }
    }
    target.aggro[caster.id2] = (highestAggro*2) + 20000
}

let checkAndApplyRoguePoison = function(caster,target) {
    for (let i = 0; i<caster.buffs.length; i++) {
        if (caster.buffs[i].effect==="roguePoison") {
            let poison = caster.buffs[i].effectValue
            if (getChance(poison.chance)) {
                for (let i = 0; i<target.debuffs.length; i++) {
                    if (target.debuffs[i].name===poison.name && target.debuffs[i].caster === caster) {
                        doDamage(caster,target,caster.abilities[poison.name],undefined,poison.spellPower)
                    }
                }
                applyDot(caster,target,caster.abilities[poison.name],poison.durationDot,undefined,poison.spellPowerDot,poison.durationDot)
                return true
            }
            return false
        }
    }
}