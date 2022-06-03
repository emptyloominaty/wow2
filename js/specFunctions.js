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